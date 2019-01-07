$(function() {
  var canvasWidth = document.getElementById("tennisGame").width;
  var canvasHeight = document.getElementById("tennisGame").height;

  var gamePlay;
  var timer;
  var ballRadius = 10;
  var positionX = canvasWidth / 2;
  var ballSpeedX = 5;
  var ballSpeedY = 5;
  var positionY = canvasHeight / 2;
  var paddleWidth = 10;
  var paddleHeight = 200;
  var paddlePositionY = canvasHeight / 2;
  var paddleStep = paddleHeight / 2;
  var level = 1;
  var levelInterval = 20;

  var timerCounter = 0;

  function resetValues() {
    ballRadius = 10;
    positionX = canvasWidth / 2;
    ballSpeedX = 5;
    ballSpeedY = 5;
    positionY = canvasHeight / 2;
    paddleWidth = 10;
    paddleHeight = 200;
    paddlePositionY = canvasHeight / 2;
    paddleStep = paddleHeight / 2;
    level = 1;
    timerCounter = 0;
  }

  function updateTimer() {
    if (timerCounter == levelInterval) {
      timerCounter = 0;
      level++;
      ballSpeedX *= 1.25;
      ballSpeedY *= 1.25;

      document.getElementById("level").innerText = "Level " + level;
    }
    document.getElementById("timer").innerText = timerCounter++;
  }

  function gameFunction() {
    $("canvas").drawRect({
      fillStyle: "black",
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      width: canvasWidth,
      height: canvasHeight
    });

    $("canvas").drawRect({
      fillStyle: "blue",
      x: 0,
      y: paddlePositionY,
      width: 2 * paddleWidth,
      height: paddleHeight
    });

    $("canvas").drawRect({
      fillStyle: "blue",
      x: canvasWidth,
      y: paddlePositionY,
      width: 2 * paddleWidth,
      height: paddleHeight
    });

    if (
      positionY > paddlePositionY - paddleHeight / 2 &&
      positionY < paddlePositionY + paddleHeight / 2 &&
      (positionX <= paddleWidth + ballRadius ||
        positionX >= canvasWidth - paddleWidth - ballRadius - ballSpeedX)
    ) {
      ballSpeedX = -ballSpeedX;
    } else if (
      (positionY == paddlePositionY - paddleHeight / 2 ||
        positionY == paddlePositionY + paddleHeight / 2) &&
      (positionX < paddleWidth + ballRadius ||
        positionX > canvasWidth - paddleWidth - ballRadius)
    ) {
      ballSpeedX = -ballSpeedX;
      ballSpeedY = -ballSpeedY;
    } else if (
      (positionY < paddlePositionY - paddleHeight / 2 ||
        positionY > paddlePositionY + paddleHeight / 2) &&
      (positionX < paddleWidth + ballRadius ||
        positionX > canvasWidth - paddleWidth - ballRadius)
    ) {
      clearInterval(gamePlay);
      clearInterval(timer);
    } else {
      if (positionX >= canvasWidth - 10 || positionX <= 10) {
        ballSpeedX = -ballSpeedX;
      }
      if (positionY >= canvasHeight - 10 || positionY <= 10) {
        ballSpeedY = -ballSpeedY;
      }
    }

    positionX += ballSpeedX;
    positionY += ballSpeedY;

    $("canvas").drawArc({
      fillStyle: "white",
      x: positionX,
      y: positionY,
      radius: 10
    });
    console.log(positionX, positionY);
  }

  gameFunction();

  document.addEventListener("keydown", function(event) {
    if (event.which == 38) {
      paddlePositionY -= paddleStep;
    }
    if (event.which == 40) {
      paddlePositionY += paddleStep;
    }

    if (event.which == 32) {
      if (event.target.innerHTML == "Pause") {
        event.target.innerHTML = "Start";
        clearInterval(gamePlay);
        clearInterval(timer);
      } else {
        event.target.innerHTML = "Pause";
        gamePlay = setInterval(gameFunction, 1000 / 30);
        timer = setInterval(updateTimer, 1000);
      }
    }

    if (paddlePositionY <= paddleHeight / 2) {
      paddlePositionY = paddleHeight / 2;
    }
    if (paddlePositionY >= canvasHeight - paddleHeight / 2) {
      paddlePositionY = canvasHeight - paddleHeight / 2;
    }
  });

  document
    .getElementById("pauseButton")
    .addEventListener("click", function(event) {
      if (event.target.innerHTML == "Pause") {
        event.target.innerHTML = "Start";
        clearInterval(gamePlay);
        clearInterval(timer);
      } else {
        event.target.innerHTML = "Pause";
        gamePlay = setInterval(gameFunction, 1000 / 30);
        timer = setInterval(updateTimer, 1000);
      }
    });
  document
    .getElementById("resetButton")
    .addEventListener("click", function(event) {
      document.getElementById("pauseButton").innerHTML = "Start";
      clearInterval(gamePlay);
      clearInterval(timer);
      document.getElementById("timer").innerText = 0;
      resetValues();
      gameFunction();
    });
});
