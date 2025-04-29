const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

/* 캔버스 x 좌표 가운데 */
const canvasWidth = canvas.width / 2;

/* 패들 좌표 및 사이즈 */
const paddleX = canvasWidth;
const paddleY = 420;

const paddleWidth = 85;
const paddleHeight = 15;

/* 패들 사이즈 및 컬러 */
ctx.fillStyle = "#E6E6E6";
ctx.fillRect(paddleX - (paddleWidth / 2), paddleY, paddleWidth, paddleHeight);

/* 볼 사이즈 */
ctx.beginPath();
ctx.arc(canvasWidth, paddleY - 10, 10, 0, Math.PI * 2);
ctx.fillStyle = "#404237";
ctx.fill();
ctx.closePath();

/* 벽돌 사이즈 */
const bricksWidth = 50;
const bricksHeight = 20;

/* 벽돌 만들기 */
const mapBricks = Array.from({ length: 4 }, () => Array(10).fill(1));

let blockStartX = 50;
let blockStartY = 40;

for(let i = 0; i < 4; i++) {
  for(let j = 0; j < 10; j++) {
    if(mapBricks[i][j] == 1) {
        if(i == 0) {
          ctx.fillStyle = "#E6E6E6";
          ctx.fillRect(blockStartX * (j + 1), blockStartY * (i + 1), bricksWidth, bricksHeight); 
          ctx.strokeStyle = "#333";
          ctx.strokeRect(blockStartX * (j + 1), blockStartY * (i + 1), bricksWidth, bricksHeight);
        }else {
          ctx.fillStyle = "#E6E6E6";
          ctx.fillRect(blockStartX * (j + 1), blockStartY * (i + 1) - (20 * i), bricksWidth, bricksHeight); 
          ctx.strokeStyle = "#333";
          ctx.strokeRect(blockStartX * (j + 1), blockStartY * (i + 1) - (20 * i), bricksWidth, bricksHeight);
        }
      }
    }
  }

  

