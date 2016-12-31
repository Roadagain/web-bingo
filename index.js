function setVisible(num, visible) {
  var BINGO = "BINGO";
  var COLORS = ["red", "blue", "orange", "green", "purple"];

  var state = getState(num);
  var element = document.getElementById(state.str);
  if (visible){
    element.style.color = "white";
  }
  else {
    element.style.color = state.color;
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
