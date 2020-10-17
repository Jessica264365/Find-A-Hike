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
        saveAsFav.on("click", function () {
          let favorites = {
            name: hikeName,
            summary: hikeSummary,
            length: hikeLength,
            image: hikeImg,
          };
          let savedFavorites =
            JSON.parse(localStorage.getItem("favorites")) || [];
          savedFavorites.push(favorites);
          localStorage.setItem("favorites", JSON.stringify(savedFavorites));
          console.log(savedFavorites);
        });
      }
      
    });
  });
});

