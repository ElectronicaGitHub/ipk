var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var config = require('./config');
var mongoose = require('./libs/mongoose');
var log = require('./libs/log')(module);

var app = express();

function openConnection(cb) {
    mongoose.connection.on('open', function () {
        log.info('connected to database ' + config.get('db:name'));
        // cb();
    });
}
openConnection();

// view engine setup
process.env.NODE_ENV = 'production';
process.on('uncaughtException', function (error) {
   console.log('uncaughtException = ', error.stack);
});
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

var MongoStore = require('connect-mongo')(express);

app.use(express.session( {
    secret : config.get('session:secret'),
    key : config.get('session:key'),
    cookie : config.get('session:cookie'),
    store: new MongoStore({mongoose_connection : mongoose.connection})
}));

app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
require('./routes')(app);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

    

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

var server = http.createServer(app);
server.listen(config.get('port'), function(){
    log.info('Express server listening on port ' + config.get('port'));
});


// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
