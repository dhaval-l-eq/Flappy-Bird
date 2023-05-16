import isColiding from "./helpers/coliding.js";

// ***** GLOBAL VARIABLES ***** //

const obstacleGenRate = 3000; // in ms
const birdDropRate = 40; // in ms
let gravity = 5;
let removeObstacleTimeouts = [];
let birdDropInterval;
let generateObstacleInterval;
let gameOver = false;
let score = 0;

// ***** CORE LOGIC ***** //

// ***************************** Game start handlers ******************************************** //

$(document).on("keydown", (e) => {
  if (e.keyCode === 32 && !gameOver) {
    // 32 means spacebar
    gravity = 5;
    const currentPos = $("#bird").offset().top;
    $("#bird").offset({ top: currentPos - 60 });
  }
});

$("#restart").on("mousedown", restart);

generateObstacle();

birdDropInterval = setInterval(birdDrop, birdDropRate);

generateObstacleInterval = setInterval(generateObstacle, obstacleGenRate);

// ********************************************* Execution functions ***************************************** //

function birdDrop() {
  const currentPos = $("#bird").offset().top;
  $("#bird").offset({ top: currentPos + gravity });
  gravity += 0.4;

  const isColidingWithPipe = isColiding($("#bird"), $(".pipe"));
  const isColidingWithInvertedPipe = isColiding($("#bird"), $(".inverted"));
  const isColidingWithGround = isColiding($("#bird"), $("#ground"));

  if (isColidingWithGround || isColidingWithInvertedPipe || isColidingWithPipe)
    gameOverHandler();
}

function generateObstacle() {
  const randomPos = Math.round(Math.random() * 140);
  $("#score").text(score);
  score += 100;

  $("#container").append('<div class="pipe"></div>');
  $("#container").append('<div class="pipe inverted"></div>');

  $(".pipe").last().css("bottom", `${randomPos}px`);
  $(".pipe:nth-last-child(2)").css("bottom", `${randomPos}px`);

  const removeTimeOut = setTimeout(() => {
    $(".pipe").first().remove();
    $(".pipe").first().remove();
  }, 5000);

  removeObstacleTimeouts.push(removeTimeOut);
}

function gameOverHandler() {
  clearInterval(birdDropInterval);
  clearInterval(generateObstacleInterval);
  removeObstacleTimeouts.forEach((timeOut) => clearTimeout(timeOut));

  $("#ground").css("animation-play-state", "paused");
  $(".pipe").css("animation-play-state", "paused");
  $(".inverted").css("animation-play-state", "paused");

  gameOver = true;

  $(".game-over").css("visibility", "inherit");
}

function restart() {
  score = 0;
  gameOver = false;
  gravity = 5;
  removeObstacleTimeouts = [];

  $(".game-over").css("visibility", "hidden");
  $(".pipe").remove();

  generateObstacle();

  $("#ground").css("animation-play-state", "running");
  $(".pipe").css("animation-play-state", "running");
  $(".inverted").css("animation-play-state", "running");

  birdDropInterval = setInterval(birdDrop, birdDropRate);
  generateObstacleInterval = setInterval(generateObstacle, obstacleGenRate);

  $("#bird").css("top", "50%");
}
