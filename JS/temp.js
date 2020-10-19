var messageEL = $("#msg");

var listEL = $(".list-group");

//retrieve cities from local storage
var cityList = JSON.parse(localStorage.getItem("searchCities")) || [];

let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

var listEL = $(".list-group");

let locationAPIKey = "&key=AIzaSyArKQOrofS8pb4t-jdDf7fsqmVJHuqIQG4";

let submitBtn = $("#submitButton");
let displayResults = $("#displayResult");
let displayFavorites = $("#displayFavorites");

submitBtn.on("click", function (event) {
     event.preventDefault();
     let userInputLocation = $("#citySearch").val();

     //save city name  in array
     saveCityToList(userInputLocation);

     //clear the input text box
     $("#citySearch").val("");

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
               var results = response.trails;
               console.log(results);

               renderCurrentCityResult(results);
          });
     });
});

// function currentcity results

function renderCurrentCityResult(results) {
     // displayResults.remove("hide");
     displayResults.empty();
     console.log("functioncalled");
     displayFavorites.addClass("hide");
     displayResults.removeClass("hide");
     for (let i = 0; i < results.length; i++) {
          let newRow = $("<div>");
          newRow.addClass("row");
          newRow.attr("style", "padding: 20px");
          let firstColumn = $("<div>");
          firstColumn.addClass("col s3");

          let secondColumn = $("<div>");
          secondColumn.addClass("col s6");
          let hikeNameDiv = $("<div>");
          let hikeLengthDiv = $("<div>");
          let thirdColumn = $("<div>");
          thirdColumn.addClass("col s3");
          let hikeImgDiv = $("<div>");
          let hikeSummaryDiv = $("<div>");
          let saveAsFav = $("<button>");
          saveAsFav.text("Add to Favorites");

          let hikeName = results[i].name;
          let hikeSummary = results[i].summary;
          let hikeLength = results[i].length;
          let hikeImg = results[i].imgMedium;
          console.log(hikeName);
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

          saveAsFav.on("click", function () {
               let favorites = {
                    name: hikeName,

                    summary: hikeSummary,
                    length: hikeLength,

                    image: image.attr("src"),
               };
               console.log(favorites);
               // let savedFavorites =
               //      JSON.parse(localStorage.getItem("favorites")) ||
               //      [];
               savedFavorites.push(favorites);
               localStorage.setItem(
                    "favorites",
                    JSON.stringify(savedFavorites)
               );
               console.log(savedFavorites);
          });
     }
}

//
let favoritesButton = $(".switch");
favoritesButton.on("click", function () {
     displayResults.addClass("hide");
     displayFavoritesResult();
});

//display favorites

function displayFavoritesResult() {
     displayResults.addClass("hide");
     displayFavorites.removeClass("hide");
     console.log("function called");
     let savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
     for (let i = 0; i < savedFavorites.length; i++) {
          let newRow = $("<div>");
          newRow.addClass("row");
          newRow.attr("style", "padding: 20px");
          let firstColumn = $("<div>");
          firstColumn.addClass("col s3");
          // let newDiv = $("<div>");
          let secondColumn = $("<div>");
          secondColumn.addClass("col s6");
          let hikeNameDiv = $("<div>");
          let hikeLengthDiv = $("<div>");
          let thirdColumn = $("<div>");
          thirdColumn.addClass("col s3");
          let hikeImgDiv = $("<div>");
          let hikeSummaryDiv = $("<div>");

          let hikeName = name;
          let hikeSummary = savedFavorites[i].summary;
          let hikeLength = savedFavorites[i].length;
          let hikeImg = savedFavorites[i].imgMedium;
          console.log(hikeName);

          hikeNameDiv.append(hikeName);
          hikeSummaryDiv.append(hikeSummary);
          hikeLengthDiv.append(hikeLength);
          let image = $("<img>");
          image.attr("style", "max-height: 100px");
          image.attr("style", "max-width: 100px");

          image.attr("src", hikeImg);
          image.attr("style", "height:100");
          image.attr("style", "width:100");
          hikeImgDiv.append(image);

          console.log(savedFavorites);

          firstColumn.append(hikeNameDiv);
          secondColumn.append(hikeSummaryDiv);
          firstColumn.append(hikeLengthDiv);
          thirdColumn.append(hikeImgDiv);

          newRow.append(firstColumn);
          newRow.append(secondColumn);
          newRow.append(thirdColumn);

          displayFavorites.append(newRow);
     }
}
// let favoritesButton = $(".switch");
// favoritesButton.on("click", function () {
// displayResults.addClass("hide");
// displayFavorites();
// });

//function will be called after user enter city name and click on submit button to save city in array
function saveCityToList(cityName) {
     //if user trying to click submit button without entering city name,then page displays error message
     if (cityName === "") {
          displayMessage("error", "please enter city name");
     }

     if (cityName != "") {
          if (cityList.length > 2) {
               rendercitiesUpToThree();
          }
          messageEL.addClass("hide");
          cityList.push(cityName);
          messageEL.addClass("hide");
          localStorage.setItem("searchCities", JSON.stringify(cityList));

          // render cities
          renderCities();
     }
}

//function to display error message when user trying to click on submit button without
// entering city name in input box
function displayMessage(type, message) {
     messageEL.text(message);
     messageEL.attr("class", type);
}

// render 3  previous search cities
function rendercitiesUpToThree() {
     var items = JSON.parse(localStorage.getItem("searchCities"));
     items.splice(0, 1);
     console.log(items);
     localStorage.setItem("searchCities", JSON.stringify(items));
     cityList = JSON.parse(localStorage.getItem("searchCities"));
}

// function to display cities
function renderCities() {
     listEL.empty();
     // console.log("render function called");

     if (JSON.parse(localStorage.getItem("searchCities"))) {
          //looping thru the city array to display each city
          for (var i = 0; i < cityList.length; i++) {
               var button = $("<button>");
               button.addClass("city");
               button.attr("data-name", cityList[i]);
               button.text(cityList[i]);
               // console.log("city added");
               listEL.append(button);
          }
     }
}

// function to append the city name in input text box
function appendCityToInputText() {
     let city = $(this).attr("data-name");
     // console.log(city);
     $("#citySearch").val(city);
}

//when user click on one of the city names in list ,appendCityToInputText function will be called
$(document).on("click", ".city", appendCityToInputText);

//render cities
renderCities();
