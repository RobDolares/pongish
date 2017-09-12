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


}


function colorRect(leftX, topY, width, height, drawColor){
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}
