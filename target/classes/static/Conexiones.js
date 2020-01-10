//peticion al servidor 

var pascua;

var id_J1 = -1;
var n = -1;
var id_J2 = -1;
var id_P = -1;
var Mu = false;
var NusuariosAct; //USUARIOSACTIVOS
var NusuariosJug = 0; //USUARIOSJUGANDO
var muertesTotales_on = 0;

var puntuacionJ1 = 0;
var puntuacionJ2 = 0;
//Si cierras elimina un usuario
//window.onbeforeunload = function(e){cerrar();};




var socket; 

socket = new WebSocket("ws://10.0.12.212:8080/SSS")

socket.onopen = function(event) {
	  console.log("WebSocket is open now.");
	  let cmessage = {
				message : "HELLO_WORLD",
				text : "WebSocket is open now."
			}

	  socket.send(JSON.stringify(cmessage))
	};

	socket.onmessage = function(event){
		
		console.log("tengo un mensaje")
		
	}

	//Esto en teoria controla cuando se cierra la conexion
	//var intervalo = setInterval(console.log("cosas"), 100);

	//jugador();
	
	function Nuevo_Jugador(){
		let message = {
	    		message: "NUEVA_PARTIDA",
	    		Nombre: J1
	    		
	    };
	    socket.send(JSON.stringify(message));
	    socket.onmessage = function(event){
			var o = JSON.parse(event.data);
			console.log(o.J1);
			console.log("Partida: " + o.Nueva_Partida);
			id_P = o.Nueva_Partida;
			console.log("Id Jug: " + o.Id_J);
			id_J1 = o.Id_J;
			n = o.N;
			console.log("Jugador: " + o.N);
			
		}
	};
	
function Actualizar() {
    let message = {
        message: "ACTUALIZAR",
        idjact: id_J1,
        idpact: id_P,
        J1posXact: J1posX,
        J1posYact: J1posY,
        J1velXact: J1velX,
        J1velYact: J1velY
    };
    socket.send(JSON.stringify(message));
    socket.onmessage = function (event) {
        var o = JSON.parse(event.data);
        //console.log(o);
        if (o.Estado) {
            J2posX = o.X_J2;
            J2posY = o.Y_J2;
            J2velX = o.velX_J2;
            J2velY = o.velY_J2;
            J2muerte = o.muerte;
            
            puntuacionJ1 = o.Pun_J1;
            puntuacionJ2 = o.Pun_J2;
        }else{
        	partida = o.estado;
        }
    }
};
	
function Comprobar() {
    let message = {
        message: "COMPROBAR",
        id_J1comp: id_J1,
        id_Pcomp: id_P,

    };
    socket.send(JSON.stringify(message));
    socket.onmessage = function (event) {
        var o = JSON.parse(event.data);
        //console.log(o);
        partida = o.Estado;
        if (o.Piel != undefined) {
            //console.log(partida);
            J2 = o.Piel;
        }
    }
};

function Comprobar_juego() {
    let message = {
        message: "COMPROBAR_JUEGO",
        id_J1comp: id_J1,
        id_Pcomp: id_P,

    };
    socket.send(JSON.stringify(message));
    socket.onmessage = function (event) {
        var o = JSON.parse(event.data);
        //console.log(o);
        partida = o.Estado;
        //console.log(partida);
    }
};

	
function Morir_Websockets(M) {
    let message = {
        message: "MUERTE",
        id_J1m: id_J1,
        id_Pm: id_P,
        Mm: M

    };
    socket.send(JSON.stringify(message));
    socket.onmessage = function (event) {
        var o = JSON.parse(event.data);

    }
}
	
function Res_Websockets() {
    let message = {
        message: "N_RONDA",
        id_J1ron: id_J1,
        id_Pron: id_P,

    };
    socket.send(JSON.stringify(message));
    socket.onmessage = function (event) {
        var o = JSON.parse(event.data);
        muertesTotales_on = 0;
    }
}

function exit() {
	console.log("CLOSE");
		cerracion();
		let message = {
				message : "CLOSE",
			}

	  socket.send(JSON.stringify(message));
	
	
}

function cerracion() {
	let message = {
    		message: "ENDGAME",
    		idjcer: id_J1,
    		idpcer: id_P,
    		
    };
    socket.send(JSON.stringify(message));
    socket.onmessage = function(event){
		var o = JSON.parse(event.data);
		id_J1 = -1;	
		id_J2 = -1;
		id_P = -1;
		partida = false;
}
}

window.onbeforeunload = function () {
	  exit();
	};

	
function usuarios(){}

function cerrar(){
	
	console.log(id_J);
	
	/*$.ajax( {        
        type: "DELETE",   
        url: "/cerrar/" + id,
        success: function (jugador) {
          //Devolver cosas el servidor       	
        	//console.log(jugador)
        	
        }
    }); */
	
	//alert(jugador);
}
/*
	function jugador(){
		$(document).ready(function(){
			$.ajax( {
				url: "/usuario" ,
		        type: "POST",
	        data: J1,
	        processData: false,
	        success: function (jugador) {
	          //Devolver cosas el servidor
	        	console.log(jugador);
	        	console.log(jugador.id)
	        	id = jugador.id;
	        	console.log(jugador.nombre)
	        	console.log(jugador.fechaLog)
		        }
			})
			
		})
	} 
	
	//Actualizar el num usuarios activos y jugando
	function usuarios(){
		
		$.ajax( {
	        url: "/usuariosActivos" ,
	        type: "GET",	        
	        success: function (cosas) {
	          //Devolver cosas el servidor
	        	NusuariosAct = cosas;
	        	//console.log(NusuariosAct);
	        }
	    });
		
		$.ajax( {
	        url: "/usuariosJugando" ,
	        type: "GET",	        
	        success: function (cosas) {
	          //Devolver cosas el servidor
	        	NusuariosJug = cosas;
	        	//console.log(NusuariosJug);
	        }
	    });
		
		
	}
	
	
	
function prueba(){
	$(document).ready(function(){
    $.ajax( {
        url: "/sss" ,
        type: "POST",
        success: function (data) {
          //Devolver cosas el servidor
        	NusuariosAct = data;
        	console.log(data);
        }
    }); 
    
    $.ajax( {
        url: "/sss" ,
        type: "GET",
        
        success: function (cosas) {
          //Devolver cosas el servidor
        	pascua = cosas;
        	//console.log(cosas)
        }
    });      
    
})
	
}
*/