import { env } from "node-environment";
import axios from "axios";

process.env.NODE_ENV = "dev";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  timeout: 5000,
});

const bdApi = axios.create({
  baseURL: env("staging", "development") ? "http://localhost:3000" : "...", // put production url here,
  timeout: 5000,
});

function save(data, _callback = (res) => {}) {
  let toSave = {
    city: data.name,
    description: data.weather[0].description.substring(0, 512),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    time: data.dt,
    rawjson: JSON.stringify(data).substring(0, 4096),
  };
  //console.log(toSave);
  bdApi
    .put("/weather", toSave)
    .then((res) => {
      _callback(res);
    })
    .catch((error) => {
      console.log(error);
    });
}

//----------------- MAIN --------------------

weatherApi
  .get("", {
    params: { q: "Dakar,sn", APPID: "970f9e72cca5014fbc9f95aded667703" },
  })
  .then((res) => {
    console.log("\nSave Dakar\n");
    save(res.data);
  })
  .catch((err) => {
    console.error("\nError Weather Api\nReason: " + err);
  });

weatherApi
  .get("", {
    params: { q: "Thiès,sn", APPID: "970f9e72cca5014fbc9f95aded667703" },
  })
  .then((res) => {
    console.log("\nSave Thiès\n");
    save(res.data);
  })
  .catch((err) => {
    console.error("\nError Weather Api\nReason: " + err);
  });
