const info = {
  username: "postgres",
  password: "admin",
  host: "localhost", //"192.168.43.10",
  port: "5432",
  database: "sn_weather",
  //ssl : "true"
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
