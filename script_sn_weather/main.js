import { env } from "node-environment";
import axios from "axios";
import { HOST_WEATHER_API, HOST_API, API_KEY } from "./config.js";

const weatherApi = axios.create({
  baseURL: HOST_WEATHER_API,
  timeout: 3000,
});

const bdApi = axios.create({
  baseURL: HOST_API,
  timeout: 3000,
});

function save(data, _callback = (res) => {}) {
  let toSave = {
    city: data.name,
    description: data.weather[0].description.substring(0, 512),
    pressure: data.main.pressure,
    humidity: data.main.humidity,
    time: data.dt,
    // rawjson: JSON.stringify(data).substring(0, 4096),
  };
  //console.log(toSave);
  bdApi
    .put("/weather", toSave)
    .then((res) => {
      _callback(res);
    })
    .catch((error) => {
      console.error("Apierror: " + toSave.city);
    });
}

//----------------- MAIN --------------------

weatherApi
  .get("", {
    params: { q: "Dakar,sn", APPID: API_KEY },
  })
  .then((res) => {
    console.log("\nSave Dakar\n");
    save(res.data);
  })
  .catch((err) => {
    console.error("\nError Weather Api\nReason: internet connection");
  });

weatherApi
  .get("", {
    params: { q: "Thiès,sn", APPID: API_KEY },
  })
  .then((res) => {
    console.log("\nSave Thiès\n");
    save(res.data);
  })
  .catch((err) => {
    console.error("\nError Weather Api\nReason: internet connection");
  });
