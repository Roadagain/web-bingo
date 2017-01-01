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

function showNext(result, colorize = true) {
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

function roulette(result) {
  var first = window.setInterval(function() {
    showNext(Math.random() * 75 | 0 + 1);
  }, 50);
  window.setTimeout(function() {
    window.clearInterval(first);
    showNext(result);
    setKeydown();
  }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
  socketio = io.connect("http://localhost:8080");

  socketio.on("overrun", function() {
    window.alert("これ以上回せません");
  });
  socketio.on("next", function(next) {
    roulette(next);
  });

  document.getElementById("next").addEventListener("click", function(ev) {
    socketio.emit("next");
  });

  document.getElementById("reset").addEventListener("click", function(ev) {
    document.getElementById("showNext").innerHTML = "";
    socketio.emit("reset");
  });

  setKeydown();
});
