var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var mongoose     = require('mongoose');
var bcrypt       = require('bcrypt');
var cors = require('cors');

//REQUIRE ROUTES
var routes       = require('./routes/index');
var usersRoutes  = require('./routes/users');
var itemsRoutes  = require('./routes/items');

//WEB TOKENS
var jwt          = require("jsonwebtoken");

//MONGOOSE CONNECT AND ESTABLISH DATABASE WITH MONGOLAB
mongoose.connect('mongodb://admin:bucketlist@ds059712.mongolab.com:59712/bucketlist-db');
//mongoose.connect('mongodb://localhost:27017/bucketlist-db');

var app = express();

//SERVER SET UP AND LISTEN
var port    = process.env.PORT || 8080;
var router  = express.Router();
var server  = require('http').createServer(app);

//SERVER LISTEN
app.use('/', router);
server.listen(port, function(){
  console.log('Server Started. Listening to localhost:8080');
});

//SOCKET IO SETUP
var io = require('socket.io')(server);

// TWITTER WEBSOCKET BEGINS //////////////////////////////////////////////////////////////////////////////
var Twit = require('twit');
var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})
console.log(twitter);

//set stream to the "twitter" instance of Twit from above
//here we hard set the track keyword to search in twitter. can be any word we want to search
var stream = twitter.stream('statuses/filter', {track: 'basketball'});

//server-side: io.on turns on websocket whenever we see the keyword "connect"
io.on('connect', function(socket){
  //server-side: stream is event listener. turn stream on and run the function inside
  stream.on('tweet', function (tweet) {
    //filter data that we want
    var data = {};
      data.name = tweet.user.name;
      data.screen_name = tweet.user.screen_name;
      data.text = tweet.text;
      data.user_profile_image = tweet.user.profile_image_url;
      data.created_at = tweet.created_at;
    //client-side: this sends info to the client: runs socket emit
    socket.emit('tweets', data);
  });
});
// TWITTER WEBSOCKET ENDS ////////////////////////////////////////////////////////////////////////////////////////////

//temporary routing for index page to display twitter ////////////////////////////////////////////////////////////////
// router.get('/', function(req, res) {
//   res.render('user', { header: 'Twitter streams'});
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Front-end', express.static(__dirname + '/Front-end'));
// app.use(cors);

//USE ROUTES
app.use(routes);
app.use(usersRoutes);
app.use(itemsRoutes);
// app.use('/', routes);  //to be removed
// app.use('/users', users);  //to be removed

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


//Allows for cross domain acccess
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });



module.exports = app;
