const GRAPH_ID = "plotly-graph";
const graph1Checkbox = document.getElementById('graph1-checkbox');
const graph2Checkbox = document.getElementById('graph2-checkbox');

let graphData = [];
const xList = [];
const y1List = [];
const y2List = [];

const gaugeProperties = {
  renderTo: '',
  width: 200,
  height: 200,
  minValue: -1.1,
  maxValue: 1.1,
  value: 0, // Initial value
  majorTicks: ['-1', '-0.5', '0', '0.5', '1'],
  minorTicks: 2,
  strokeTicks: true,
  highlights: [
    {from: -1.1, to: -0.4, color: 'rgba(0, 255, 0, 0.3)'},
    {from: -0.4, to: 0.4, color: 'rgba(255, 255, 0, 0.3)'},
    {from: 0.4, to: 1.1, color: 'rgba(255, 0, 0, 0.3)'}
  ],
  animation: true,
  animationDuration: 500,
  pointer: true,
  title: 'Current Value',
  colorPlate: '#fff',
  colorMajorTicks: '#f5f5f5',
  colorMinorTicks: '#ddd',
  colorPointer: '#ff0000',
  colorNeedle: '#ff0000',
  valueBox: true,
  valueBoxWidth: 50,
  valueBoxHeight: 30,
  valueBoxFontSize: 18,
  valueBoxBorderRadius: 5
};

const y1Gauge = new RadialGauge({...gaugeProperties, renderTo: 'y1-gauge', title: 'Y1'});
const y2Gauge = new RadialGauge({...gaugeProperties, renderTo: 'y2-gauge', title: 'Y2'});

// Create Event for receiving data-stream
const eventSource = new EventSource("https://old.iolab.sk/evaluation/sse/sse.php");
eventSource.onmessage = function (event) {
  const data = JSON.parse(event.data);
  const x = data.x;
  const y1 = data.y1;
  const y2 = data.y2;

  xList.push(x);
  y1List.push(y1);
  y2List.push(y2);

  y1Gauge.value = y1;
  y2Gauge.value = y2;

  drawGraph();
};

eventSource.onopen = function () {
  console.log("Connection to server established.");
};

eventSource.onerror = function (error) {
  console.error("Error with EventSource:", error);
  eventSource.close();
};

function drawGraph() {
  const layout = {
    title: 'Y1, Y2',
    xaxis: {title: 'X Axis'},
    yaxis: {title: 'Y Axis'},
    showlegend: true
  };

  graphData = [
    {
      x: xList,
      y: y1List,
      mode: 'lines',
      name: 'Y1',
      line: {color: 'blue'},
      visible: graph1Checkbox.checked
    },
    {
      x: xList,
      y: y2List,
      mode: 'lines',
      name: 'Y2',
      line: {color: 'red'},
      visible: graph2Checkbox.checked
    }
  ];

  Plotly.newPlot(GRAPH_ID, graphData, layout);
}

//Generate data
function endDataStream() {
  eventSource.close();
}


graph1Checkbox.addEventListener('change', function () {
  drawGraph();
});
graph2Checkbox.addEventListener('change', function () {
  drawGraph();
});
