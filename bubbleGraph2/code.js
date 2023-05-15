function buildBubble(sample) {

    // retrieve the JSON data from "samples.json" using the D3 library
    d3.json("nutrition.json").then((data) => {

        // Extract the nutrition
        let nutrition = Object.values(data);

        // Filter the samples array => return the sample object with ID matching selected sample ID
        let result = nutrition.filter(sampleObj => sampleObj['Dropdown'] == sample);
        //let result = resultArray[0];

        let protein = result['Protein_g'];
        let carbs = result["Carb_g"];
        let fat = result["Fat_g"];
        let calories = result["Energy_kcal"];
        let foodName = result["Descrip"];
        let foodGroup = result["FoodGroup"];

        console.log(protein);
        console.log(carbs);
        console.log(fat);
        console.log(calories);
        console.log(foodName);
        console.log(foodGroup);

        let markerColor = [];
        for (let i = 0; i < foodGroup.length; i++) {
            if (foodGroup[i] == "Dairy and Egg Products") {
                markerColor.push("green");
            } else if (foodGroup[i] == "Spices and Herbs") {
                markerColor.push("orange");
            } else if (foodGroup[i] == "Fats and Oils") {
                markerColor.push("red");
            } else if (foodGroup[i] == "Poultry Products") {
                markerColor.push("blue");
            } else if (foodGroup[i] == "Breakfast Cereals") {
                markerColor.push("yellow");
            } else if (foodGroup[i] == "Fruits and Fruit Juices") {
                markerColor.push("cyan");
            } else if (foodGroup[i] == "Pork Products") {
                markerColor.push("pink");
            } else if (foodGroup[i] == "Vegetables and Vegetable Products") {
                markerColor.push("magenta");
            } else if (foodGroup[i] == "Nut and Seed Products") {
                markerColor.push("indigo");
            } else if (foodGroup[i] == "Beef Products") {
                markerColor.push("aqua");
            } else if (foodGroup[i] == "Beverages") {
                markerColor.push("teal");
            } else if (foodGroup[i] == "Finfish and Shellfish Products") {
                markerColor.push("grey");
            } else if (foodGroup[i] == "Legumes and Legume Products") {
                markerColor.push("fuchsia");
            } else if (foodGroup[i] == "Lamb, Veal, and Game Products") {
                markerColor.push("olive");
            } else if (foodGroup[i] == "Baked Products") {
                markerColor.push("lime");
            } else if (foodGroup[i] == "Sweets") {
                markerColor.push("navy");
            } else {
                markerColor.push("maroon");
        }};

        let bubbleData = [{        
            x: protein,        
            y: carbs,     
            z: fat,   
            text: foodName.map((name, index) => {return `Food: ${name}<br>Protein: ${protein[index]}g<br>Carbs: ${carbs[index]}g<br>Fat: ${fat[index]}g<br>Calories: ${calories[index]}cal`;}),
            mode: 'markers',
            marker: {
                size: calories / 1000000,
                color: markerColor,
                opacity: 0.8
            },
            type: 'scatter3d'
        }];

        let bubbleLayout = {
            title: {
                text: "<b>Nutritional Facts by Food Group<b>",
                font: {
                    size: 20
                }
            },
            xaxis: {
                title: '<b>Protein (g)<b>',
            },
            yaxis: {
                title: '<b>Carbs (g)<b>',
            },
            zaxis: {
                title: '<b>Fat (g)<b>',
            },
            margin: { t: 60, l: 100 }
        };
            
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);
})
};

/*
// Define a function to initialize the dashboard
function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");
  
    // Use the list of sample names to populate the select options
    d3.json("samples.json").then((data) => {
    
        // Define dropdown options
        let sampleNames = ['High Protein', 'Low Carb', 'Low Fat'];
        
        // Use a for loop to set the value attribute of each option to the corresponding sample name
        for (let i = 0; i < sampleNames.length; i++){
            selector.append("option").text(sampleNames[i]).property("value", sampleNames[i]);
        };


  
        /*
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
*/

