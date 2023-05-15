// Define a function to build the bar charts
function buildBar(data) {
    
    // Extract the "dropdown" array from the data
    let dropdown = Object.values(data["Dropdown"]);

    // Extract the protein, carbs, fat and calories content values, food group and description
    let protein = dropdown.map(sampleObj => sampleObj["Protein_g"]);
    let carbohydrate = dropdown.map(sampleObj => sampleObj["Carb_g"]);
    let fat = dropdown.map(sampleObj => sampleObj["Fat_g"]);
    let calories = dropdown.map(sampleObj => sampleObj["Energy_kcal"]);
    let food = dropdown.map(sampleObj => sampleObj["Descrip"]);

    // Create the bubble chart trace data array
    let barData = [{
        x: protein,
        y: carbohydrate,
        z: fat,
        text: food,
        mode: 'markers',
        marker: {
            size: calories,
            opacity: 0.8
        },
        type: 'scatter'
    }];

    // Create the bubble chart layout object
    let barLayout = {
        title: {
            text: "<b>Nutrition Facts<b>",
            font: {
                size: 20
            }
        },
        xaxis: {
            title: '<b>Protein Content (g)<b>',
        },
        yaxis: {
            title: '<b>Carbohydrate Content (g)<b>',
        },
        zaxis: {
            title: '<b>Fat Content (g)<b>',
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
    }};

    // Use Plotly to create the bubble chart
    Plotly.newPlot("bar", barData, barLayout);
}

// Load the JSON data and call the buildBubble function
d3.json("nutrition.json").then(function(data) {

    // Check that data was loaded properly
    console.log(data); 

    // Call the buildBubble function
    buildBar(data);
});

// Define a function to initialize the dashboard
function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
  
    // Populate the select options
    d3.json("nutrition.json").then((data) => {
    
        // Define the dropdown options
        let dropdownOptions = ['High Protein', 'Low Carb', 'Low Fat'];
        
        // Use a for loop to set the value attribute of each option to the corresponding sample name
        for (let i = 0; i < dropdownOptions.length; i++){
            selector.append("option").text(dropdownOptions[i]).property("value", dropdownOptions[i]);
        };
  
        // Use the first sample from the list to build the initial bar plots
        let firstSample = sampleNames[0];
        buildBar(firstSample);

        // Use the first sample from the list to populate the initial Demographic Info panel
        buildDemoInfo(firstSample);

        // Use the first sample from the list to build the initial bubble plots
        buildBubble(firstSample);

        // Use the first sample from the list to build the initial gauge plots
        buildGauge(firstSample);
    });
};

// Initialize the dashboard
init();


/*
// Define a function to build the bar charts
function buildBar(data) {
    
    // retrieve the JSON data from "nutrition.json" using the D3 library
    d3.json("nutrition.json").then((data) => {
    
        // Extract the "dropdown" array from the data
        let dropdown = Object.values(data["Dropdown"]);

        // Filter based on dropdown option selected
        let result = dropdown.filter(sampleObj => sampleObj == dropdown);

        // Extract the protein, carbs, fat and calories content values, food group and description
        let protein = Object.values(result["Protein_g"]);
        let carbohydrate = Object.values(result["Carb_g"]);
        let fat = Object.values(result["Fat_g"]);
        let calories = Object.values(result["Energy_kcal"]);
        let food = Object.values(result["Descrip"]);
/*
        // check that variables contain data
        console.log(protein)
        console.log(carbohydrate)
        console.log(fat)
        console.log(calories)
        console.log(food)

        // Create the bubble chart trace data array
        let barData = [{
            x: protein,
            y: carbohydrate,
            z: fat,
            text: food,
            mode: 'markers',
                marker: {
                    size: calories,
                    //color: foodGroup,
                    opacity: 0.8
                },
            type: 'scatter'
        }]

        // Create the bubble chart layout object
        let barLayout = {
            title: {
                text: "<b>Nutrition Facts<b>",
                font: {
                    size: 20
                }
            },
            xaxis: {
                title: '<b>Protein Content (g)<b>',
            },
            yaxis: {
                title: '<b>Carbohydrate Content (g)<b>',
            },
            zaxis: {
                title: '<b>Fat Content (g)<b>',
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
        }};

        // Use Plotly to create the bubble chart
        Plotly.newPlot("bubble", barData, barLayout);

    })};


    /*

        







    let years = Object.values(data["Year"]);
    let question_percentage = Object.values(data["Question_Percentage"]);
    let age = Object.values(data["Age(years)"]);
    
    

    

    
        
    
};

// Load the JSON data and call the buildBubble function
d3.json("health_factors.json").then(function(data) {

    // Check that data was loaded properly
    console.log(data); 

    // Call the buildBubble function
    buildBubble(data); 
});
*/