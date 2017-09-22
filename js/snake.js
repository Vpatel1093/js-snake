// In game variables
var snake = [];
var score = 0;
var fruitCell = [];
var gameInProgress = false;
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
}

function placeFruit() {
  do {
    var fruitRow = Math.floor(Math.random()*40);
    var fruitColumn = Math.floor(Math.random()*40);
    fruitCell = $('#row' + fruitRow + '-col' + fruitColumn);
  } while(fruitCell.hasClass('snake'));
  fruitCell.addClass('apple');
};

function playGame(direction) {
  console.log(direction);
};


$(document).ready(function initGame() {
  initGrid();
  initSnake();
  placeFruit();

  $(document).keydown(function startGame(key) {
    direction = key.which
    if (!gameInProgress) {
      console.log('a' + direction)
      if (direction === left || direction === up || direction === right || direction === down) {
        gameInProgress = true;
        playGame(direction);
        console.log('b' +direction);
      };
    };
  });
});
