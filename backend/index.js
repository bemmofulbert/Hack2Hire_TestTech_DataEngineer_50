const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const Api = require("./src/api/Api");

require("./src/api/WeatherApi");

//app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type,X-Token-Auth,Authorization,Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Toutes les routes de l'application
app.use(Api.router);

const port = process.env.PORT || 3000;
app.listen(port, console.log("app is running on port " + port));
