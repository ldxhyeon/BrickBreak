const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

/* 캔버스 x 좌표 가운데 */
let canvasWidth = canvas.width / 2;

/* 패들 좌표 */
let paddleX = canvasWidth;
let paddleY = 420;

/* 패들 사이즈 */
const paddleWidth = 90;
const paddleHeight = 15;

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

let bx = 0; // 충돌 x 좌표
let by = 0;  // 충돌 y 좌표

function ballCollsion() {
  // 현재 오류
  // 너비보다 작으면 +를 하고
  // 너비랑 같아지면 -를 한다
  // 마이너스가 되면 계속 플러스가 되고 무한 반복

  // 520이 되면 멈춤
  // 518이되면 다시 +2 무한 루프

  // 볼 좌표 + 2이 캔버스 우측벽 - 지름 보다 크면 -로 변경
  // 볼 좌표 + 2이 캔버스 좌측벽 지름 보다 작으면 -로 변경

  // 볼좌표가 캔바스 우측 590보다 크면 안도ㅟ고
  // 10보다 작으면 안됨

  // 크면 마이너스
  // 10보다 작으면 +
  if (ballX + bx > canvas.width - 10 || ballX + bx < 10) {
    bx = -bx;
  }

  // 볼 x이동
  ballX += bx;

  if (ballY + by > canvas.height - 10 || ballY + by < 10) {
    by = -by;
  }

  // 볼 y 이동
  ballY += by;


  // 패들 좌표에 닿으면 튕겨져 나가게 작성
  // 패들은 y는 그대로이며 x가 계속 움직임
  // 볼의 x좌표가 패들 x좌표 +-45일때 닿으면 튕겨져 나가게
  // 볼좌표 303이 paddle(300 - 45) 크고 303이 345보다 작아야함 그리고 ballY가 패들 y좌표와 같아야 함
  if(ballX + bx > paddleX - 45 && ballX + bx < paddleX + 45 && ballY + 10 == 420) {
    by = -by;
  }
}

let keyResult = 0; 
let startGame = false; // 게임 시작

/* 방향키 이동 */
document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowRight") {
    keyResult = 1;
    // if(paddleX < canvas.width - (paddleWidth / 2)) {
    //   paddleX += 5;
    // }
  }
  if (e.key === "ArrowLeft") {
    keyResult = 2;
    // if(paddleX > 0 + (paddleWidth / 2)) {
    //   paddleX -= 5;
    // }
  }
  if (e.key === " ") {
    startGame = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === "ArrowRight") {
    if(keyResult == 1) {
      keyResult = 0;
    }
  }
  if (e.key === "ArrowLeft") {
    if(keyResult == 2) {
      keyResult = 0;
    }
  }
});

// 패들 충돌
function paddleCollison() {
  if (keyResult == 1) {
    if(paddleX < canvas.width - (paddleWidth / 2)) { // 패들 x 좌표가 캔바스 벽 - 45 보다 작으면 +
      paddleX += 5;
      if(startGame == false) {
        ballX += 5;
      }
    }
  }
  if(keyResult == 2) {
    if(paddleX > paddleWidth / 2) { // 패들 x 좌표가 좌측벽 45보다 크면 -
      paddleX -= 5;
      if(startGame == false) {
        ballX -= 5;
      }
    }
  }
}

/* 그리기 */
function draw() {

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스판 초기화

  // 패들 충돌검사
  paddleCollison();
  // 패들 그리기
  paddleDraw();
  // 충돌 감지 , 스페이스 바 누르면 시작
  // 충돌체크 게임시작이 패들위치를 먼저 확인한 후 실행
  if(!startGame) {
    if(paddleX > 300) {
      bx = -3;
      by = -2;
    }else {
      bx = 3;
      by = -2;
    }
  }else {
    ballCollsion(); 
  }
  // 볼 그리기
  ballDraw();

  /* 벽돌 그리기 */
  for(let i = 0; i < 4; i++) {
    for(let j = 0; j < 10; j++) {
      if(mapBricks[i][j] == 1) {
        if(i == 0) {
          ctx.fillStyle = "#E6E6E6";
          ctx.fillRect(blockStartX * (j + 1), blockStartY * (i + 1), bricksWidth, bricksHeight); 
          ctx.strokeStyle = "#3s33";
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




