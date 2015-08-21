$(document).ready(function(){//Load JQuery on Ready
var searchField  = $('#search-field');
var searchButton = $('#search-button');


// AJAX TWEETS
// ==========================================================


// ON Search Button
// ===================================
searchButton.on('click',function () {
  var searchTerm = searchField.val();
  var search_term = {
    q: searchTerm
  };

  searchTweets(search_term);
});

//Search Tweets
// ===================================
function searchTweets(search_term) {
  console.dir(search_term);

  $.ajax({
      method: 'post',
      url: '/twitter',
      data : JSON.stringify(search_term),
      contentType: 'application/json; charset=UTF-8',
      dataType   : 'json',
      success: function(data) {
        for (var i = 0; i < data.users.length; i++) {
          console.dir(data.users[i]);
          $('.tweet-results').prepend(
            "<div class='tweets'>" +   '<a href="' +
            data.users[i].url + '">' + '<img src="' +
            data.users[i].imgSmall +'" />'  + "<p>" +
            data.users[i].name + "</p>" + "</div>"
          )
        }
      },
      error: function(error,data){
        console.log(error);
        console.log(data);
      }
  });//End Ajax Post


} //end searchTweets function



});//End Document Ready
