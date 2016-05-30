/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    request = require('request'),
    moment = require('moment'),
    showtimes = require("showtimes");
/**
 * strat with home html
 */
router.get('/', function(req, res) {
    res.render("home.html", {
        title: "Find Location"
    })
});

router.post('/',function(req,res){
	var txt=req.body.text;
    console.log(txt)
})
/**
 * in this function find the weather of location
 * @param {weather,location}
 * @return {weather}
 */
router.post('/weather', function(req, res) {
    var APPID = "f5f23a05ff5d8a89d845872adc352bd4",
        type = "weather",
        uri = "http://api.openweathermap.org/data/2.5/" + type;
    uri += "?q=" + req.body.location;
    uri += "&APPID=" + APPID;
    uri += "&units=imperial";

    if (type === "weather") {
        request(uri, function(err, req, body) {
            var data = JSON.parse(body),
                weather = "In " + data.name + ", I see " + data.weather[0].description + " ! ";
            weather += " Temp: " + Math.floor(data.main.temp) + " degrees(F)";
            weather += " Humidity: " + data.main.humidity + " %";
            weather += " Wind: " + Math.floor(data.wind.speed) + " mph";
            weather += " Cloud Cover :" + data.clouds.all + " %";

            res.send(weather);
        });
    }
});

/**
 * in this function get current cricket matches
 * @return {matches}
 */
router.get('/getMatches', function(req, res) {
    var cricapi = require("node-cricapi");
    cricapi.cricketMatches(function(data) {
        res.send(data);
    })
})

/**
 * in this function we get nearest movie theater of your location
 * @param {location}
 * @return {theater}
 */
router.post('/movie', function(req, res) {
    var data = req.body.location,
        api = new showtimes(data);
    api.getTheaters(function(error, theaters) {
        if (error) {
            throw error
        }
        res.send(theaters);
    });

});

/**
 * @export {router}
 */
module.exports = router;