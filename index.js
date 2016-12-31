function setVisible(num, visible) {
  var BINGO = "BINGO";
  var COLORS = ["red", "blue", "orange", "green", "purple"];

  var id = BINGO[(num - 1) / 15 | 0] + ('0' + num).substr(-2);
  var color = COLORS[(num - 1) / 15 | 0];
  var element = document.getElementById(id);
  if (visible){
    element.style.color = "white";
  }
  else {
    element.style.color = color;
  }
}

function updateTable(table) {
  table.map(function(v, i) {
    if (1 <= i && i <= 75){
      setVisible(i, v);
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {
  var socketio = io.connect("http://localhost:8080");

  socketio.on("initialize", function(exist) {
    updateTable(exist);
  });
  socketio.on("next", function(next) {
    setVisible(next, true);
  });
  socketio.emit("connected");
});
