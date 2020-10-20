// var messageEL = $("#msg");
//retrieve cities from local storage
var cityList = JSON.parse(localStorage.getItem("searchCities")) || [];
var listEL = $(".list-group");

let locationAPIKey = "&key=AIzaSyArKQOrofS8pb4t-jdDf7fsqmVJHuqIQG4";

let submitBtn = $("#submitButton");
let displayResults = $("#displayResult");

submitBtn.on("click", function (event) {
  event.preventDefault();
  let userInputLocation = $("#citySearch").val();
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
        saveAsFav.addClass("btn");
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
        image.attr("style", "max-width: 200px");
        // image.attr("style", "opacity: 1")

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
// submitBtn.on("click",function(event){
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
