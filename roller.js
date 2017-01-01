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

function removeClasses(element, start = 0, end = -1)
{
  if (end === -1){
    end = element.classList.length;
  }
  var len = end - start;
  for (var i = 0; i < len; ++i){
    element.classList.remove(element.classList[start]);
  }
}

function showNext(result, colorize = true) {
  var state = getState(result);
  var element = document.getElementById("showNext");

  element.innerHTML = state.str;
  if (colorize){
    console.log(element.classList);
    if (element.classList.contains(state.symbol + "num") !== true){
      removeClasses(element, 1);
      element.classList.add(state.symbol + "num");
    }
  }
  else if (element.classList.contains("empty") !== true){
      removeClasses(element, 1);
    element.classList.add("empty");
  }
}

function roulette(result) {
  var first = window.setInterval(function() {
    showNext(Math.random() * 75 | 0 + 1, false);
  }, 50);

  var state = getState(result);
  var start = ((result - 1) / 15 | 0) * 15 + 1;
  var current = 0;

  window.setTimeout(function() {
    window.clearInterval(first);

    var second = window.setInterval(function() {
      showNext(start + current);
      current = (current + 1) % 15;
    }, 200);
    window.setTimeout(function() {
      window.clearInterval(second);
    }, 2000);
  }, 3000);

  window.setTimeout(function() {
    var third = window.setInterval(function() {
      showNext(start + current);
      if (start + current === result){
        window.clearInterval(third);
        setKeydown();
      }

      current = (current + 1) % 15;
    }, 500);
  }, 5000);
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
