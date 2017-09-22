// In game variables
var snake = [];
var score = 0;
var fruitCell = [];
var gameInProgress = false;
var currentDirection = '';
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
    $('#row' + snake[i][0] + '-col' + snake[i][1]).addClass('snake');
  };
};

function resetGame() {
  for (var i = 0; i < snake.length; i++) {
    $('#row' + snake[i][0] + '-col' + snake[i][1]).removeClass('snake').addClass('empty');
  };
  snake = [];
  initSnake();
  fruitCell.removeClass('apple').addClass('empty');
  fruitCell = [];
  placeFruit();
  score = 0;
  gameInProgress = false;
  currentDirection = '';
}

function placeFruit() {
  do {
    var fruitRow = Math.floor(Math.random()*40);
    var fruitColumn = Math.floor(Math.random()*40);
    fruitCell = $('#row' + fruitRow + '-col' + fruitColumn);
  } while(fruitCell.hasClass('snake'));
  fruitCell.addClass('apple');
};

function playGame() {
  do {
    setTimeout(moveSnake(), 100);
  } while(gameInProgress);
};

function moveSnake() {
  $(document).keydown(function(newDirection) {
    currentDirection = newDirection.which;
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


    // Update snake when next cell empty
    if (nextCell.hasClass('empty')) {
      snake.unshift(nextCellCoords);
      nextCell.removeClass('empty').addClass('snake');
      var snakeTail = snake.pop();
      $('#row' + snakeTail[0] + '-col' + snakeTail[1]).removeClass('snake').addClass('empty');
    };
  };

  if (37 <= currentDirection && currentDirection <= 40) {
    move(currentDirection);
  };

  gameInProgress = false;
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
