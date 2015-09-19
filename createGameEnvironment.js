/**
 * Created by Gergo on 9/19/2015.
 */

var WHITE = 'white';
var BALL_RADIUS = 13;
var gameCanvas = document.getElementById('gameboard');


function setCorrectRatio(canvas, ctx) {
    var devicePixelRatio = 4;//window.devicePixelRatio || 1;
    var backingStoreRatio = 2;
        //ctx.webkitBackingStorePixelRatio ||
        //    ctx.mozBackingStorePixelRatio ||
        //    ctx.msBackingStorePixelRatio ||
        //    ctx.oBackingStorePixelRatio ||
        //    ctx.backingStorePixelRatio || 1;
    var ratio = devicePixelRatio / backingStoreRatio;
    console.warn('Ratio:' + ratio);

    //if (devicePixelRatio !== backingStoreRatio) {

        var oldWidth = canvas.width;
        var oldHeight = canvas.height;

        canvas.width = oldWidth * ratio;
        canvas.height = oldHeight * ratio;

        canvas.style.width = oldWidth + 'px';
        canvas.style.height = oldHeight + 'px';

        // now scale the context to counter
        // the fact that we've manually scaled
        // our canvas element
     //   ctx.scale(ratio, ratio);
    //}
}

function getStroke(key) {
    switch (key) {
        case WHITE:
        {
            return 'rgba(255, 255, 255, 1)'
        }
    }
}

function drawBall(ctx, x, y) {
    if (ctx) {
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS, 0, 2 * Math.PI);
        ctx.strokeStyle = getStroke(WHITE);
        ctx.stroke();
        ctx.closePath();
    }
}

function handleKeyPress(key) {
    console.log(key);
}

if (gameCanvas) {
    gameCanvas.onclick = function(key) {
        console.error(key);
    };

    var context = gameCanvas.getContext('2d');

    setCorrectRatio(gameCanvas, context);


    if (context) {

        for (var i=0; i<100; i++) {
            context.clearRect(0, 0,gameCanvas.width, gameCanvas.height);
            var x = (Math.random() * 1000) % (gameCanvas.width - BALL_RADIUS);
            var y = (Math.random() * 1000) % (gameCanvas.height - BALL_RADIUS);

            drawBall(context, x, y);

        }
        //setCorrectRatio(context);
    }
}
else {
    console.error('Could not load the gameboard canvas.');
}