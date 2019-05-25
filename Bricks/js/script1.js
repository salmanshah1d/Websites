var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var waiting =false;
var x = canvas.width/2;
var y = canvas.height-30;

var dx = 2;
var dy = -2;

var ballRadius = 10;
var color = getRandomColor();

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

var score = 0;
var scoreTotal = 0;
var lives = 5;
var level = 1;

var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
 		bricks[c][r] = { x: 0, y: 0, status: 1 };
     }
}

function drawText() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score + ", " + scoreTotal, 8, 20);
    ctx.fillText("Lives: " + lives, canvas.width - 63, 20)
    ctx.fillText("Level: " + level, canvas.width/2 - 31, 20)
}

function drawBricks() {
    if (level == 1){
        for(c=0; c<brickColumnCount; c++) {
            for(r=0; r<brickRowCount; r++) {
               if(bricks[c][r].status == 1) {
                    var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                    bricks[c][r].x = brickX;
                    bricks[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, brickWidth, brickHeight);
                    ctx.fillStyle = "#0095DD";
                    ctx.fill();
                    ctx.closePath();
                }
            }
        }
    } else if (level == 2){


    } else if (level == 3){


    } else if (level == 4){


    } else if (level == 5){


    }   
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX >= paddleWidth/2 && relativeX <= canvas.width - paddleWidth/2) {
        paddleX = relativeX - paddleWidth/2;
    }
}

function drawBall(){
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.closePath();
}

function drawSquare(){
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	color = getRandomColor();
	drawBricks();
	drawBall();
	collisionDetection();
	drawText();
	drawSquare();

	if (y + dy < ballRadius){
		dy = -dy;
	} else if (y + dy > canvas.height - ballRadius){
		if (x > paddleX && x < paddleX + paddleWidth) {
				dy = -dy;
		} else {
            if (lives > 1){
                lives--;

                waiting = true;
                setTimeout(function(){waiting = false;}, 700);
                    dx = 2;
                    dy = -2;

                    color = getRandomColor();
                    paddleX = (canvas.width-paddleWidth)/2;

            } else {
                lives--;
                drawText();

                alert("Game over.");
                x=0;
                y=0;

                document.location.reload();
            }
		}
	}

    
	if (x + dx < ballRadius || x + dx > canvas.width - ballRadius){
		dx = -dx;
	}

	x += dx;
	y += dy;

	if(rightPressed && paddleX < canvas.width-paddleWidth) {
    	paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
    	paddleX -= 7;
	}
}

function end(){
    alert("Game over.");
    document.location.reload();
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;


                    if(score == brickRowCount*brickColumnCount) {
                        alert("You have now passed level " + level + ".");
                        level++;
                        scoreTotal += score;
                        score = 0;
                    }

                    if (level == 5){
                        alert("YOU WIN, CONGRATULATIONS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function getRandomColor() {
  var code = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += code[Math.round(Math.random() * 16)];
  }
  return color;
}

function draw1(){
   if (!waiting)
    draw();
}

setInterval(draw1, 10);