let canvas;
let greenLevel;
let redLevel;
let socket;
let incomingData = 0;
let interpIncomingData = 0;
let col = 0;

function setup() {
  //sets the canvas to the height and with of the window
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  //place the positioning of the sketch as the lowest layer in case I want to have any layers on top to add
  canvas.style('z-index', '-1');

  socket = io();
  socket.on('ServerToClient', socketEvents);
  //socket = io.connect('https://iot-network.herokuapp.com:3000');
  socket = io.connect('http://localhost:3000');
  socket.on('ServerToClient', socketEvents);
}

function draw() {
  background(0);
  var co2 = 1;

  console.log('inc data: ' + incomingData);

  if (co2 > 2.5) {
    background(255, 0, 0);
  } else if (co2 > 1) {
    //greenLevel = 255 - ceil(co2 * 100);
    greenLevel = 255 - ceil(map(co2, 1, 2.5, 0, 255));
    background(255, greenLevel, 0);
  } else {
    //redLevel =  100 + ceil(co2 * 100);
    redLevel = ceil(map(co2, 0, 1, 0, 255));
    background(redLevel, 255, 0);
  }
  //creates and circle in the centre of the canvas that dynamically changes size based on co2
  ellipse(width/2, height/2, co2*100);
}

function socketEvents(data){
  incomingData = data;
  //incomingData = map(incomingData, 0, 100, 0, 255);
  console.log('data' + data);
}
