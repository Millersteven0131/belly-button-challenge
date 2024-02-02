let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(({names}) => {
    names.forEach(id => {
        d3.select('select').append('option').text(id);
    });

    make_charts(names[0]);
});

function make_charts(id){
    d3.json(url).then(({metadata,samples})=>{
        
        let meta = metadata.find(obj=>obj.id==id);
        let {otu_ids,sample_values, otu_labels} = samples.find(sampleObj=> sampleObj.id == id);

        // Demographics
        d3.select('.panel-body').html('');
        Object.entries(meta).forEach(([key,val]) => {
            d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${val}`)
        });

        // Bar Chart
        let data2  = {
            y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
            x: sample_values.slice(0,10).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: 'bar',
            orientation: 'h'
          };
          
          let values = [data2];
          
          Plotly.newPlot("bar", values);

        //   Bubble Chart
        var trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              size: sample_values,
              color: otu_ids,
              colorscale: "Earth"
            }
          };
          
          var data = [trace1];
        
          
          Plotly.newPlot('bubble', data);
          
    })
}