/**
 * Created by Gergo on 9/19/2015.
 */

var WHITE = 'white';
var CONSTANTS = new Constants();
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
        case CONSTANTS.KEY_UP:
        {
            rightUp = true;
            break;
        }
        case CONSTANTS.KEY_DOWN:
        {
            rightDown = true;
            break;
        }
        case CONSTANTS.KEY_W:
        {
            leftUp = true;
            break;
        }
        case CONSTANTS.KEY_S:
        {
            leftDown = true;
            break;
        }
    }

}

function keyUpHandler(e) {
    switch (e.keyCode) {
        case CONSTANTS.KEY_UP:
        {
            rightUp = false;
            break;
        }
        case CONSTANTS.KEY_DOWN:
        {
            rightDown = false;
            break;
        }
        case CONSTANTS.KEY_W:
        {
            leftUp = false;
            break;
        }
        case CONSTANTS.KEY_S:
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
        ctx.arc(x, y, CONSTANTS.BALL_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }
}

var rightPaddleX = (gameCanvas.width - CONSTANTS.PADDLE_WIDTH);
var rightPaddleY = (gameCanvas.height - CONSTANTS.PADDLE_HEIGHT) / 2;
function addRightPaddle(ctx) {

    if (rightUp && rightPaddleY > 0) {
        rightPaddleY -= CONSTANTS.PADDLE_STEP;
    } else if (rightDown && rightPaddleY < gameCanvas.height - CONSTANTS.PADDLE_HEIGHT) {
        rightPaddleY += CONSTANTS.PADDLE_STEP;
    }

    ctx.beginPath();
    ctx.rect(rightPaddleX, rightPaddleY, CONSTANTS.PADDLE_WIDTH, CONSTANTS.PADDLE_HEIGHT);
    ctx.fillStyle = getColor(WHITE);
    ctx.fill();
    ctx.closePath();

}

var leftPaddleX = 0;
var leftPaddleY = (gameCanvas.height - CONSTANTS.PADDLE_HEIGHT) / 2;
function addLeftPaddle(ctx) {

    if (leftUp && leftPaddleY > 0) {
        leftPaddleY -= CONSTANTS.PADDLE_STEP;
    } else if (leftDown && leftPaddleY < gameCanvas.height - CONSTANTS.PADDLE_HEIGHT) {
        leftPaddleY += CONSTANTS.PADDLE_STEP;
    }

    ctx.beginPath();
    ctx.rect(leftPaddleX, leftPaddleY, CONSTANTS.PADDLE_WIDTH, CONSTANTS.PADDLE_HEIGHT);
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
    if (x + dx > gameCanvas.width - CONSTANTS.BALL_RADIUS) {
        // y should between the paddle y coordinate values
        if (y > rightPaddleY && y < rightPaddleY + CONSTANTS.PADDLE_HEIGHT) {
            dx = -dx;
        }
        else {
            drawPlayerWin(context, "Left");
            clearInterval(intervalHolder);
        }

    }
    // left wall
    else if (x + dx < CONSTANTS.BALL_RADIUS) {
        if (y > leftPaddleY && y < leftPaddleY + CONSTANTS.PADDLE_HEIGHT) {
            dx = -dx;
        }
        else {
            drawPlayerWin(context, "Right");
            clearInterval(intervalHolder);
        }
    }

    if (y + dy > gameCanvas.height - CONSTANTS.BALL_RADIUS) {
        dy = -dy;
    }
    else if (y + dy < CONSTANTS.BALL_RADIUS) {
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