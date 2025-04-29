const canvas = document.getElementById("tetris");
const ctx = canvas.getContext("2d");

/* 게임판 */
const row = 20; // 행 == height 600 / 30 == 20
const col = 13; // 열 == width 390 / 13 == 13
const blockSize = 30; // 블럭 사이즈

// 게임판 배열
// row 행 , col 열 만큼 배열을 만들고 값을 0으로 채움 == 20행 13열
const tetrisBoard = Array.from({ length: row }, () => Array(col).fill(0));
console.table(tetrisBoard); // 테이블 확인


/* z 블럭 */
const zBlock1 = [
  [1, 1, 0],
  [0, 1, 1]
]

/* 역 z 블럭 */
const zBlock2 = [
  [0, 1, 1],
  [1, 1, 0]
]

/* 네모 블럭 */
const sBlock = [
  [1, 1],
  [1, 1]
]

/* 일자 블럭 */
const oBlock = [
  [1, 1, 1, 1]
]

/* T 블럭 */
const tBlock = [
  [1, 1, 1],
  [0, 1, 0]
]

/* L 블럭 */
const lBlock1 = [
  [1, 0, 0],
  [1, 1, 1]
]

/* 역 L 블럭 */
const lBlock2 = [
  [0, 0, 1],
  [1, 1, 1]
]

/* 랜덤으로 꺼내기 위한 배열 */
const blocks = [zBlock1, zBlock2, sBlock, oBlock, tBlock, lBlock1, lBlock2];

/* 블럭 컬러 정의 */
let blockColorList = [
  "yellow",    // zBlock1
  "#00B050",   // zBlock2
  "#C0504D",   // sBlock
  "#93CDDD",   // oBlock
  "#FFC000",   // tBlock
  "#558ED5",   // lBlock1
  "#B3A2C7"    // lBlock2
]

let blockColor; // 현재 블럭 컬러 2
let block; // 현재 블럭 2

let block2; // 미리 보기 블럭 3
let blockColor2; // 미리 보기 블럭 컬러 3

let x; // x 좌표
let y; // y 좌표


/* 블럭 만들기 */
function createBlock() {

  block = block2; // block2 값 복사
  blockColor = blockColor2;

  x = Math.floor((col - block[0].length) / 2); // 가운데 좌표
  y = 4; // y 좌표 4부터 시작

  createBlock2();
}


// 다음 블럭이 무엇인지 미리 볼 수 있어야 함
// 그 블럭이 그려지면서 떨어져야 함

/* 미리보기 블럭 만들기 */
function createBlock2() {
  const randomBlock = Math.floor(Math.random() * blocks.length); // 블럭 길이만큼 랜덤숫자
  block2 = blocks[randomBlock];
  blockColor2 = randomBlock + 1; // 블럭 컬러 지정
}

let dx = 0; // 수평
let dy = 1; // 수직

// 아래에 값이 있는지 없는지 확인후 y++
/* 충돌 감지 정의 */
function checkCollision() {
  for(let i = 0; i < block.length; i++) {
    for(let j = 0; j < block[i].length; j++) { 
      if(block[i][j] == 1) { // 2차원 배열 값이 1이면
        const cx = x + j + dx;  // 블럭의 x 좌표  5 , 6, 7
        const cy = y + i + dy;  // 블럭의 y 좌표  5,  5  5
        // cx가 왼쪽 벽보다 작으면 true, cx가 col(벽 우측) 크거나 같으면 true,
        // cy가 row(아래 바닥) 보다 크거나 같으면 true
        // 테트리스 보드판 행과 열에 값이 있다면 true
        if(cx < 0 || cx >= col || cy >= row || tetrisBoard[cy][cx]) {
          return true;
        }
      }
    }
  }

  return false;
}

let gameOver = false; // 게임 끝 설정

/* 보드판 좌표에 값 저장 */
function fixBlock() {

  // 4번째 줄에 이미 블록이 있다면 게임 오버
  for (let j = 0; j < block[0].length; j++) {
    if (tetrisBoard[4][x + j]) { // y 4행에 값이 있다면 실행
      gameOver = true;
      alert("게임 끝!");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스판 초기화
      return;
    }
  }

  for(let i = 0; i < block.length; i++) {
    for(let j = 0; j < block[i].length; j++) {
      if(block[i][j] == 1) {
        tetrisBoard[y + i][x + j] = blockColor; // 해당 좌표에 색상코드 저장
        console.table(tetrisBoard); // 테이블 확인
      }
    }
  }

  deleteBlock();
  createBlock(); // 새로운 블럭 생성
}



// 한 행마다 값 검사
// 삭제 후 행 추가
/* 줄 없애기 함수 정의 */
function deleteBlock() {

  for (let i = 0; i < row; i++) {

    let count = 0; // 행 0인 아닌 값 카운트

    for (let j = 0; j < col; j++) {
      if (tetrisBoard[i][j] != 0) {  // 0이 아닌 다른 숫자가 있으면
        count++; // 카운트 ++
      }
      if(count == col) { // 카운트 갯수가 col 갯수와 같으면 그 행 제거
        tetrisBoard.splice(i,1); // 행 삭제
        score = score + 1000;
        tetrisBoard.unshift(Array(col).fill(0)); // 행 추가
      }
    }
  }
}


let score = 0; // 점수

