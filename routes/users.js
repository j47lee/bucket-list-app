var express = require('express');
var router = express.Router();

var usersController = require('../controllers/usersController');

//GET ALL
router.get('/users', usersController.getIndex);
//GET NEW FORM
router.get('/users/new', usersController.new);
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
