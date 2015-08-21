// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// TWITTER API SECTION ======================================================================
var TwitterAPI = require('twitter');

var client = new TwitterAPI({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public'));//set up for stylesheets and scripts

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// TWITTER WEB SOCKET ======================================================================
var router  = express.Router();
var server  = require('http').createServer(app);

var io = require('socket.io')(server);
var Twit = require('twit');
var twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
console.log(twitter);
var stream;
// var searchTerm;
io.on('connect', function(socket){

  socket.on('updateTerm', function(searchTerm){
    socket.emit('updatedTerm', searchTerm);
    console.log(searchTerm);
    if(stream){
      console.log('stopped stream');
      stream.stop();
    }
  stream = twitter.stream('statuses/filter', {track: searchTerm, language: 'en'});
  stream.on('tweet', function(tweet){
    var data = {};
      data.name = tweet.user.name;
      data.screen_name = tweet.user.screen_name;
      data.text = tweet.text;
      data.user_profile_image = tweet.user.profile_image_url;
      socket.emit('tweets', data);
  });
});
});

// TWITTER API ==================================================================================
app.post('/twitter', function(req, res) {
  client.get('search/tweets', req.body, function(err, tweets, response){
    // console.log(tweets);
    if (err) {
      console.log(err);
      return;
    }
    else {
      var userObj = { users: [] };
      for (var i = 0; i < tweets.statuses.length; i++) {
        var userURL = 'https://twitter.com/' + tweets.statuses[i].user.screen_name;
        var userScreenName = tweets.statuses[i].user.screen_name;
        var userImg = tweets.statuses[i].user.profile_image_url;
        var userImgBig = userImg.replace("normal", "400x400");
        var userText = tweets.statuses[i].text;
        var userTextSplit = userText.split(' ');
        var user = {
          url: userURL,
          name: userScreenName,
          imgSmall: userImg,
          imgBig: userImgBig,
          text: userText,
          words: userTextSplit
        };
        userObj.users.push(user);
      }
      res.json(userObj);
    }
      console.log(userObj);
  });
});


// var stream = twitter.stream('statuses/filter', {track: 'basketball'});
//
// io.on('connect', function(socket){
//   stream.on('tweet', function(tweet){
//     var data = {};
//     data.name = tweet.user.name;
//     data.screen_name = tweet.user.screen_name;
//     data.text = tweet.text;
//     data.user_profile_image = tweet.user.profile_image_url;
//     socket.emit('tweets', data);
//   });
// });








// launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);


module.exports = app;
