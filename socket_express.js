/*socket_express*/

var express = require("express");
var socket_io = require("socket.io");
var evaluacion = require("./evaluacion");

var app = express();
var io = socket_io();
var posicion_ocupada = {};
var turno = true;
var figura = true;
app.io = io;

io.on("connection",function (socket){
	posicion_ocupada = {};
	socket.broadcast.emit("reset",{});
	console.log("Se conecto un nuevo usuario");
	socket.emit("init", {figura:figura});
	socket.usuario_tablero = [];
	socket.figura = figura;

	figura = !figura;

	socket.on("nuevo_movimiento",function(data){

		if(!posicion_ocupada[data.posicion]){
			if(turno == socket.figura){
			socket.usuario_tablero.push(parseInt(data.posicion));
		posicion_ocupada[data.posicion] = true;
		io.emit("alguien_tiro",{posicion: data.posicion,figura:socket.figura});
		var evaluacion_de_tablero = evaluacion(socket.usuario_tablero);
		console.log("Resultado "+ evaluacion_de_tablero+ " tablero: "+socket.usuario_tablero);
		if(evaluacion_de_tablero){
			console.log("alguien gano");
			io.emit("win",{figura: socket.figura});
			}
			turno = !turno;
		}else{
			socket.emit("no_te_toca",{});
		}
	}
		else
		{
			console.log("tampa");
		}
		
	});
});



module.exports = app;