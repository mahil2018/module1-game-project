var canvas=document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ballRadius=20;
//to move

var x=canvas.width/2;
var y=canvas.height-30;
var dx=2;
var dy=-2;
var paddleHeight=10;
var paddleWidth=75;
var paddleX=(canvas.width-paddleWidth)/2;
var rightPressed= false;
var leftPressed=false;
var brickRowCount = 16;      // rows
var brickColumnCount = 2;   // columns
var brickWidth = 75;        //brick width
var brickHeight = 20;       // brick height
var brickPadding = 10;      //hole between
var brickOffsetTop = 15;    //margin sup
var brickOffsetLeft = 30;   //margin inf
var score = 0;
var lives = 3;


var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);


function keyDownHandler(e){
	if(e.keyCode==39){
		
		rightPressed=true;
		
		}
		else if(e.keyCode==37){
		
		leftPressed=true;
		
		}
		
	}
	
function keyUpHandler(e){
	
	if(e.keyCode==39){
		
		rightPressed=false;
	}
	else if(e.keyCode==37){
		
		leftPressed=false;
		
		}
    }
    
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
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
                            alert("YOU WIN, CONGRATULATIONS!");
                            document.location.reload();
                        }
                    }
                }
            }
        }
    }
    
function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,2*Math.PI);
	ctx.fillstyle="mediumseagreen";
	// ctx.fillStroke="#0033FF";
	// ctx.Stroke="10"
	ctx.fill();
	ctx.closePath();
	}

function drawPaddle(){
	ctx.beginPath();
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
    var color = "yellow";
    ctx.fillstyle.drawPaddle=color;
    // console.log(color)
	ctx.fill();
	ctx.closePath();
	}
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "peru";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "navy";
    ctx.fillText("Score: "+score, canvas.width-75, 480);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "mediumseagreen";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
    drawBall();
    drawBricks();
    drawPaddle();
    
    drawScore();
    drawLives();
	collisionDetection();
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }
    
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}


draw();
