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

/* 볼 반지름 */
let ballRadius = 10;

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
   ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
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

let bx = 0; 
let by = 0;  

let gameOver = false; // 게임 끝
let startGame = false; // 게임 시작


let count = 0;

function ballCollision() {
  // 현재 오류
  // 너비보다 작으면 +를 하고
  // 너비랑 같아지면 -를 한다
  // 마이너스가 되면 계속 플러스가 되고 무한 반복

  // 520이 되면 멈춤
  // 518이되면 다시 +2 무한 루프

  // 볼 좌표 + 반지름이 캔버스 우측벽 - 지름 보다 크면 -로 변경
  // 볼 좌표 + 반지름이 캔버스 좌측벽 지름 보다 작으면 -로 변경

  // 볼좌표가 캔바스 우측 590보다 크면 안됨
  // 10보다 작으면 안됨

  // 크면 마이너스
  // 10보다 작으면 +
  if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
    bx = -bx;
  }

  // 볼 x이동
  ballX += bx;

  if (ballY + ballRadius > canvas.height || ballY - ballRadius < 0) {
    by = -by;
  }

  // 볼 y 이동
  ballY += by;

  // 패들 좌표에 닿으면 튕겨져 나가게 작성
  // 패들은 y는 그대로이며 x가 계속 움직임
  // 볼의 x좌표가 패들 x좌표 +-45일때 닿으면 튕겨져 나가게
  // 볼X좌표 + 반지름이 패들X - 45 보다 크고 패들좌표 + 45보다 작야아함
  // 볼Y좌표(420) + paddleY보다 커야함
  if(ballX + ballRadius > paddleX - paddleWidth / 2 && ballX + ballRadius < paddleX + paddleWidth / 2 &&
     ballY + ballRadius > paddleY) {
      by = -by;

  

      // 볼이 패들 좌측에 닿으면 x좌표는 -
      // 볼이 패들 우측에 닿으면 x좌표는 +
      // 볼 좌표가 300보다 작으면 -
      // 볼이 --여서 양수로 바뀜 안바뀌게
      if(ballX + ballRadius < paddleX) {
        bx = -Math.abs(bx);
      }else {
        bx = Math.abs(bx);
      }

  }

  /* 패들 보다 낮으면 게임 끝 */
  // 볼의 좌표가 패들 좌표보다 크면 게임 끝 설정
  // 경고가 뜨면 더 이상 게임이 실행되지 않아야 함.
  // 볼 좌표 + 반지름이 패들보다 크면 끝
  if(ballY + ballRadius > paddleY + ballRadius) { 
    gameOver = true;
  }

  /* 벽돌 충돌 */
  // 벽돌의 좌표를 구한다 포문 ??
  // 볼의 좌표를 구한다.
  // 벽돌 사이즈 50 * 20
  for(let i = 0; i < mapBricks.length; i++) {
    for(let j = 0; j < mapBricks[i].length; j++) {
      if(mapBricks[i][j] == 1) {
        let bricksX = 0;
        let bricksY = 0;
        if(i == 0) {
          bricksX = blockStartX * (j + 1);
          bricksY = blockStartY * (i + 1);
        }else {
          bricksX = blockStartX * (j + 1);
          bricksY = blockStartY * (i + 1) - (20 * i);
        }

        // 볼 좌표 + 반지름
        // 각각의 좌표를 구해서 충돌 체크
        // 볼 x좌표가 50 보다 크고 100 작고
        // 볼 y좌표가 20보다 크고 40보다 작아야함
        // 결과로 저 블럭 한개 좌표마다 충돌체크 해서 방향 전환 후 배열 값 0으로 변환
        if (
          ballX + ballRadius >= bricksX && ballX - ballRadius <= bricksX + bricksWidth &&
          ballY + ballRadius >= bricksY && ballY - ballRadius <= bricksY + bricksHeight)
        {
          by = -by;
          mapBricks[i][j] = 0;
          count++; 
          if(count == mapBricks.length * mapBricks[i].length) {
            gameOver = true;
          }

        }
      }
    }
  }
}

let keyResult = 0; 

/* 방향키 이동 */
document.addEventListener('keydown', (e) => {
  if (e.key == "ArrowRight") {
    keyResult = 1;
    // if(paddleX < canvas.width - (paddleWidth / 2)) {
    //   paddleX += 5;
    // }
  }
  if (e.key == "ArrowLeft") {
    keyResult = 2;
    // if(paddleX > 0 + (paddleWidth / 2)) {
    //   paddleX -= 5;
    // }
  }
  if (e.key == " ") {
    startGame = true;
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key == "ArrowRight") {
    if(keyResult == 1) {
      keyResult = 0;
    }
  }
  if (e.key == "ArrowLeft") {
    if(keyResult == 2) {
      keyResult = 0;
    }
  }
});

/* 패들 충돌 */
function paddleCollision() {
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

  ctx.clearRect(0, 0, canvas.width, canvas.height); 

  // 공이 패들에 부딪히지 않으면 true
  // 알림창
  // 함수 벗어남

  // 내가 원하는것 알림 확인을 누르면 다시 초기로돌아가 다시 시작

  // 패들 충돌검사
  paddleCollision();
  // 패들 그리기
  paddleDraw();
  
  // 충돌 감지 , 스페이스 바 누르면 시작
  // 충돌체크 게임시작이 패들위치를 먼저 확인한 후 실행
  if(!startGame) {
    if(paddleX > 300) {
      bx = -4;
      by = -3;
    }else {
      bx = 4;
      by = -3;
    }
  }else {
    ballCollision(); 
  }

  // 볼 그리기
  if(!gameOver) {
    ballDraw();
  }

  if(gameOver) {
    alert("게임 끝");
    location.reload();
    return;
  }


  // 내가 하고싶은 것
  // 벽돌의 x , y 좌표를 이중포문을 돌려 좌표를 따온 후
  // 충돌 검사 할건데 따오려면 어떻게 해야할까...


  /* 벽돌 그리기 */
  for(let i = 0; i < mapBricks.length; i++) {
    for(let j = 0; j < mapBricks[i].length; j++) {
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


