var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var express = require('express')
var session = require('express-session')

var routes = require('./routes/index');
var users = require('./routes/users');
var pages = require('./routes/pages');
var cards = require('./routes/cards');
var login = require('./routes/login');
var quit = require('./routes/quit');
var config = require("./conf/config");

var app = express();


/** Variables globales **/
global.users = {};


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'conf')));

// Session | store a cookie exemple : res.cookie(name, value, { expire : new Date() + 3600, maxAge : 3600 } );
app.use(session({ secret : 'bebert noob', resave : true, saveUninitialized : true }));


// Routes
app.use('/login', login);
app.use('/users', users);
app.use('/pages', pages);
app.use('/cards', cards);
app.use('/quit', quit);
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
	res.sendFile(__dirname + '/public/lib/error_pages/404.html');
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;


app.set('port', 1337);

var debug = require('debug')('mtg');
var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});






/** Sockets **/
var io = require('socket.io').listen(server);
var events_socket = require('./sockets/events.js');
io.on('connection', function (socket) {
    var current_user = {};
    events_socket.events(socket, current_user);
});

