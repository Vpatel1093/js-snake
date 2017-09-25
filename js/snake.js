// In game variables
var snake = [];
var score = 0;
var multiplier = 1;
var fruitCell = [];
var gameInProgress = false;
var currentDirection = '';
var lastDirection = '';
const left = 37;
const up = 38;
const right = 39;
const down = 40;

function initGrid() {
  const rows = 40;
  const columns = 40;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      $('#grid').append('<div id="row' + i + '-col' + j + '" class="cell empty"></div>');
    };
  };
};

function initSnake() {
  snake = [[20,20], [20,19], [20,18]];
  for (var i = 0; i < snake.length; i++) {
    $('#row' + snake[i][0] + '-col' + snake[i][1]).removeClass('empty').addClass('snake');
  };
};

function resetGame() {
  gameInProgress = false;
  for (var i = 0; i < snake.length; i++) {
    $('#row' + snake[i][0] + '-col' + snake[i][1]).removeClass('snake').addClass('empty');
  };
  snake = [];
  initSnake();
  console.log(snake[0]+snake[1]+snake[2]+snake[3]);
  fruitCell.removeClass('apple').addClass('empty');
  fruitCell = [];
  placeFruit();
  score = 0;
  multiplier = 1;
  currentDirection = '';
  lastDirection = '';
}

function placeFruit() {
  do {
    var fruitRow = Math.floor(Math.random()*40);
    var fruitColumn = Math.floor(Math.random()*40);
    fruitCell = $('#row' + fruitRow + '-col' + fruitColumn);
  } while(fruitCell.hasClass('snake'));
  fruitCell.addClass('apple').removeClass('empty');
};

function playGame() {
  if (gameInProgress) {
    setTimeout(moveSnake,100/(multiplier*.5));
    $('h3').text("Score: " + score);
  };
};

function moveSnake() {
  $(document).keydown(function(newDirection) {
    if (37 <= newDirection.which && newDirection.which <= 40) {
      // Don't allow snake to make 180 direction change
      if (Math.abs(newDirection.which - lastDirection) !== 2) {
        currentDirection = newDirection.which;
      };
    };
  });

  var move = function(currentDirection) {
    var snakeHead = snake[0];
    switch(currentDirection){
      case 37:
        var nextCellCoords = [snakeHead[0], snakeHead[1]-1];
        var nextCell = $('#row' + nextCellCoords[0] + '-col' + nextCellCoords[1]);
        break;
      case 38:
        var nextCellCoords = [snakeHead[0]-1, snakeHead[1]];
        var nextCell = $('#row' + nextCellCoords[0] + '-col' + nextCellCoords[1]);
        break;
      case 39:
        var nextCellCoords = [snakeHead[0], snakeHead[1]+1];
        var nextCell = $('#row' + nextCellCoords[0] + '-col' + nextCellCoords[1]);
        break;
      case 40:
        var nextCellCoords = [snakeHead[0]+1, snakeHead[1]];
        var nextCell = $('#row' + nextCellCoords[0] + '-col' + nextCellCoords[1]);
        break;
    };

    // Next cell is snake
    if (nextCell.hasClass('snake')) {
      alert('Game over! You hit your own snake!');
      resetGame();
      return;
    };

    // Next cell is wall
    if (nextCellCoords[0] < 0 || nextCellCoords[0] > 39 || nextCellCoords[1] < 0 || nextCellCoords[1] > 39) {
      alert('Game over! You hit a wall!');
      resetGame();
      return;
    };

    // Next cell is empty
    if (nextCell.hasClass('empty')) {
      snake.unshift(nextCellCoords);
      nextCell.removeClass('empty').addClass('snake');
      var snakeTail = snake.pop();
      $('#row' + snakeTail[0] + '-col' + snakeTail[1]).removeClass('snake').addClass('empty');
    };

    // Next cell is apple
    if (nextCell.hasClass('apple')) {
      snake.unshift(nextCellCoords);
      nextCell.removeClass('apple').addClass('snake');
      multiplier += .05
      placeFruit();
      score = Math.floor(score += 10*multiplier);
    };
  };

  move(currentDirection);
  lastDirection = currentDirection;
  playGame();
};

$(document).ready(function initGame() {
  initGrid();
  initSnake();
  placeFruit();

  $(document).keydown(function startGame(key) {
    if (!gameInProgress) {
      currentDirection = key.which;
      if (currentDirection === left || currentDirection === up || currentDirection === right || currentDirection === down) {
        gameInProgress = true;
        playGame();
      };
    };
  });
});
