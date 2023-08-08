// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
let data ;
// Fetch the JSON data and console log it
d3.json(url).then(function(response) {
data = response
  // console.log(data);
init()

});

// Initialize the dashboard at start up 
function init() {
   const names = data.names
    // console.log(names)
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  for (let i = 0; i < names.length; i++) {
    const element = names[i];
    dropdownMenu.append("option").text(element)
  }
 
  optionChanged(names[0])

}

function info(id) {
    const metadata = data.metadata
    const result = metadata.filter(dict => dict.id == id)[0];
    console.log(result)

    let infoSection = d3.select("#sample-metadata");
    infoSection.html("")
    infoSection.append("div").text(`id: ${result.id}`)
    infoSection.append("div").text(`ethnicity: ${result.ethnicity}`)
    infoSection.append("div").text(`gender: ${result.gender}`)
    infoSection.append("div").text(`age: ${result.age}`)
    infoSection.append("div").text(`location: ${result.location}`)
    infoSection.append("div").text(`bbtype: ${result.bbtype}`)
    infoSection.append("div").text(`wfreq: ${result.wfreq}`)


       // create gauge chart

    var gauge_data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: result.wfreq,
        title: { text: "Wash Frequency" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
          bar: { color: "darkblue" },
          bgcolor: "white",
          borderwidth: 2,
          bordercolor: "gray",
          steps: [
            { range: [0, 250], color: "cyan" },
            { range: [250, 400], color: "royalblue" }
          ],
          // threshold: {
          //   line: { color: "red", width: 4 },
          //   thickness: 0.75,
          //   value: 490
          // }
        }
      }
    ];
    
    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
    Plotly.newPlot('gauge', gauge_data, layout);
}

function plot(id) {
    const samples = data.samples
    const result = samples.filter(dict => dict.id == id)[0];
    const bar_x = result.sample_values.slice(0,10).reverse()
    const bar_y= result.otu_ids.slice(0,10).map(otu_id => `OTU ${otu_id}`).reverse()
    const bar_labels = result.otu_labels.slice(0,10).reverse()
    console.log(result)
    // console.log(bar_x)
    // console.log(bar_y)

    // create bar chart
    const bar_data = [{
      type: 'bar',
      x: bar_x,
      y: bar_y,
      text: bar_labels,
      orientation: 'h'
    }];
    
    Plotly.newPlot('bar', bar_data);


     // creat bubble chart
    const bubble_x = result.otu_ids
    const bubble_y = result.sample_values
    const bubble_labels = result.otu_labels


    const bubble_data = [{
      x: bubble_x,
      y: bubble_y,
      text: bubble_labels,
      mode: 'markers',
      marker: {
        color: bubble_x,
        size: bubble_y
      }
    }];

    Plotly.newPlot('bubble', bubble_data);

 

}


function optionChanged(newid) {
  //  console.log(newid)
   info(newid) 
   plot(newid)
}

