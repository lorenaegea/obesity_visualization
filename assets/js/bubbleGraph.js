// Define a function to build the bubble charts
function buildBubble(data) {
  let years = Object.values(data["Year"]);
  let question_percentage = Object.values(data["Question_Percentage"]);
  let age = Object.values(data["Age(years)"]);

  // check that variables contain data
  console.log(years);
  console.log(question_percentage);
  console.log(age);

  // Create the bubble chart trace data array
  let bubbleData = [
    {
      x: age,
      y: years,
      text: question_percentage.map((p) => `${p.toFixed(2)}%`),
      mode: "markers",
      marker: {
        size: question_percentage,
        color: question_percentage,
        opacity: 0.8,
      },
      type: "scatter",
    },
  ];

  // Create the bubble chart layout object
  let bubbleLayout = {
    title: {
      text: "<b>Percent of Adults Who Achieve Physical Activity Goal Based on Age<b>",
      font: {
        size: 20,
      },
    },
    xaxis: {
      title: "<b>Age (years)<b>",
    },
    margin: { t: 60, l: 100 },
    // Set the hover mode to 'closest'
    hovermode: "closest",
    // Customize the hover label
    hoverlabel: {
      bgcolor: "#fff",
      bordercolor: "#000",
      font: { size: 14 },
      align: "left",
    },
  };

  // Use Plotly to create the bubble chart
  Plotly.newPlot("bubble", bubbleData, bubbleLayout);

  // Adjust inner html for summary statistics
  var s2019 = document.getElementById("2019");
  var s2017 = document.getElementById("2017");
  var s2015 = document.getElementById("2015");
  var s2013 = document.getElementById("2013");
  var s2011 = document.getElementById("2011");

  var v2011 = math
    .chain(8)
    .add(question_percentage[0])
    .add(question_percentage[1])
    .add(question_percentage[2])
    .add(question_percentage[3])
    .add(question_percentage[4])
    .add(question_percentage[5])
    .divide(6)
    .done();
  s2011.innerHTML = "2011: " + math.round(v2011, 2) + "%";

  var v2013 = math
    .chain(8)
    .add(question_percentage[6])
    .add(question_percentage[7])
    .add(question_percentage[8])
    .add(question_percentage[9])
    .add(question_percentage[10])
    .add(question_percentage[11])
    .divide(6)
    .done();
  s2013.innerHTML = "2013: " + math.round(v2013, 2) + "%";

  var v2015 = math
    .chain(8)
    .add(question_percentage[12])
    .add(question_percentage[13])
    .add(question_percentage[14])
    .add(question_percentage[15])
    .add(question_percentage[16])
    .add(question_percentage[17])
    .divide(6)
    .done();
  s2015.innerHTML = "2015: " + math.round(v2015, 2) + "%";

  var v2017 = math
    .chain(8)
    .add(question_percentage[18])
    .add(question_percentage[19])
    .add(question_percentage[20])
    .add(question_percentage[21])
    .add(question_percentage[22])
    .add(question_percentage[23])
    .divide(6)
    .done();
  s2017.innerHTML = "2017: " + math.round(v2017, 2) + "%";

  var v2019 = math
    .chain(8)
    .add(question_percentage[24])
    .add(question_percentage[25])
    .add(question_percentage[26])
    .add(question_percentage[27])
    .add(question_percentage[28])
    .add(question_percentage[29])
    .divide(6)
    .done();
  s2019.innerHTML = "2019: " + math.round(v2019, 2) + "%";
}

// Load the JSON data and call the buildBubble function
d3.json("./assets/data/health_factors.json").then(function (data) {
  // Check that data was loaded properly
  console.log(data);

  // Call the buildBubble function
  buildBubble(data);
});
