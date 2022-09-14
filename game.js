let canvas = document.querySelector("#game");
let ctx = canvas.getContext("2d");

// Speed 
const config = {
    count: 0,
    maxCount: 10
}

let cellSize = 16
let score = 0
let gameStart = true

let snake = {
    x: 160,
    y: 192, 
    dx: cellSize,
    dy: 0,
    tails: [],
    startTails: 3
}

let berry = {
    x: 128,
    y: 64
   
}

function drawSnake(){
    snake.x += snake.dx;
	snake.y += snake.dy;
    ctx.fillStyle = "orangered"
    snake.tails.unshift({x: snake.x, y: snake.y})
    if(snake.tails.length > snake.startTails){
        snake.tails.pop()
    }
    snake.tails.forEach(function(cell, index){
        ctx.fillRect(cell.x, cell.y, cellSize, cellSize)
        checkCollision(cell)
        checkTailCollision(cell, index)
    })
}

function checkTailCollision(cell, index) {
    for(let i = index+1; i < snake.tails.length; i++){
        if(cell.x === snake.tails[i].x && cell.y === snake.tails[i].y){
            ctx.fillStyle = "white"
            ctx.font= "20px Arial"
            ctx.fillText (`Game over !`, cellSize * 3, cellSize * 4)
            gameStart = false
        }
    }
}

function drawBerry(){
    ctx.fillStyle = "crimson"
    ctx.beginPath();
    ctx.arc(berry.x+cellSize/2, berry.y+cellSize/2, cellSize/2, 0, 2 * Math.PI);
    ctx.fill();
}

function drawScore() {
    ctx.fillStyle = "white"
    ctx.font= "20px Arial"
    ctx.fillText (`Score: ${score}`, cellSize * 1, cellSize * 2)
}


function checkCollision(cell) {
    if(cell.x === berry.x && cell.y === berry.y) {
        score++
        snake.startTails++
        refreshBerry()
    }
}


function game() {
    if(gameStart){
        window.requestAnimationFrame(game)
        if (++config.count < config.maxCount) {
            return;
        }
        config.count = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawScore()
        drawSnake()
        drawBerry()
        checkBorders()
    }else window.cancelAnimationFrame(game)
}


function setDirection(e) {
    if((e.key === "Right" || e.key === "ArrowRight" ) && snake.dx !== -cellSize){
        snake.dx = cellSize;
		snake.dy = 0;
    } else if((e.key === "Left" || e.key === "ArrowLeft") && snake.dx !== cellSize){
        snake.dx = -cellSize;
		snake.dy = 0;
    } else if((e.key === "Up" || e.key === "ArrowUp") && snake.dy !== cellSize){
        snake.dy = -cellSize;
		snake.dx = 0;
    } else if((e.key === "Down" || e.key === "ArrowDown") && snake.dy !== -cellSize){
        snake.dy = cellSize;
		snake.dx = 0;
    } 
}

function checkBorders(){
    if (snake.x < 0) {
        snake.x = canvas.width;
      }
      else if (snake.x >= canvas.width) {
        snake.x = 0;
      }
      if (snake.y < 0) {
        snake.y = canvas.height;
      }
      else if (snake.y >= canvas.height) {
        snake.y = 0;
      }
}

function refreshBerry() {
    berry.x = randomInt()
    berry.y = randomInt()
}

function randomInt() {
    return Math.floor(Math.random()*(canvas.width/cellSize)) * cellSize
}


window.requestAnimationFrame(game)
document.addEventListener("keydown", setDirection);