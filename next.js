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

document.addEventListener("DOMContentLoaded", function() {
  var socketio = io.connect("http://localhost:8080");

  socketio.on("show", function(next) {
    showNext(next);
    socketio.emit("waitNext");
  });
});
