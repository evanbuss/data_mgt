/** Dependencies **/
var express = require('express');
var path = require("path");
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var MongoStore = require('connect-mongo')(session);
var sessionOptions = {
  url: 'mongodb://localhost/users', // should be change on config
  ttl: 14 * 24 * 3600 // 14 days
}
/** Gravatar **/
var gravatar = require('gravatar');

/** Setup **/
var app = express();
app.use(session({
    secret: 'kobebeef',
    saveUninitialized: false, // don't create session until something stored
    resave: true, // false, if you don't want to save session if unmodified
    store: new MongoStore(sessionOptions)
}));
app.use(logger('dev'));
// resumable.js

app.use(express.static(path.join(__dirname, "/client")));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//app.use(bodyParser.text({ type: 'text/html' }))

app.set('views', __dirname + '/client'); // general config
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');

/** Requires **/
require('./config/sql.js')(app);
require('./config/routes.js')(app, gravatar);

/** Port **/
app.listen(8000,function(){
	console.log("Listening on Port 8000");
	console.log("Developed by Evan Buss");
});


