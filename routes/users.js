var express     = require('express');
var router      = express.Router();
// var superPhrase = process.env.NAMEOFTHECONSTANT;

var usersController = require('../controllers/usersController');

//GET NEW FORM
router.get('/users/new', usersController.new);

//middel where to verify token.
// apiRouter.use(function(req, res, next){
// // checks for token
//     var token = req.body.token || req.param ('token') || req.headers['x-access-token']
//     //decode the token
//     if(token){
//         // varify superPhrase and check expiration
//         jwt.verify(token, superPhrase, function(err, decoded){
//             if(err) return res.status(403).send({ success: false, message: "Access Denied Dude!"})
//             req.decoded = decoded;
//             next();
//         })
//     }else{
//         return res.status(403).send({success: false, message: "No token provided"});
//     }
// });
//GET ALL
router.get('/users', usersController.getIndex);
//CREATE AFTER FORM SUBMISSION
router.post('/users', usersController.create);
//GET ONE
router.get('/users/:id', usersController.getOne);
//GET EDIT FORM
router.get('/users/:id/edit', usersController.edit);
//UPDATE AFTER FORM SUBMISSION
router.put('/users/:id/', usersController.update);
//DELETE ONE
router.delete('/users/:id', usersController.destroy);

module.exports = router;
