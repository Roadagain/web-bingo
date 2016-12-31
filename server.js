const fs = require("fs");
const url = require("url");
const server = require("http").createServer(function(request, response) {
  const pathname = require("url").parse(request.url, true).pathname;

  let output;
  if (pathname === "/" || pathname === "/index.html"){
    response.writeHead(200, {"Content-Type": "text/html"});
    output = fs.readFileSync("./index.html", "utf-8");
  }
  else if (pathname === "/result.html"){
    response.writeHead(200, {"Content-Type": "text/html"});
    output = fs.readFileSync("./result.html", "utf-8");
  }
  else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    output = "Not found";
  }
  response.end(output);
}).listen(8080);
const io = require("socket.io").listen(server);


io.sockets.on("connection", function (socket) {
  socket.on("publish", function (data) {
    io.sockets.emit("publish", {value: data.value});
  });
});
