// GeoJSON url 
var token = 'OWUqA3XHifIffWaYdBATd4TVt';
var url = `https://chronicdata.cdc.gov/resource/hn4x-zwk7.json?$$app_token=${token}`;
var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'].reverse(); // lowest <> highest
var promises = [];

// Perform a GET request to the URL
// d3.json(url).then(function (data) {

// overwrite statesData and loop through each state using cdc data
statesData.features.forEach(function (state) {
  // fetch the data for the given state and save the promise
  const promise = d3.json(`${url}&locationdesc=${state.properties.name}`).then(function (data) {

    // find all data for every instance of each state and extracted value by mapping
    const densities = data.filter(function (item){
      return item.data_value;
    }).map(function (item) {
      // return data_value as decimal
      return parseFloat(item.data_value);
    });

    // initialize our average to 0 as the default
    let average = 0;

    // if densities exist for the state, calculate the average 
    // we check for densities.length so we don't divide by 0 (which would output NaN)
    if (densities.length) {
      // reduce allows you to map an array to a different data type 
      average = densities.reduce(function (sum, density) {
        return sum + density
      }, 0) / densities.length;
    }

    // overwrite density property in stateData (for each state inside map)
    state.properties.density = average;
  });

  // push our promise into our promises array
  promises.push(promise);
})

Promise.all(promises).then(function () {
  const densities = statesData.features.map(function (state) {
    return state.properties.density;
  });

  const min = Math.floor(Math.min.apply(null, densities));
  const max = Math.ceil(Math.max.apply(null, densities));
  const steps = colors.length;
  const step = (max - min) / steps;
  console.log('Min', min);
  console.log('Max', max);
  console.log('Steps', steps, 'x', step);

  // Create the map object
  var myMap = L.map("map", {
    center: [37.0902, -95.7192],
    zoom: 5
  });

  // Add base layer/tile layer to the map (background of map)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Add color
  function getColor(d) {
    // from max to min, find the color for the given step
    // we decrement (loop in reverse) so that we're finding highest values first
    for (let value = max - step, i = colors.length - 1; value >= min; value -= step, i--) {
      if (d >= value) {
        console.log('Density', d);
        console.log('Color', colors[i]);
        return colors[i];
      }
    }

    console.log('Density', d);
    console.log('Color', colors[0]);
    // return the first color by default (for the lowest/min density)
    return colors[0];
  }

  //Style
  function style(feature) {
    console.log(feature.properties.name);
      return {
          fillColor: getColor(feature.properties.density),
          weight: 2,
          opacity: 1,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7
      };
  }

  // save geojson
  var geojson;

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

  // Mouseout
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        // click: zoomToFeature
    });
  }

  // Add states to map
  geojson = L.geoJson(statesData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);

});