function init() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    d3.json("nutrition.json").then((data) => {

        // Define dropdown options
        //let sampleNames = ['High Protein', 'Low Carb', 'Low Fat'];

        let sampleNames = Object.values(data["Dropdown"]);

        // Use a for loop to set the value attribute of each option to the corresponding sample name
        for (let i = 0; i < sampleNames.length; i++){
            selector.append("option").text(sampleNames[i]).property("value", sampleNames[i]);
        };

        // Use the first sample to build the initial plots
        let firstSample = sampleNames[0];
        buildBubble(firstSample);
        //buildMetadata(firstSample);

        // Call the optionChanged() function when a new sample is selected from the dropdown
        //selector.on("change", optionChanged);
    });
}

init()

let selector = d3.select("#selDataset");

// Define a function to update the bubble plot based on selected ID
function updateBubble() {
    
    // Access value property from the selected ID
    let id_value = selector.property("value");

    // retrieve the JSON data from "samples.json" using the D3 library
    d3.json("nutrition.json").then((data) => {

        // Extract the nutrition
        let nutrition = data;

        // Filter the samples array => return the sample object with ID matching selected sample ID
        let result = nutrition.filter(sampleObj => sampleObj['Dropdown'] == id_value);
        //let result = resultArray[0];

        let protein = Object.values(result["Protein_g"]);
        let carbs = Object.values(result["Carb_g"]);
        let fat = Object.values(result["Fat_g"]);
        let calories = Object.values(result["Energy_kcal"]);
        let foodName = Object.values(result["Descrip"]);
        let foodGroup = Object.values(result["FoodGroup"]);
    
        // Update the chart trace data
        Plotly.restyle("bubble", "x", [protein]);
        Plotly.restyle("bubble", "y", [carbs]);
        Plotly.restyle("bubble", "z", [fat]);
        Plotly.restyle("bubble", "text", [foodName.map((name, index) => {return `Food: ${name}<br>Protein: ${protein[index]}g<br>Carbs: ${carbs[index]}g<br>Fat: ${fat[index]}g<br>Calories: ${calories[index]}cal`;}),]);
        Plotly.restyle("bubble", "marker.size", [calories / 1000000]);
        Plotly.restyle("bubble", "marker.color", [markerColor]);
        Plotly.restyle("bubble", "marker.opacity", 0.8);
/*
        // Update the chart layout with the selected ID
        let newTitle = "<b>Amount of Each Bacteria Culture Found in Individual " + `${individual_id}<b>`;
        Plotly.relayout("bubble", {title: newTitle});
        */
        
    });
};

/*

// Access value property from the selected ID
let id_value = selector.property("value");

// retrieve the JSON data from "samples.json" using the D3 library
d3.json("nutrition.json").then((data) => {

    

    let protein = Object.values(data["Protein_g"]);
    let carbs = Object.values(data["Carb_g"]);
    let fat = Object.values(data["Fat_g"]);
    let calories = Object.values(data["Energy_kcal"]);
    let foodName = Object.values(data["Descrip"]);
    let foodGroup = Object.values(data["FoodGroup"]);

    // Filter the samples array => return the sample object with ID matching selected sample ID
    let resultArray = samples.filter(sampleObj => sampleObj.id == id_value);
    let result = resultArray[0];

    // Extract the OTU IDs, labels, sample values, and individual ID from the sample object
    let otu_ids = result.otu_ids;
    let sample_values = result.sample_values;
    let otu_labels = result.otu_labels;
    let individual_id = result.id;

    // Update the chart trace data
    Plotly.restyle("bubble", "x", [otu_ids]);
    Plotly.restyle("bubble", "y", [sample_values]);
    Plotly.restyle("bubble", "text", [otu_labels]);
    Plotly.restyle("bubble", "marker.size", [sample_values]);
    Plotly.restyle("bubble", "marker.color", [otu_ids]);
    Plotly.restyle("bubble", "marker.opacity", 0.8);
    
    // Update the chart layout with the selected ID
    let newTitle = "<b>Amount of Each Bacteria Culture Found in Individual " + `${individual_id}<b>`;
    Plotly.relayout("bubble", {title: newTitle});
    
});

/*

function updateBubble() {
    // Grab a reference to the dropdown select element
    let selector = d3.select("#selDataset");

    // Retrieve the selected option from the dropdown
    let selectedOption = selector.property("value");

    // Use the selected option to update the charts and metadata
    buildBubble(selectedOption);
    //buildMetadata(selectedOption);
}

*/

/*
d3.json("nutrition.json").then(function(data) {
    console.log(data); 
    buildBubble(data); 
});
*/