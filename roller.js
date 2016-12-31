var socketio;

function setKeydown() {
  document.addEventListener("keydown", function (e) {
    if (e.key.match(/^[a-z]$/)){
      var listeners = arguments.callee;
      socketio.emit("next");
      document.removeEventListener("keydown", listeners, false);
    }
  });
}

function showNext(result, colorize) {
  var state = getState(result);
  var element = document.getElementById("showNext");

  element.innerHTML = state.str;
  if (colorize){
    element.style.color = state.color;
  }
  else {
    element.style.color = "black";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  socketio = io.connect("http://localhost:8080");

  socketio.on("overrun", function() {
    window.alert("これ以上回せません");
  });
  socketio.on("next", function(next) {
  });

  document.getElementById("next").addEventListener("click", function(ev) {
    socketio.emit("next");
  });

  document.getElementById("reset").addEventListener("click", function(ev) {
    socketio.emit("reset");
  });

  setKeydown();
});
