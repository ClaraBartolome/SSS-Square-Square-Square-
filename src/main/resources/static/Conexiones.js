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

//Si cierras elimina un usuario
//window.onbeforeunload = function(e){cerrar();};

var socket; 

socket = new WebSocket("ws://localhost:8080/SSS")

socket.onopen = function(event) {
	  console.log("WebSocket is open now.");
	  let cmessage = {
				message : "HELLO_WORLD",
				text : "AH FILHO DE PUTA AGORA SEM ENTENDO"
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
	    		J1
	    		
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
	
	function Actualizar(){
		let message = {
	    		message: "ACTUALIZAR",
	    		id_J1,
	    		id_P,
	    		J1posX,
	    		J1posY
	    		
	    };
	    socket.send(JSON.stringify(message));
	    socket.onmessage = function(event){
			var o = JSON.parse(event.data);
			//console.log(o);
			if(o.Estado){
				J2posX = o.X_J2;
				J2posY = o.Y_J2;
				
				muertesTotales_on = o.Muertes;
			}
			
			
		}
	};
	
	function Comprobar(){
		let message = {
	    		message: "COMPROBAR",
	    		id_J1,
	    		id_P,
	    		
	    };
	    socket.send(JSON.stringify(message));
	    socket.onmessage = function(event){
			var o = JSON.parse(event.data);
			//console.log(o);
			partida = o.Estado;
			//console.log(partida);
			J2 = o.Piel;
		
			
			
		}
	};
	
	function Morir_Websockets(M){
		let message = {
	    		message: "MUERTE",
	    		id_J1,
	    		id_P,
	    		M
	    		
	    };
	    socket.send(JSON.stringify(message));
	    socket.onmessage = function(event){
			var o = JSON.parse(event.data);
						
		}
	}
	
    function Res_Websockets(){
		let message = {
	    		message: "N_RONDA",
	    		id_J1,
	    		id_P,
	    		
	    };
	    socket.send(JSON.stringify(message));
	    socket.onmessage = function(event){
			var o = JSON.parse(event.data);
			muertesTotales_on = 0;			
		}
	}
    function cerracion() {
		console.log("CLOSE");
		let kmessage = {
				message : "CLOSE",
				text : "Se cerro este socket"
			}

	  socket.send(JSON.stringify(kmessage));
	}    
	window.onbeforeunload = cerracion();

	
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