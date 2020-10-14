var submitEl = $("#button");
var inputEL = $("#txtSearch");
var messageEL = $("#msg");
//retrieve cities from local storage
var cityList = JSON.parse(localStorage.getItem("searchCities")) || [];
var listEL = $(".list-group");

let locationAPIKey = "&key=AIzaSyArKQOrofS8pb4t-jdDf7fsqmVJHuqIQG4";
let userInputLocation = "Seattle,+WA";
let locationQueryURL =
  "https://maps.googleapis.com/maps/api/geocode/json?address=" +
  userInputLocation +
  locationAPIKey;

$.ajax({
  url: locationQueryURL,
  method: "GET",
}).then(function (response) {
  console.log(response);
  let latitude = response.results[0].geometry.location.lat;
  let longitude = response.results[0].geometry.location.lng;

  console.log(latitude);
  console.log(longitude);
  let hikingTrailAPIKey = "200940861-fc81625f642955d6ab06a498327fb786";

  let hikingTrailsURL =
    "https://www.hikingproject.com/data/get-trails?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&maxDistance=10&key=" +
    hikingTrailAPIKey;

  $.ajax({
    url: hikingTrailsURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});



//function to display error message when user click on submit button without 
// entering city in input box
function displayMessage(type,message)
{
    messageEL.text(message);
    messageEL.attr("class",type);

}

// function to display cities
function renderCities(){
  listEL.empty();
  console.log("render function called");    

if(JSON.parse(localStorage.getItem("searchCities")))
{
//looping thru the city array to display each city
for(var i=0;i<cityList.length;i++)
{
  var button = $("<button>");
  button.addClass("city")
  button.attr("data-name",cityList[i]);
button.text(cityList[i]);
console.log("city added")
listEL.append(button);
}
}

}

// submit button click event
submitEl.on("click",function(event){
  console.log("button clicked");
  event.preventDefault();
  var city = inputEL.val().trim();
  if(city === "")
  {
      displayMessage("error","please enter city name");     
  }
  
  if(city != "")
  {
  cityList.push(city);
  messageEL.addClass("hide");
  localStorage.setItem("searchCities",JSON.stringify(cityList));
  
  inputEL.val("");
  renderCities();
  }
});
renderCities();