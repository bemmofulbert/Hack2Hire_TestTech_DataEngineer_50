const Data = require("../bd/Data")

const Weather = new Data("Weather",
    [
        'id',
        'city',
        'description',
        'pressure',
        'humidity',
        'time',
        'rawjson',
    ])

module.exports = Weather
