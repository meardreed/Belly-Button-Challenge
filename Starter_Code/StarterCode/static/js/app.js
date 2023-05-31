// Place url in a constant variable
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
let data ;
// Fetch the JSON data and console log it
d3.json(url).then(function(response) {
data = response
  console.log(data);
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
    // console.log(result)

    let infoSection = d3.select("#sample-metadata");
    infoSection.html("")
    infoSection.append("div").text(`id: ${result.id}`)
    infoSection.append("div").text(`ethnicity: ${result.ethnicity}`)
    infoSection.append("div").text(`gender: ${result.gender}`)
    infoSection.append("div").text(`age: ${result.age}`)
    infoSection.append("div").text(`location: ${result.location}`)
    infoSection.append("div").text(`bbtype: ${result.bbtype}`)
    infoSection.append("div").text(`wfreq: ${result.wfreq}`)

}

function plot(id) {
    const samples = data.samples
    const result = samples.filter(dict => dict.id == id)[0];
    console.log(result)
}


function optionChanged(newid) {
   console.log(newid)
   info(newid) 
   plot(newid)
}
