var express     = require('express');
var router      = express.Router();
// var superPhrase = process.env.NAMEOFTHECONSTANT
var app         = express();
var User        = require('../models/User');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//LOG IN ROUTE
router.post('/login',function (req,res) {
  var UserBody = req.body.user;
  User.findOne({email:UserBody.email}, function (error, user) {
    if(error) return console.log(error);
    res.json(user);
  });
});

//SIGN UP ROUTE
router.get('/sign-up',function(req,res,next) {
  res.render('sign-up');
});

// // login token auth
// app.post('/signin',function(req, res){
//   var UserBody = req.body.user;
//   User.findOne({email:UserBody.email}).select("name email admin password").exec(function (err, user) {
//     if(err) return console.log(err);
//     if(!user){
//       res.json({success:false, message:"there is no user matched"});
//     } else {
//       var validPassword=user.authenticate(UserBody.password);
//       if(!validPassword){
//         res.json({success:false, message:"password is wrong"});
//       } else {
//           var token = jwt.sign({
//               name: user.name,
//               email: user.email,
//               admin: user.admin
//           },
//           superPhrase,
//         { expiresInMinutes: 1440 //expires in 24hrs
//         })
//         res.json({success:true, message: "found user " + user.name + " Here is your token", token: token});
//       }
//     }
//   })
// });





module.exports = router;
