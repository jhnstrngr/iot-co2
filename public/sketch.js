var socket;

function setup() {
createCanvas(200,200)

socket = io.connect('http://localhost:3000')
socket.on('mouse', newDrawing);
}

function newDrawing(data) {
  fill(255,0,100);
  ellipse(data.x, data.y, 60, 60);
}

function draw() {
  background(51);
  ellipse(mouseX, mouseY, 60, 60);
  console.log('Sending: ' + mouseX + ',' + mouseY);

  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse', data);
}
