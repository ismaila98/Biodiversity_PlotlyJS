function init() {
    var selection = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      var sampNames = data.names;
  
      sampNames.forEach((sample) => {
        selection
          .append("option")
          .text(sample)
          .property("value", sample);
      });

    var sample1 = sampNames[0];
    buildCharts(sample1);
    buildMetadata(sample1);
  });
}

init();

function update(currentSamp) {
    buildMetadata(currentSamp);
    buildCharts(currentSamp);
}

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultsArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultsArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      });
  
    });
}

function buildCharts(sample) {
    d3.json("samples.json").then((data) => {
      var samples = data.samples;
      console.log(samples);
  
      var samplesArray = samples.filter(sampleObj => sampleObj.id == sample);
      console.log(samplesArray);
  
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result2 = resultArray[0];
      var result1 = samplesArray[0];
      console.log(result1);
  
      var otuID = result1.otu_ids;
      console.log(otuID);
      var otuLabel = result1.otu_labels;
      console.log(otuLabel);
      var sampleValues = result1.sample_values;
      console.log(sampleValues);

      var barChart = {
      x: sampleValues.slice(0, 10).reverse(),
      y: otuID.slice(0, 10).map(id => `OTU ${id}`).reverse(),
      text: otuLabel,
      type: "bar",
      orientation: "h"
      };
      console.log(barChart);

      var barLayout = {
      title: "Top 10 Bacteria Culture"
      };
      Plotly.newPlot("bar", [barChart], barLayout);

    // 1. Create the trace for the bubble chart.
      var bubbleChart = {
        x: otuID,
        y: sampleValues,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuID,
          colorscale: 'YlGnBu',
          text: otuLabel
        }
       };

       var bubbleLayout = {
        title: "Bacteria Culture for each Sample",
        xaxis: { title: "OTU ID" },
        yaxis: { title: "Sample Values" }
       };

       Plotly.newPlot("bubble", [bubbleChart], bubbleLayout);

       var frequency = parseFloat(result2.wfreq)
       console.log(frequency);

    });
}