// GeoJSON url 
var url = "https://chronicdata.cdc.gov/resource/hn4x-zwk7.json";

// Perform a GET request to the URL
d3.json(url).then(function (data) {
  // overwrite statesData and looping through each state using cdc data
  statesData.features.forEach(function (state) {
    // find all data for every instance of each state and extracted value by mapping
    const densities = data.filter(function (item){
      return item.locationdesc == state.properties.name && item.data_value;
    }).map(function (item) {
      // return data_value as decimal
      return parseFloat(item.data_value);
    });
    console.log(densities);
    // reduce allows you to map an array to a different data type 
    // a = accumulator; b = value from array
    const average = densities.reduce(function (sum, density) {
      return sum + density
    }, 0) / densities.length;

    // overwriting density property in stateData (for each state inside map)
    state.properties.density = average;

     console.log(average);

    return state;
  })

  // Create the map object
  var myMap = L.map("map", {
    center: [39.4169, -119.8348],
    zoom: 5
  });

  // Add base layer/tile layer to the map (background of map)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  console.log(statesData);

  // Add color
  function getColor(d) {
      return d > 90 ? '#562395' :
            d > 80  ? '#6f2dbd' :
            d > 70  ? '#8B48C5' :
            d > 60  ? '#A663CC' :
            d > 50   ? '#A485D5' :
            d > 40  ? '#B5B4E4' :
            d > 30   ? '#a0c0e4' :
            d > 20   ? '#B9E5F2' :
            d > 10   ? '#B9FAF8' :
                        '#10D1CD';
  }

  //Style
  function style(feature) {
      return {
          fillColor: getColor(feature.properties.density),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
  }

  // Add states to map
  L.geoJson(statesData, {style: style}).addTo(myMap);

  // Add interaction
  function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });

      layer.bringToFront();
  }
});
