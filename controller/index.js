/**
 * define require module
 */
var express = require('express'),
    router = express.Router(),
    request = require('request'),
    moment = require('moment'),
    geocode = require('google-geocode')
showtimes = require("showtimes"),
cricapi = require("node-cricapi");
geocode.setApiKey('AIzaSyAvYqMsQQRVHfJNmWcXnzqNhu02jmDXyhs');

/**
 * in this function get welcome message
 * @return {string msg}
 */
router.get('/', function(req, res) {
    res.send("Welcome to app");
});

/**
 * in this function find nearest location what we want
 * @param {loaction,search}
 *return {body}
 */
router.post('/get', function(req, res) {
    var location = req.body.location,
        search = req.body.search;
    geocode.getGeocode(location, function(results, status) {
        var a = JSON.parse(results),
            uri = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
        uri += 'location=' + a.results[0].geometry.location.lat + ',' + a.results[0].geometry.location.lng;
        uri += '&radius=500&types=' + search; //+search;
        uri += '&key=AIzaSyAvYqMsQQRVHfJNmWcXnzqNhu02jmDXyhs';
        request(uri, function(err, req, body) {
            res.send(JSON.parse(body));
        })
    });
});

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
    cricapi.cricketMatches(function(data) {
        res.send(data);
    })
});

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
