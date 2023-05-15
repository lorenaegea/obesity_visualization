function buildBubble(data) {

    let protein = Object.values(data["Protein_g"]);
    let carbs = Object.values(data["Carb_g"]);
    let fat = Object.values(data["Fat_g"]);
    let calories = Object.values(data["Energy_kcal"]);
    let foodName = Object.values(data["Descrip"]);
    let foodGroup = Object.values(data["FoodGroup"]);

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
};

d3.json("nutrition.json").then(function(data) {
    console.log(data); 
    buildBubble(data); 
});