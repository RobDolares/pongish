let canvas;
let canvasContext;


window.onload=()=>{
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  drawEverything();

}

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
