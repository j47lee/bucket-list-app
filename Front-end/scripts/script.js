$(document).ready(function(){//Load JQuery on Ready

var loginForm   = $('#login-form');
var loginButton = $('#login-btn');

loginForm.on('submit',function(event) {
  event.preventDefault();
  // console.log(event.target.name.value);


  //GET
  $.ajax({
    method: 'get',
    url: "http://localhost:8080/items",
    crossDomain : true,
    success : function (returnedData) {
      console.log("success");
      console.log(returnedData);
    },
    error: function (error, data) {
      console.log('error handler');
      console.log(error);
      console.log(data);
    }
  });//END GET

  // $.ajax({
  //   method: 'Post',
  //   data: JSON.stringify({name:"jesse"}),
  //   url: "http:/localhost:8080/items",
  //   success : function (returnedData) {
  //     console.log("success");
  //     console.dir(returnedData);
  //   },
  //   error: function (error, data, bullshit) {
  //     console.log('error handler');
  //     console.log(error);
  //     console.log(data);
  //     console.log(bullshit);
  //   }
  // });//END POST
});


});//End Document Ready
