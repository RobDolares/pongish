let canvas;
let canvasContext;
let ballX = 50;
let ballY = 50;
let ballVeloX = 10;       //ball x velocity
let ballVeloY = 6;        //ball y velocity
let pad1Y = 200;
let pad2Y = 200;
const padHeight = 100;    //paddle dimensions
const padWidth = 10;
let player1score = 0;
let player2score = 0;
let aiMoveSpeed = 7;



window.onload=()=>{
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  let fps = 30;
  setInterval(()=>{
    moveEverything();
    drawEverything();
    playerScores();
  },1000/fps);
  canvas.addEventListener('mousemove',(e)=>{
    let mousePos = calcMousePos(e);
    pad1Y = mousePos.y - (padHeight/2);
  })
}

// ***** update player scores *****//

function playerScores(){
  document.getElementById('player1Score').innerHTML = `${player1score}`;
  document.getElementById('player2Score').innerHTML = `${player2score}`;
}

// ***** reset gameball ***** //

function reset(){
  if (player1score === 5) {
    ballVeloX = -(ballVeloX + 2) ;
    aiMoveSpeed += 2;
  } else if (player1score === 10){
    ballVeloX = -(ballVeloX + 2)
    aiMoveSpeed ++;
  } else if (player1score === 15){
    ballVeloX = -(ballVeloX + 2)
    aiMoveSpeed ++;
  } else if (player1score === 20){
    ballVeloX = -(ballVeloX + 2)
  }

  if (ballVeloY > 0) {
    ballVeloY = -(Math.floor(Math.random()*8));
  } else {
    ballVeloY = (Math.floor(Math.random()*8));
  }

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
  colorRect(0,0,canvas.width,canvas.height, 'orange');

  //left player paddle
  colorRect(0,pad1Y,padWidth,padHeight, 'white');

  //artificial int paddle
  colorRect(canvas.width - padWidth, pad2Y, padWidth, padHeight, 'white');

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

// ***** AI ***** //

function aiMovement(aiMoveSpeed){
  let pad2YCenter = pad2Y + (padHeight/2);
  if (pad2YCenter < ballY-35) {
    pad2Y += aiMoveSpeed;
  } else if ( pad2YCenter > ballY+35){
    pad2Y -= aiMoveSpeed;
  }
}

function moveEverything(){
  aiMovement(aiMoveSpeed);

  ballX += ballVeloX;
  ballY += ballVeloY;

  //ball bouncing off left/right
  if (ballX < 15) {
    if (ballY > pad1Y && ballY < pad1Y + padHeight) {
      ballVeloX = -ballVeloX;
      let deltaY = ballY - (pad1Y+padHeight/2)
      ballVeloY = deltaY * 0.4;
    } else if (ballX < 0) {
      player2score++;
      reset();
    }
  }

  if (ballX > (canvas.width - 15)) {
    if (ballY > pad2Y && ballY < pad2Y + padHeight) {
      ballVeloX = -ballVeloX;
      let deltaY = ballY - (pad2Y+padHeight/2)
      ballVeloY = deltaY * 0.5;
    } else if (ballX > canvas.width){
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
