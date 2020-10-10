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