/* 블럭 크기 및 생상 정의 */
function draw() {

  // 게임 끝나면
  if(gameOver) {
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스판 초기화

  /* 점수판 박스 */
  ctx.fillStyle = "#fff";
  ctx.fillRect(260, 10, 120, 30);
  ctx.strokeStyle = "#333";
  ctx.strokeRect(260, 10, 120, 30);
  
  // 점수 업데이트
  ctx.fillStyle = "#000";
  ctx.font = "15px Arial";
  ctx.fillText("Score: " + score, 270, 32); 

  /* 미리보기 블럭 박스 */
  ctx.fillStyle = "#fff";
  ctx.fillRect(10, 10, 150, 80);
  ctx.strokeStyle = "#333";
  ctx.strokeRect(10, 10, 150, 80);


  /* 미리보기 블럭 그리기 */
  for(let i = 0; i < block2.length; i++) {
    for(let j = 0; j < block2[i].length; j++) {
      if(block2[i][j] == 1) {
        ctx.fillStyle = blockColorList[blockColor2 - 1];
        ctx.fillRect(20 + blockSize * j, 20 + blockSize * i, blockSize, blockSize); 
        ctx.strokeStyle = "#333";
        ctx.strokeRect(20 + blockSize * j, 20 + blockSize * i, blockSize, blockSize);
      }
    }
  }

  /* 떨어진 블럭 */
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (tetrisBoard[i][j]) { // 배열의 값이 있다면 블럭 그리기
        ctx.fillStyle = blockColorList[tetrisBoard[i][j] - 1]; // ex) 4의 값이 있다면 -1 하여 ColorList 값 꺼내오기
        ctx.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "#333";
        ctx.strokeRect(j * blockSize, i * blockSize, blockSize, blockSize);
      }
    }
  }

  /* 떨어지는 블럭 */
  for (let i = 0; i < block.length; i++) { // 블럭 i 길이 2
    for (let j = 0; j < block[i].length; j++) { // 블럭 j의 길이 3 or 4
      if (block[i][j] == 1) {
        ctx.fillStyle = blockColorList[blockColor - 1]; // 리스트 - 1 컬러
        ctx.fillRect((x + j) * blockSize, (y + i) * blockSize, blockSize, blockSize);
        ctx.strokeStyle = "#333";
        ctx.strokeRect((x + j) * blockSize, (y + i) * blockSize, blockSize, blockSize);
      }
    }
  }


  /* 충돌 감지 후 좌표 고정 및 y 증가 */
  if(checkCollision()) { 
    fixBlock();
  }else {
    y++; // false이면 y좌표 증가
  }
}

// const tBlock = [
//   [1, 1, 1],
//   [0, 1, 0]
// ]


// const tBlock = [
//   [0, 1]
//   [1, 1]
//   [0, 1]
// 


/* 회전 블록 함수 정의 */
function rotateBlock() {

  // 회전 블럭을 담을 배열 선언
  let newBlock = [];

  // 블럭의 열 수 만큼 행 만들기
  for(let j = 0; j < block[0].length; j++) {
    newBlock[j] = [];
  }

  for(let i = 0; i < block.length; i++) { // 행 2
    for(let j = 0; j < block[i].length; j++) { // 열 3
      // 블럭의 값을 newBlock 열 1번째 인덱스 부터 값을 적용
      newBlock[j][block.length - 1 - i] = block[i][j]; 
      console.log(newBlock);
    }
  }
  // 새로운 블럭 배열 기존 배열 블럭에 저장
  block = newBlock;
}


/* 하강 함수 정의 */
function dropBlock() {
  for(let i = 0; i < row; i++) { // 0 ~ 19(행)
    if(!checkCollision()) {
      y++;
    }
  }
}


/* 방향키 이벤트 */
document.addEventListener('keydown', (e) => {
  switch(e.key) {  // key == Text , keycode == number
    case "ArrowLeft": // 좌측 방향키
      dx = -1; // 좌 한칸씩
      if(!checkCollision()) {
        x--;
      }
      dx = 0;
      break;
    case "ArrowRight": // 우 방향키
      dx = 1; // 우측 한칸씩
      if(!checkCollision()) {
        x++;
      }
      dx = 0;
      break;
    case "ArrowDown": // 아래 방향키
      if(!checkCollision()) {
        y++; // 아래 한칸씩
      }
      break;
    case "ArrowUp": // 위 방향키
      rotateBlock(); // 회전
      break;
    case " ": // 스페이스바
      dropBlock(); // 하강
      break;  
  }
});


/* 버튼 이벤트 */
document.getElementById("moveLeft").addEventListener("click", () => {
  dx = -1; // 좌측
  if(!checkCollision()) {
    x--;
  }
  dx = 0;
});

document.getElementById("moveRight").addEventListener ("click", () => {
  dx = 1; // 우측
  if(!checkCollision()) {
    x++;
  }
  dx = 0;
});

document.getElementById("moveRotate").addEventListener("click", () => {
  rotateBlock(); // 회전
});

document.getElementById("moveDrop").addEventListener("click", () => {
  dropBlock(); // 하강
});



createBlock2(); // 미리보기용 블럭 먼저 생성
createBlock();  // 현재 블럭 생성
setInterval(draw, 500); // 비동기 함수 계속 실행

