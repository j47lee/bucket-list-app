$(document).ready(function(){//Load JQuery on Ready

// USER LOG IN REQUEST
// ==========================================================
var loginForm   = $('#login-form');
var loginButton = $('#login-btn');
var User = require('../models/user'); // pull in the user schema for authentication

loginForm.on('submit',function(evt) {
  evt.preventDefault();
  console.log(evt.target.password.value + evt.target.email.value);

  $.ajax({
    method: 'POST',
    url: "http://localhost:8080/login",
    data : JSON.stringify({user: { email: evt.target.email.value ,password: evt.target.password.value}}),
    contentType: 'application/json; charset=UTF-8',
    dataType: 'json',
    success : function (returnedData) {
      console.log("success");
      console.dir(returnedData);
      window.location = "users";
    },
    error: function (error, data) {
      console.log('error handler');
      console.log(error);
      console.log(data);
    }
  });//END POST
});


});//End Document Ready
