var socketio = io.connect("http://localhost:8080");

socketio.on("overrun", function() {
  window.alert("これ以上回せません");
});
socketio.on("next", function(next) {
  window.alert(next);
});

document.getElementById("next").addEventListener("click", function(ev) {
  console.log("next");
  socketio.emit("next");
});

document.getElementById("reset").addEventListener("click", function(ev) {
  console.log("reset");
  socketio.emit("reset");
});
