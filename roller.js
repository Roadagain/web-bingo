document.addEventListener('DOMContentLoaded', function() {
  var socketio = io.connect("http://localhost:8080");

  socketio.on("overrun", function() {
    window.alert("これ以上回せません");
  });
  socketio.on("next", function(next) {
    var state = getState(next);
    var element = document.getElementById("showNext");

    element.innerHTML = state.str;
    element.style.color = state.color;
  });

  document.getElementById("next").addEventListener("click", function(ev) {
    socketio.emit("next");
  });

  document.getElementById("reset").addEventListener("click", function(ev) {
    socketio.emit("reset");
  });
});
