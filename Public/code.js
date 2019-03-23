/*
 true  => X
 false => O
*/
(function (){


function $(selector){
  return document.querySelector(selector);
}

function convertir_a_figura(bandera){
if(bandera){
  return "X";
}
return "O";
}

function definir_eventos(){
  var elements = document.querySelectorAll(".cat-element")
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    element.addEventListener("click",function(){
        var posicion = this.id.split("-")[1];
        socket.play(posicion);
    });
  }
}

function reset(){

   var elements = document.querySelectorAll(".cat-element")
  for (var i = 0; i < elements.length; i++) {
    elements[i].innerHTML = "";
  }
}
function build_cat(){
  for (var i = 0; i < 9; i++) {
      var item = build_item(i);

      $("#cat").innerHTML += item;
  }
  definir_eventos();
}

function build_item(i){
  return "<div class='cat-element col-xs-4' id='elemento-"+i+"'></div>"
}

build_cat();

var socket = new Socket(function (figura){
  var figura_win = (figura == true) ? "X":"O";
  swal("\""+figura_win+ "\"" + " Gano la partida","Reiniciaremos el tablero");
  reset();
  },function (posicion,figura){
    $("#message").innerHTML = "Es turno de las "+convertir_a_figura(!figura);
    $("#elemento-"+posicion).innerHTML = convertir_a_figura(figura);

},function(){
swal("Alguien ingreso","Reiniciaremos el tablero");
reset();
},function(){
  swal("No es tu turno :(!", "!!Pillo!!", "error");
},function (figura){
  $("#message").innerHTML = "juegas con la "+ figura;
  if(figura == "X"){
       $("#message").innerHTML += "<br> Ea tu turno";
  }
  else
  {
      $("#message").innerHTML += "<br> No es tu turno";
  }
}, function(empato){
  swal("Empatamos :) ", "Segue Jugando","warning");
  reset();
});


})();
