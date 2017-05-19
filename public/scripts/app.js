console.log("Sanity Check: JS is working!");

$(document).ready(function(){

$.ajax({
  method: "GET",
  url: 'https://glacial-brushlands-72768.herokuapp.com/api/profile',
  dataType: 'json',
  success: onSuccess,
  error: onError
})
$('#restaurantButton').on('click', function(e){
  e.preventDefault();
  $.ajax({
    method: "GET",
    url: 'https://glacial-brushlands-72768.herokuapp.com/api/restaurants',
    dataType: 'json',
    success: restaurantSuccess,
    error: onError
  })
})

$('form').on('submit', function(e){
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: 'localhost:3000/api/restaurants',
    data: $(this).serializeArray(),
    success: postRestSuccess,
    error: onError
  })
})

function postRestSuccess (json){
  $('form').prepend(`<h3>Restaurant Successfully Added!</h3>`);
}

function restaurantSuccess(json){
  console.log(json.restaurants);
  $('#restaurants').empty();
  $('#profile').empty();
  for (var i = 0; i < json.restaurants.length; i++) {
    var template = `<div class="caption">
                    <h3>${json.restaurants[i].name}</h3>
                    <p>${json.restaurants[i].description}</p>
                    <p>Rating: ${json.restaurants[i].rating}</p>
                    </div>`;
    $('#restaurants').append(template);
  }

}

function onSuccess (json){
  console.log(json);
  var template = `<img src="${json.githubProfileImage}" alt="profile pic">
      <div class="caption">
        <h3>${json.name}</h3>
        <p>${json.githubUsername} click below to visit my portfolio</p>
        <p><a href='https://www.${json.personalSiteLink}' class="btn btn-primary" role="button">GitHub</a></p>
      </div>`;
      $('#profile').append(template);
}
function onError(){
  console.log("it's not working");
}

// your code

});
