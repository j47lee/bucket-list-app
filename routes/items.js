var express         = require('express');
var bodyParser      = require('body-parser'), //parses information from POST
var methodOverride  = require('method-override'); //used to manipulate POST
var itemsController = require('../controllers/itemsController');

var itemsRouter     = express.Router();

//GET ALL
router.get('/items', itemsController.getIndex);

//GET NEW FORM
router.get('/items/new', itemsController.new);

 //CREATE AFTER FORM SUBMISSION
router.post('/items', itemsController.create);

//GET ONE
router.get('/items/:id', itemsController.getOne);

//GET EDIT FORM
router.get('/items/:id/edit', itemsController.edit);

//UPDATE AFTER FORM SUBMISSION
router.put('/items/:id/', itemsController.update);

//DELETE ONE
router.delete('/items/:id', itemsController.destroy);

module.exports = itemsRouter;
