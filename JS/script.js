var messageEL = $("#msg");

var listEL = $(".list-group");

var clearButtonEL = $("#clearButton");

let locationAPIKey = "&key=AIzaSyArKQOrofS8pb4t-jdDf7fsqmVJHuqIQG4";

let submitBtn = $("#submitButton");
let displayResults = $("#displayResult");

//retrieve cities from local storage
var cityList = JSON.parse(localStorage.getItem("searchCities")) || [];

submitBtn.on("click", function (event) {
  event.preventDefault();
  let userInputLocation = $("#citySearch").val();

  

//save city name  in array
  saveCityToList(userInputLocation);

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
        let newRow = $("<div>");
        newRow.addClass("row");
        newRow.attr("style", "padding: 20px");
        let firstColumn = $("<p>");
        firstColumn.addClass("col-xs-3 col-md-3");
        // let newDiv = $("<div>");
        let secondColumn = $("<p>");
        secondColumn.addClass("col-xs-6 col-md-6");
        let hikeNameDiv = $("<div>");
        let hikeLengthDiv = $("<div>");
        let thirdColumn = $("<div>");
        thirdColumn.addClass("col-xs-3 col-md-3");
        let hikeImgDiv = $("<div>");
        let hikeSummaryDiv = $("<div>");
        let saveAsFav = $("<button>");
        saveAsFav.text("Add to Favorites");

        let hikeName = response.trails[i].name;
        let hikeSummary = response.trails[i].summary;
        let hikeLength = response.trails[i].length;
        let hikeImg = response.trails[i].imgMedium;
        // console.log(response.trails[0].name);

        hikeNameDiv.append(hikeName);
        hikeSummaryDiv.append(hikeSummary);
        hikeLengthDiv.append(hikeLength);
        let image = $("<img>");
        image.attr("style", "max-height: 100px");
        image.attr("style", "max-width: 100px");

        image.attr("src", hikeImg);
        hikeImgDiv.append(image);

        firstColumn.append(hikeNameDiv);
        secondColumn.append(hikeSummaryDiv);
        firstColumn.append(hikeLengthDiv);
        thirdColumn.append(hikeImgDiv);
        firstColumn.append(saveAsFav);

        newRow.append(firstColumn);
        newRow.append(secondColumn);
        newRow.append(thirdColumn);

        displayResults.append(newRow);
      }
    });
  });
});

//function to clear the input text box

clearButtonEL.on("click",function(){
  console.log("function called");
  $("#citySearch").val("");

});

//function to display error message when user trying to click on submit button without
// entering city name in input box
function displayMessage(type,message)
{
    messageEL.text(message);
    messageEL.attr("class",type);

}


//function will be called after user enter city name and click on submit button to save city in array
function saveCityToList(cityName)
{
  //if user trying to click submit button without entering city name,then page displays error message
  if(cityName === "")
  {
      displayMessage("error","please enter city name");     
  }
  
  if(cityName != "")
  {
    messageEL.addClass("hide");
  cityList.push(cityName);
  messageEL.addClass("hide");
  localStorage.setItem("searchCities",JSON.stringify(cityList));
  
  // render cities
  renderCities();
  }


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

// function to append the city name in input text box
function appendCityToInputText()
{
  let city = $(this).attr("data-name");
  console.log(city);
  $("#citySearch").val(city);

}

//when user click on one of the city names in list ,appendCityToInputText function will be called
$(document).on("click",".city",appendCityToInputText)

// render cities
renderCities();