var socketio;

function setKeyup() {
  document.addEventListener("keyup", function (e) {
    if (e.key.match(/^[a-z]$/)){
      var listeners = arguments.callee;
      socketio.emit("next");
      document.removeEventListener("keyup", listeners, false);
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

function playVoice(state, result) {
  var VOICE = "Voice";
  var symbolVoice = document.getElementById(state.symbol + VOICE);
  var noVoice = document.getElementById("no" + VOICE);
  var ten = (result / 10 | 0) * 10;
  var tenVoice = document.getElementById(ten + VOICE);
  var one = result % 10;
  var oneVoice = document.getElementById(one + VOICE);

  symbolVoice.play();
  window.setTimeout(function(){
    noVoice.play();
  }, 600);
  window.setTimeout(function(){
    if (tenVoice){
      tenVoice.play();
      window.setTimeout(function(){
        oneVoice.play();
        setKeyup();
      }, 700);
    }
    else {
      oneVoice.play();
      setKeyup();
    }
  }, 1200);
}

function showNext(result, colorize = true) {
  var state = getState(result);
  var element = document.getElementById("showNext");

  element.innerHTML = state.str;
  if (colorize){
    if (element.classList.contains(state.symbol + "num") !== true){
      removeClasses(element, 2);
      element.classList.add(state.symbol + "num");
    }
  }
  else if (element.classList.contains("empty") !== true){
      removeClasses(element, 2);
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
        playVoice(state, result);
        socketio.emit("show");
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

  setKeyup();
});
