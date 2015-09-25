/**
 * Created by Gergo on 9/19/2015.
 */

var WHITE = 'white';
var BALL_RADIUS = 13;
var PADDLE_HEIGHT = 90;
var PADDLE_WIDTH = 15;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_W = 87;
var KEY_S = 83;
var PADDLE_STEP = 8;
var gameCanvas = document.getElementById('gameboard');
var dx = 2;
var dy = -2;
var x = gameCanvas.width / 2;
var y = gameCanvas.height - 30;
var intervalHolder = null;

var leftUp = false;
var leftDown = false;
var rightUp = false;
var rightDown = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {

    switch (e.keyCode) {
        case KEY_UP:
        {
            rightUp = true;
            break;
        }
        case KEY_DOWN:
        {
            rightDown = true;
            break;
        }
        case KEY_W:
        {
            leftUp = true;
            break;
        }
        case KEY_S:
        {
            leftDown = true;
            break;
        }
    }

}

function keyUpHandler(e) {
    switch (e.keyCode) {
        case KEY_UP:
        {
            rightUp = false;
            break;
        }
        case KEY_DOWN:
        {
            rightDown = false;
            break;
        }
        case KEY_W:
        {
            leftUp = false;
            break;
        }
        case KEY_S:
        {
            leftDown = false;
            break;
        }
    }
}


function getColor(key) {
    switch (key) {
        case WHITE:
        {
            return '#FFF';
        }
    }
}

function drawBall(ctx, x, y, color) {
    if (ctx) {

        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}

var rightPaddleX = (gameCanvas.width - PADDLE_WIDTH);
var rightPaddleY = (gameCanvas.height - PADDLE_HEIGHT) / 2;
function addRightPaddle(ctx) {

    if (rightUp && rightPaddleY > 0) {
        rightPaddleY -= PADDLE_STEP;
    } else if (rightDown && rightPaddleY < gameCanvas.height - PADDLE_HEIGHT) {
        rightPaddleY += PADDLE_STEP;
    }

    ctx.beginPath();
    ctx.rect(rightPaddleX, rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = getColor(WHITE);
    ctx.fill();
    ctx.closePath();

}

var leftPaddleX = 0;
var leftPaddleY = (gameCanvas.height - PADDLE_HEIGHT) / 2;
function addLeftPaddle(ctx) {

    if (leftUp && leftPaddleY > 0) {
        leftPaddleY -= PADDLE_STEP;
    } else if (leftDown && leftPaddleY < gameCanvas.height - PADDLE_HEIGHT) {
        leftPaddleY += PADDLE_STEP;
    }

    ctx.beginPath();
    ctx.rect(leftPaddleX, leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillStyle = getColor(WHITE);
    ctx.fill();
    ctx.closePath();
}

function drawPlayerWin(ctx, player) {
    ctx.font = "18px SegoeUI";
    ctx.fillStyle = getColor(WHITE);
    ctx.fillText("Player on the [" + player + "] wins!",
        (gameCanvas.width - 200) / 2, (gameCanvas.height - 70) / 2);
}

function mainLoop() {
    var context = gameCanvas.getContext('2d');
    context.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    addLeftPaddle(context);
    addRightPaddle(context);
    drawBall(context, x, y, getColor(WHITE));

    //
    // bounce off the walls
    //

    //right wall
    if (x + dx > gameCanvas.width - BALL_RADIUS) {
        // y should between the paddle y coordinate values
        if (y > rightPaddleY && y < rightPaddleY + PADDLE_HEIGHT) {
            dx = -dx;
        }
        else {
            drawPlayerWin(context, "Left");
            clearInterval(intervalHolder);
        }

    }
    // left wall
    else if (x + dx < BALL_RADIUS) {
        if (y > leftPaddleY && y < leftPaddleY + PADDLE_HEIGHT) {
            dx = -dx;
        }
        else {
            drawPlayerWin(context, "Right");
            clearInterval(intervalHolder);
        }
    }

    if (y + dy > gameCanvas.height - BALL_RADIUS) {
        dy = -dy;
    }
    else if (y + dy < BALL_RADIUS) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

if (gameCanvas) {
    var context = gameCanvas.getContext('2d');

    if (context) {
        intervalHolder = setInterval(mainLoop, 15);
    }
}
else {
    console.error('Could not load the gameboard canvas.');
}