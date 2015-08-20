$(document).ready(function(){//Load JQuery on Ready
var loginForm    = $('#login-form');
var loginButton  = $('#login-btn');
var signUpForm   = $('#sign-up-form');
var signUpButton = $('#sign-up-btn');
// USER LOG IN REQUEST
// ==========================================================


// USER LOG IN REQUEST
// ==========================================================

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
});//END LOG IN REQUEST

// NEW USER SIGN UP REQUEST
// ==========================================================
signUpForm.on('submit',function (evt) {
  evt.preventDefault();
  console.log(evt.target.email.value + evt.target.password.value);

  $.ajax({
    method: "POST",
    url: "http://localhost:8080/sign-up",
    dataType: 'json',
    contentType: 'application/json; charset=UTF-8',
    data : JSON.stringify({user: { name: evt.target.name.value,
                                   email: evt.target.email.value ,
                                   password: evt.target.password.value}}),
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
  });//END POST REQUEST
})//END SIGN UP REQUEST



});//End Document Ready
