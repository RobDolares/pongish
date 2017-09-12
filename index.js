let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballVeloX = 10;       //ball x velocity
let ballVeloY = 6;        //ball y velocity
let pad1Y = 250;
let pad2Y = 250;
const padHeight = 100;    //paddle dimensions
const padWidth = 10;
let player1score = 0;
let player2score = 0;



window.onload=()=>{
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  let fps = 30;
  setInterval(()=>{
    moveEverything();
    drawEverything();
  },1000/fps);
  canvas.addEventListener('mousemove',(e)=>{
    let mousePos = calcMousePos(e);
    pad1Y = mousePos.y - (padHeight/2);
  })
}

// ***** reset gameball ***** //

function reset(){

  ballVeloX = -ballVeloX;
  ballX = canvas.width/2;
  ballY = canvas.height/2;

}

// ***** mouse movement ***** //

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
  colorRect(0,pad1Y,padWidth,padHeight, 'white');

  //artificial int paddle
  colorRect(canvas.width - padWidth, pad2Y, padWidth, padHeight, 'white');

  //draw the ball
  colorCircle(ballX, ballY, 5,'white');

  canvasContext.fillText(player1score, 100, 100);
  canvasContext.fillText(player2score, canvas.width-100, canvas.height-380);

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

// ***** AI ***** //

function aiMovement(){
  let pad2YCenter = pad2Y + (padHeight/2);
  if (pad2YCenter < ballY-35) {
    pad2Y += 6;
  } else if ( pad2YCenter > ballY+35){
    pad2Y -= 6;
  }
}

function moveEverything(){
  aiMovement();

  ballX += ballVeloX;
  ballY += ballVeloY;

  //ball bouncing off left/right
  if (ballX < 0) {
    if (ballY > pad1Y && ballY < pad1Y + padHeight) {
      ballVeloX = -ballVeloX;
      let deltaY = ballY - (pad1Y+padHeight/2)
      ballVeloY = deltaY * 0.35;
    } else {
      player2score++;
      reset();
    }
  }

  if (ballX > canvas.width) {
    if (ballY > pad2Y && ballY < pad2Y + padHeight) {
      ballVeloX = -ballVeloX;
      let deltaY = ballY - (pad2Y+padHeight/2)
      ballVeloY = deltaY * 0.35;
    } else {
      player1score++;
      reset();
    }
  }

  //ball bouncing off top/bottom
  if (ballY < 0) {

    ballVeloY = -ballVeloY;
  }
  if (ballY > canvas.height) {
    ballVeloY = -ballVeloY
  }

}
