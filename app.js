const canvas = document.getElementById('game');
const c = canvas.getContext('2d');

class SnakePart{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }
}

// Variables
let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2
let headX = 10;
let headY = 10;
let xVel = 0;
let yVel = 0;
let appleX = 5;
let appleY = 5;
const snakeParts = [];
let tailLength = 2;
let score = 0;

// Main function
function drawGame(){
  changeSnakePosition();
  let result = isGameOver();
  if (result){
    return;
  } else {
    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);
  }
}


// Sub functions
function drawScore(){
  c.fillStyle = 'white';
  c.font = '10px Verdana';
  c.fillText("Score:" + score, canvas.width -50, 10);
}

function clearScreen () {
  c.fillStyle = 'black';
  c.fillRect(0, 0, canvas.width, canvas.height)
}

function drawSnake () {

  c.fillStyle = 'green';
  for(let i = 0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    c.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
  }

  snakeParts.push(new SnakePart(headX, headY)); // put a new item at the end of the list next to the head
  if (snakeParts.length > tailLength){
    //remove the furthest item from the snake parts if we ahve more than the tail size
    snakeParts.shift();
  }

  c.fillStyle = 'orange';
  c.fillRect(headX * tileCount, headY * tileCount, tileSize ,tileSize);

}

function isGameOver(){
  let gameOver = false;

  // check if the game has properly started yet
  if(xVel === 0 && yVel === 0){
    return false;
  }

  // walls
  if (headX < 0 || headX > tileCount -1 || headY < 0 || headY > tileCount -1){
    gameOver = true;
  }


  for(let i = 0; i < snakeParts.length; i++){
    let part = snakeParts[i];
    if (part.x === headX && part.y === headY){
      gameOver = true;
      break;
    }
  }

  if(gameOver){
    c.fillStyle = 'white';
    c.font = '50px Verdana';
    c.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}


function changeSnakePosition () {
  headX = headX + xVel;
  headY = headY + yVel;
}

function drawApple() {
  c.fillStyle = 'red';
  c.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision(){
  if (headY === appleY && headX === appleX){
     appleX = Math.floor(Math.random() * tileCount);
     appleY = Math.floor(Math.random() * tileCount);
     speed +=0.3;
     tailLength++;
     score +=1;
  }
}

function keyDown (event) {
  // down
  if (event.keyCode == 40) {
    if(yVel == -1)
      return;
    yVel = +1;
    xVel = 0;
  }
  // up
  else if (event.keyCode == 38) {
    if (yVel == 1)
      return;
    yVel = -1;
    xVel = 0;
  }
  // left
  else if (event.keyCode == 37) {
    if (xVel == +1)
      return;
    xVel = -1;
    yVel = 0;
  }
  //right
  else if (event.keyCode == 39) {
    if (xVel == -1)
      return;
    xVel = 1;
    yVel = 0;
  }
}

// Listen for key events and run game
document.body.addEventListener('keydown', keyDown);
drawGame();

