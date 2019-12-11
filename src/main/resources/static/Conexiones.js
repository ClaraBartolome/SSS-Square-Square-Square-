//peticion al servidor 

var pascua;

var id = 0;
var NusuariosAct; //USUARIOSACTIVOS
var NusuariosJug = 0; //USUARIOSJUGANDO

//Si cierras elimina un usuario
window.onbeforeunload = function(e){cerrar();};
	
	
function cerrar(){
	
	console.log(id);
	
	$.ajax( {        
        type: "DELETE",   
        url: "/cerrar/" + id,
        success: function (jugador) {
          //Devolver cosas el servidor       	
        	//console.log(jugador)
        	
        }
    });
	
	//alert(jugador);
}

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
