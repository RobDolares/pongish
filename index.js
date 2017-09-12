let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballVeloX = 10;       //ball x velocity
let ballVeloY = 4;        //ball y velocity


window.onload=()=>{
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  let fps = 30;
  setInterval(()=>{
    moveEverything();
    drawEverything();
  },1000/fps);
}

function calcMousePos(e){
  let rect = canvas.getBoundingClientRect();
  let root = document.documentElement;
  let mouseX = e.clientX - rect.left - root.scrollLeft;
  let mouseY = e.clientY - rect.top - root.scrollTop;
  return {
    x : mouseX,
    y : mouseY
  }
}

// ***** draw objects ***** //

function drawEverything(){
  // black bgc
  colorRect(0,0,canvas.width,canvas.height, 'black');

  //left player paddle
  colorRect(0,210,10,100, 'white');

  //draw the ball
  colorCircle(ballX, ballY, 5,'white');

}

function colorCircle (centerX, centerY, radius, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true );
  canvasContext.fill();
}

function colorRect(leftX, topY, width, height, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

//*****  movement and collisions ***** //

function moveEverything(){

  ballX += ballVeloX;
  ballY += ballVeloY;


  //ball bouncing off left/right
  if (ballX < 0) {
    ballVeloX = -ballVeloX;
  }
  if (ballX > canvas.width) {
    ballVeloX = -ballVeloX;
  }
  //ball bouncing off top/bottom
  if (ballY < 0) {
    ballVeloY = -ballVeloY;
  }
  if (ballY > canvas.height) {
    ballVeloY = -ballVeloY
  }

}
