const fs = require("fs");
const url = require("url");
const server = require("http").createServer(function(request, response) {
  const pathname = require("url").parse(request.url, true).pathname;
  console.log("reqiuired: " + pathname);

  let output;
  if (pathname === "/" || pathname === "/index.html"){
    response.writeHead(200, {"Content-Type": "text/html"});
    output = fs.readFileSync("./index.html", "utf-8");
  }
  else if (pathname === "/index.css"){
    response.writeHead(200, {"Content-Type": "text/css"});
    output = fs.readFileSync("./index.css", "utf-8");
  }
  else if (pathname === "/index.js"){
    response.writeHead(200, {"Content-Type": "text/javascript"});
    output = fs.readFileSync("./index.js", "utf-8");
  }
  else if (pathname === "/roller.html"){
    response.writeHead(200, {"Content-Type": "text/html"});
    output = fs.readFileSync("./roller.html", "utf-8");
  }
  else if (pathname === "/roller.css"){
    response.writeHead(200, {"Content-Type": "text/css"});
    output = fs.readFileSync("./roller.css", "utf-8");
  }
  else if (pathname === "/roller.js"){
    response.writeHead(200, {"Content-Type": "text/javascript"});
    output = fs.readFileSync("./roller.js", "utf-8");
  }
  else if (pathname === "/state.css"){
    response.writeHead(200, {"Content-Type": "text/css"});
    output = fs.readFileSync("./state.css", "utf-8");
  }
  else if (pathname === "/state.js"){
    response.writeHead(200, {"Content-Type": "text/javascript"});
    output = fs.readFileSync("./state.js", "utf-8");
  }
  else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    output = "Not found";
  }
  response.end(output);
}).listen(8080);
const io = require("socket.io").listen(server);
const bingo = require("./bingo.js");

console.log("server start");

let numbers = bingo.shuffled();
let exist = bingo.defaultResult();

io.sockets.on("connection", function (socket) {
  let next;
  socket.on("connected", function() {
    socket.emit("initialize", exist);
  });
  socket.on("next", function () {
    if (numbers.length > 0){
      next = numbers.shift();
      exist[next] = true;
      socket.emit("next", next);
      console.log("next: ", next);
    }
    else {
      socket.emit("overrun");
    }
  });
  socket.on("show", function() {
    io.sockets.emit("show", next);
  });
  socket.on("reset", function () {
    numbers = bingo.shuffled();
    exist = bingo.defaultResult();
    io.sockets.emit("initialize", exist);
  });
});
