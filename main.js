const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

/* 캔버스 x 좌표 가운데 */
let canvasWidth = canvas.width / 2;

/* 패들 좌표 및 사이즈 */
const paddleX = canvasWidth;
const paddleY = 420;

const paddleWidth = 85;
const paddleHeight = 15;

/* 좌표 */
let x = 0;
let y = 0;

/* 볼 좌표 */
let ballX = canvasWidth; // 300
let ballY = 410;

/* 벽돌 시작 좌표 */
let blockStartX = 50;
let blockStartY = 40;

/* 벽돌 사이즈 */
let bricksWidth = 50;
let bricksHeight = 20;

/* 벽돌 만들기 */
const mapBricks = Array.from({ length: 4 }, () => Array(10).fill(1));

/* 볼 그리기 */
function ballDraw() {
   ctx.beginPath();
   ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
   ctx.fillStyle = "#404237";
   ctx.fill();
   ctx.closePath();
}

/* 패들 그리기 */
function paddleDraw() {
  /* 패들 사이즈 및 컬러 */
  ctx.fillStyle = "#E6E6E6";
  ctx.fillRect(paddleX - (paddleWidth / 2), paddleY, paddleWidth, paddleHeight);
}


// function checkCollison() {
// }

let dx = 2;
let dy = -2;


/* 그리기 */
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스판 초기화

  // 패들 그리기 함수
  paddleDraw();
  // 볼 그리기
  ballDraw();

  // 현재 오류
  // 너비보다 작으면 +를 하고
  // 너비랑 같아지면 -를 한다
  // 마이너스가 되면 계속 플러스가 되고 무한 반복

  // 520이 되면 멈춤
  // 518이되면 다시 +2 무한 루프

  // 볼 좌표가 캔바스 너비보다 작으면
  // 충돌감지부터 시작!!!!!!!!!!!!!!!!!!!!!!!!


  /* 벽돌 그리기 */
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

  // 재귀함수
  requestAnimationFrame(draw);
}

draw();
