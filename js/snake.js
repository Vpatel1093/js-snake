function drawGrid() {
  const rows = 40;
  const columns = 40;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      $('#grid').append('<div id="row' + i + '-col' + j + '" class="cell empty"</div>');
    };
  };
};

$(document).ready(function snake() {
  drawGrid();
});
