$(document).ready(function(){//Load JQuery on Ready

var loginForm       = $('#login-form');
var loginButton = $('#login-btn');

loginForm.on('submit',function(event) {
  event.preventDefault();
  var userInfo = $(this).serialize();
  console.log(userInfo);


  // GET
  // $.ajax({
  //   method: 'get',
  //   url: "http://localhost:8080/users",
  //   crossDomain : true,
  //   success : function (returnedData) {
  //     console.log("success");
  //     console.log(returnedData);
  //     console.log(userInfo);
  //   },
  //   error: function (error, data) {
  //     console.log('error handler');
  //     console.log(error);
  //     console.log(data);
  //   }
  // });//END GET

  $.ajax({
    method: 'Get',
    url: "http://localhost:8080/users",
    data: JSON.stringify({userInfo}),
    success : function (returnedData) {
      console.log("success");
      console.dir(returnedData);
    },
    error: function (error, data) {
      console.log('error handler');
      console.log(error);
      console.log(data);
    }
  });//END POST
});


});//End Document Ready
