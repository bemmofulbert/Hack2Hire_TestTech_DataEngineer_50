const Weather = require("../models/Weather")
const Api = require("./Api")

class WeatherApi extends Api {
    static router = Api.router
    constructor(){
        super(Weather)
    }
}
new WeatherApi()
