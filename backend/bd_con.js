const info = {
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "admin",
  host: process.env.DB_HOST || "localhost", //"192.168.43.10",
  port: process.env.DB_PORT || "5432",
  database: process.env.DB_NAME || "sn_weather",
  ssl: "true",
};
const pg_promise = require("pg-promise");
const pgp = pg_promise();
const dbPhrase =
  "postgres://" +
  info.username +
  ":" +
  info.password +
  "@" +
  info.host +
  ":" +
  info.port +
  "/" +
  info.database;

const db = pgp(dbPhrase);
console.log("connexion a : " + dbPhrase);

module.exports = db;
