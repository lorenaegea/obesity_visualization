// Define a function to build the bubble charts
function buildBubble(data) {
    
    let years = Object.values(data["Year"]);
    let question_percentage = Object.values(data["Question_Percentage"]);
    let age = Object.values(data["Age(years)"]);
    
    // check that variables contain data
    console.log(years)
    console.log(question_percentage)
    console.log(age)

    // Create the bubble chart trace data array
    let bubbleData = [{
        x: age,
        y: years,
        text: question_percentage.map(p => `${p.toFixed(2)}%`),
        mode: 'markers',
        marker: {
            size: question_percentage,
            color: question_percentage,
            opacity: 0.8
        },
        type: 'scatter'
      }];

    // Create the bubble chart layout object
    let bubbleLayout = {
        title: {
            text: "<b>Percent of adults who achieve physical activity goal based on age<b>",
            font: {
                size: 20
            }
        },
        xaxis: {
            title: '<b>Age (years)<b>',
        },
        margin: { t: 60, l: 100 },
        hovermode: 'closest', // set the hover mode to 'closest'
        hoverlabel: { // customize the hover label
            bgcolor: '#fff',
            bordercolor: '#000',
            font: {size: 14},
            align: 'left'
        },
    };
        
    // Use Plotly to create the bubble chart
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
};

// Load the JSON data and call the buildBubble function
d3.json("health_factors.json").then(function(data) {

    // Check that data was loaded properly
    console.log(data); 

    // Call the buildBubble function
    buildBubble(data);
});