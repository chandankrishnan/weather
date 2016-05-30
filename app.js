/**
 * define require dependencies
 */
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = process.env.PORT || 8086;

/**
 * view engine setup
 */
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

/**
 * configure app
 */
app.use(bodyParser())
app.use(require('./controller/index.js'));

/**
 * listen port
 */
app.listen(port, function() {
    console.log('server run')
});