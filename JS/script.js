// var submitEl = $("#button");
// var inputEL = $("#txtSearch");
<<<<<<< HEAD
var clearButtonEL = $("#clearButton");
var messageEL = $("#msgid");
var cityListEL = $(".citylist");
// var userInputLocation = $("#citySearch").val();
//retrieve cities from local storage
var cityList = JSON.parse(localStorage.getItem("cities")) || [];
var listEL = $(".list-group");
var hikeNameDivEL = $(".hikeNameDiv");
var hikeSummaryDivEL = $(".hikeSummaryDiv");
var hikeLengthDivEL = $(".hikeLengthDiv");

var hikeImgEL = $(".hikeImg");
=======
// var messageEL = $("#msg");
// //retrieve cities from local storage
// var cityList = JSON.parse(localStorage.getItem("searchCities")) || [];
// var listEL = $(".list-group");
>>>>>>> 0e88d279f12c4267c12be27e33f9186939cdf3d8

let locationAPIKey = "&key=AIzaSyArKQOrofS8pb4t-jdDf7fsqmVJHuqIQG4";

let submitBtn = $("#submitButton");
let displayResults = $("#displayResult");

submitBtn.on("click", function (event) {
  event.preventDefault();
  let userInputLocation = $("#citySearch").val();
  storeCityToList(userInputLocation);
  let locationQueryURL =
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
    userInputLocation +
    locationAPIKey;

  console.log(userInputLocation);

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
      // displayResults.text(JSON.stringify(response));

      for (let i = 0; i < response.trails.length; i++) {
        let newDiv = $("<div>");
        let hikeNameDiv = $("<div>");
        let hikeSummaryDiv = $("<div>");
        let hikeLengthDiv = $("<div>");
        let hikeImgDiv = $("<div>");
        let saveAsFav = $("<button>");
        saveAsFav.text("Add to Favorites");

        let hikeName = response.trails[i].name;
        hikeNameDivEL.text(response.trails[i].name);
        console.log(hikeNameDivEL);
        let hikeSummary = response.trails[i].summary;
        // hikeSummaryDivEL.text(response.trails[i].summary)
        let hikeLength = response.trails[i].length;
        // hikeLengthDivEL.text(response.trails[i].length)
        let hikeImg = response.trails[i].imgMedium;
        hikeImgEL.text(response.trails[i].imgMedium);
        // console.log(response.trails[0].name);

        // hikeNameDiv.append(hikeName);
        // hikeSummaryDiv.append(hikeSummary);
        // hikeLengthDiv.append(hikeLength);
        let image = $("<img>");

        image.attr("src", hikeImg);
        hikeImgDiv.append(image);

        newDiv.append(hikeNameDiv);
        newDiv.append(hikeSummaryDiv);
        newDiv.append(hikeLengthDiv);
        newDiv.append(hikeImgDiv);
        newDiv.append(saveAsFav);

        displayResults.append(newDiv);
      }
    });
  });
});

//function
function storeCityToList(cityName)
{
  if(cityName === "")
  {
      displayMessage("error","please enter city name");     
  }
  
  if(cityName != "")
  {
    console.log(cityList.length);
    if(cityList.length >= 8)
    {
      console.log("listlength");
      clearList();
      console.log(cityList.length);
    }
    // cityListEL.addClass("show");
  cityList.push(cityName);
  messageEL.addClass("hide");
  localStorage.setItem("cities",JSON.stringify(cityList));
  
  
  renderCities();
  }


}
//function to remove city
function clearList()
{
  localStorage.clear();
  // cityListEL.addClass("hide");
  console.log(cityList.length);
}


<<<<<<< HEAD
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

if(JSON.parse(localStorage.getItem("cities")))
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
//
function appendCityToInputText()
{
  let city = $(this).attr("data-name");
  console.log(city);
  $("#citySearch").val(city);

}
//
$(document).on("click",".city",appendCityToInputText)



clearButtonEL.on("click",function(){
  $("#citySearch").val("");

});
renderCities();
=======
// //function to display error message when user click on submit button without 
// // entering city in input box
// function displayMessage(type,message)
// {
//     messageEL.text(message);
//     messageEL.attr("class",type);

// }

// // function to display cities
// function renderCities(){
//   listEL.empty();
//   console.log("render function called");    

// if(JSON.parse(localStorage.getItem("searchCities")))
// {
// //looping thru the city array to display each city
// for(var i=0;i<cityList.length;i++)
// {
//   var button = $("<button>");
//   button.addClass("city")
//   button.attr("data-name",cityList[i]);
// button.text(cityList[i]);
// console.log("city added")
// listEL.append(button);
// }
// }

// }

// // submit button click event
// submitEl.on("click",function(event){
//   console.log("button clicked");
//   event.preventDefault();
//   var city = inputEL.val().trim();
//   if(city === "")
//   {
//       displayMessage("error","please enter city name");     
//   }
  
//   if(city != "")
//   {
//   cityList.push(city);
//   messageEL.addClass("hide");
//   localStorage.setItem("searchCities",JSON.stringify(cityList));
  
//   inputEL.val("");
//   renderCities();
//   }
// });
// renderCities();
>>>>>>> 0e88d279f12c4267c12be27e33f9186939cdf3d8
