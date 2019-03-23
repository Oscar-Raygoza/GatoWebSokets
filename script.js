/*  SERVIDOR  */


var express = require("express");
var http = require("http");
var app = require("./socket_express");

app.use("/static",express.static("Public"))
app.get("/",function(req,res){
  res.sendFile("index.html",{"root": __dirname});
});

var server = http.createServer(app);

app.io.attach(server);

server.listen(3000);
