let locationAPIKey = "&key=AIzaSyArKQOrofS8pb4t-jdDf7fsqmVJHuqIQG4";

let submitBtn = $("#submitButton");
let displayResults = $("#displayResults");

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
        let newDiv = $("<div>");
        let hikeNameDiv = $("<div>");
        let hikeSummaryDiv = $("<div>");
        let hikeLengthDiv = $("<div>");
        let hikeImgDiv = $("<div>");
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
