function drawGrid() {
  const rows = 40;
  const columns = 40;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      $('#grid').append('<div id="row' + i + '-col' + j + '" class="cell empty"></div>');
    };
  };
};

function placeFruit() {
  var fruitCell;
  do {
    var fruitRow = Math.floor(Math.random()*40) +1;
    var fruitColumn = Math.floor(Math.random()*40) +1;
    fruitCell = $('#row' + fruitRow + '-col' + fruitColumn);
  } while(fruitCell.hasClass('snake'));
  fruitCell.addClass('apple');
};

$(document).ready(function snake() {
  drawGrid();
  placeFruit();
});
