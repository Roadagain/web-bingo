var socketio = io.connect("http://localhost:8080");

socketio.on("overrun", function() {
  console.log("overrun");
  window.alert("これ以上回せません");
});
socketio.on("next", function(next) {
  console.log("next");
  window.alert(next);
});

document.getElementById("next").addEventListener("click", function(ev) {
  socketio.emit("next");
});

document.getElementById("reset").addEventListener("click", function(ev) {
  socketio.emit("reset");
});
