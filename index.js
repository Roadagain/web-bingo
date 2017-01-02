function setVisible(num, visible) {
  var state = getState(num);
  var element = document.getElementById(state.str);
  if (visible){
    element.style.color = "black";
  }
  else {
    element.classList.add(state.symbol + "num");
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
  var socketio = io.connect("http://bingo.roadagain.org");

  socketio.on("initialize", function(exist) {
    updateTable(exist);
  });
  socketio.on("show", function(next) {
    setVisible(next, true);
  });
  socketio.emit("connected");
});
