// GeoJSON url 
var token = 'OWUqA3XHifIffWaYdBATd4TVt';
var url = `https://chronicdata.cdc.gov/resource/hn4x-zwk7.json?$$app_token=${token}&$limit=2000`;
var colors = ['#FFEDA0', '#FED976', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026']; // lowest <> highest
var promises = [];

// Determine total number of states
console.log('States', statesData.features.length);
console.log(statesData);

// overwrite statesData and loop through each state using cdc data
statesData.features.forEach(function (stateData) {
  const state = stateData.properties.name;

  // fetch the data for the given state and save the promise
  const promise = d3.json(`${url}&locationdesc=${state}`).then(function (data) {

    // Determine total # of records and # of records per year
    console.log(state, data.reduce(function (result, item) {
      result.total = (result.total || 0) + 1;
      result[item.yearstart] = (result[item.yearstart] || 0) + 1;
      return result;
    }, {}));

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
    stateData.properties.density = average;
  });

  // push our promise into our promises array
  promises.push(promise);

  // console.log(data)
})

Promise.all(promises).then(function () {
  const densities = statesData.features.map(function (state) {
    return state.properties.density;
  });

  // find min & max to determine color variation
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

    statesData.features.forEach(function (stateData){
      console.log(stateData.properties.density)
    });
      

  // save geojson
  var geojson;

  // Add interaction
  function highlightFeature(e) {
      var layer = e.target;

      layer.setStyle({
          weight: 5,
          color: '#800026',
          dashArray: '',
          fillOpacity: 0.7
      });

      layer.bringToFront()
      info.update(layer.feature.properties); // update control for highlight
  }

  // Mouseout
  function resetHighlight(e) {
    geojson.resetStyle(e.target)
    info.update(); // reset control
  }

  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
    })
    // show average obesity percentage (rounded to 2 decimal places)
    layer.bindPopup(`<b>Average Obesity Level: ${(feature.properties.density).toFixed(2)}%</b>`);
    console.log(feature)
  }

  // add control - hover box with info on top right
  var info = L.control();

  info.onAdd = function (myMap) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div};

  info.update = function (props) {
    this._div.innerHTML = '<h4>US Average Obesity Levels</h4>' +  (props ?
       '<b>' + props.name + '</b><br />' + (props.density).toFixed(2) + '% of adults are obese'
       : 'Hover over a state');
  };
  info.addTo(myMap)

  // create legend 
  let legend = L.control({position: "bottomright"});
  legend.onAdd = function() {
      // make a div with class = "info legend"
      let div = L.DomUtil.create("div", "info-legend");
      let limits = [29, 29.71, 30.42, 31.13, 31.84, 32.55, 33.26, 34] // range evenly divided into 8
      let labels = []

      let legendInfo = "<h3>Adult Population with Obesity</h3>" +
      "<div class = \"labels\">" + 
      "<div class = \"min\">" + limits[0] + "</div>" +
      "<div class = \"max\">" + limits[limits.length-1].toLocaleString() + 
      "</div>"
      "</div>"; 

      div.innerHTML = legendInfo

      limits.forEach(
        function(limit, index)
        {
            // generate the li with each color and push to the labels array
            labels.push("<li style=\"background: " + colors[index]
            +"\"></li>");
        }
    );

    div.innerHTML += "<ul" + labels.join("") + "</ul>";
      
  return div; 
  
  }
  legend.addTo(myMap)

  // Add states to map
  geojson = L.geoJson(statesData, {style: style, onEachFeature: onEachFeature}).addTo(myMap);

});

