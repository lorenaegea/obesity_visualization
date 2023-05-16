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
            text: "<b>Percent of Adults Who Achieve Physical Activity Goal Based on Age<b>",
            font: {
                size: 20
            }
        },
        xaxis: {
            title: '<b>Age (years)<b>',
        },
        margin: { t: 60, l: 100 },
        // Set the hover mode to 'closest'
        hovermode: 'closest', 
        // Customize the hover label
        hoverlabel: { 
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