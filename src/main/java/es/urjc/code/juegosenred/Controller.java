package es.urjc.code.juegosenred;

import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

//Cuando api rest devuelve una clase , spring se encarga de devolverla como json
//  devuelvo jugador ,   var id = jugador.id 

	
//Mapping para metodo post 
	private AtomicInteger ids = new AtomicInteger(); //NUMERO TOTAL DE JUGADORES
	private AtomicInteger idU = new AtomicInteger(); //ID JUG
	private AtomicInteger idj = new AtomicInteger(); //NUMERO DE PARTIDAS
	private ConcurrentHashMap <Integer , Jugador > jugadores = new ConcurrentHashMap<Integer , Jugador>();
	
	/*
	//CREAR USUARIO NUEVO
	@PostMapping("/sss")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<AtomicInteger> crearJugador() {		
		System.err.println("postmapping " + ids.incrementAndGet());
		return new ResponseEntity<>(ids, HttpStatus.OK);
	}
	*/
	
	@PostMapping("/sss")
	@ResponseStatus(HttpStatus.CREATED)
	public int crearJugador() {

		System.err.println("postmapping" + ids.incrementAndGet());
		return ids.get();
	}
	
	//CREAR JUGADOR ACTIVO
	@PostMapping("/usuario")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Jugador> crearJugadorN(@RequestBody String nombre) {		
		Jugador jugador = new Jugador(idU.incrementAndGet(), nombre);
		idj.incrementAndGet();
		jugadores.put( jugador.getId() , jugador );
		System.err.println("postmapping");		
		return  new ResponseEntity<>(jugador, HttpStatus.OK);
	} 
	
	
	//Borrar usuario al cerrar la ventana desde el juego
		@DeleteMapping(value = "/cerrar/{id}")
		@ResponseStatus(HttpStatus.CREATED)
		public ResponseEntity<AtomicInteger> borrarJugador(@PathVariable String id) {	
			
			AtomicInteger idAux = ids;
			Integer number = Integer.parseInt(id);
			//AtomicInteger number2 = new AtomicInteger(number);
			
			if(ids.get() > 0) {
				if(jugadores.containsKey(number) && idj.get() > 0) {
					idj.decrementAndGet();
					System.err.println("borrar");
				}	
				jugadores.remove(number);
				ids.decrementAndGet();
				System.err.println("Deletemapping");
				System.err.println(jugadores.containsKey(number));
				return new ResponseEntity<AtomicInteger>(ids, HttpStatus.OK );
			}else {
				return new ResponseEntity<AtomicInteger>(idAux, HttpStatus.OK );
			}
						
		}
			
	
	
	@PutMapping("/sss")
	public ResponseEntity<Jugador> actualizarJugador(@RequestBody Jugador jugador) {		
		System.err.println("Putmapping");	
		Jugador j = jugadores.get(jugador.getId());							
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	//Mapping para metodo get 
	@GetMapping("/sss")
	public ResponseEntity<String> getmapping() {		
		System.err.println("getmapping");
		String n = "Esto es una prueba";
		return new ResponseEntity<>(n, HttpStatus.OK);
	}	
	
	//USUARIOS ACTIVOS
	@GetMapping("/usuariosActivos")
	public ResponseEntity<AtomicInteger> usAct() {		
		
		return new ResponseEntity<>(ids, HttpStatus.OK);
	}
	
	//USUARIOS JUGANDO
	@GetMapping("/usuariosJugando")
	public ResponseEntity<AtomicInteger> usJug() {		
		
		return new ResponseEntity<>(idj, HttpStatus.OK);
	}
	
	
	
}

