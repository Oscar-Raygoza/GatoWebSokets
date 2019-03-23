/*	EVALUACION */

module.exports = function(usuario_tablero){
	var combinaciones = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
	];

	var empate = [0,1,2,3,4,5,6,7,8];

for(var j = 0; j < combinaciones.length; j++){
	var combinacion = combinaciones[j];
	var gano = true;
		for(var i = 0; i < combinacion.length; i++){
			if (!isInArray(usuario_tablero,combinacion[i])) {
				gano = false;	
				break;
			}
		}
		if(gano){	return true; }
	}
		return false;
	}

function isInArray(arreglo,elemento){
	return arreglo.indexOf(elemento) > -1;
}
