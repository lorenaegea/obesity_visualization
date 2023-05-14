function init() {
  //using Kansas coordinates 39.0119° N, 98.4842° W
  var myMap = L.map("map", {
    center: [39.0119, -98.482],
    zoom: 4.5,
  });

  // Adding the tile layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(myMap);

  // access the URL endpoint
  dataURL = "https://chronicdata.cdc.gov/resource/hn4x-zwk7.json";
  //
  d3.json(dataURL).then(function (data) {
    var obesity = [];
    var exercise = [];

    // console.log(data)

    // access only the entries that answer the question "Percent of adults aged 18 year and older who have obesity"
    // and "Percent of adults who engage in no leisure-time physical activity”
    for (var i = 0; i < data.length; i++) {
      if (data[i].questionid == "Q036")
        // obesity
        obesity.push(data[i]);
      else if (data[i].questionid == "Q047")
        // exercise
        exercise.push(data[i]);
    }

    for (var i = 0; i < obesity.length; i++) {
      var geolocation = obesity[i].geolocation;
      var radius = obesity[i].sample_size * 1;

      // create markers using location, radius, and depth values
      L.circleMarker([geolocation["latitude"], geolocation["longitude"]], {
        color: "black",
        weight: 1,
        fillColor: circleColor(radius),
        fillOpacity: 0.5,
      });
      //.addTo(myMap);
    }

    for (var i = 0; i < exercise.length; i++) {
      var geolocation = exercise[i].geolocation;
      var radius = exercise[i].data_value * 1;

      // create markers using location, radius, and depth values
      L.circleMarker([geolocation["latitude"], geolocation["longitude"]], {
        radius: radius,
        color: "black",
        weight: 1,
        fillColor: circleColor(radius),
        fillOpacity: 0.25,
      }).addTo(myMap);
    }
  });
}

// function to determine color of circle
function circleColor(value) {
  if (value <= 10) return "blue";
  else if (value <= 15) return "green";
  else if (value <= 20) return "yellow";
  else if (value >= 25) return "orange";
  else if (value >= 30) return "red";
}

init();
