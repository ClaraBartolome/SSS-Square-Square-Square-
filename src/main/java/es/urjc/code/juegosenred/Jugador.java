package es.urjc.code.juegosenred;

import java.time.LocalDateTime;

public class Jugador {
	
	private int id; 	
	private String name;
	private LocalDateTime fechaLog;
	
	public Jugador () {}
	
	public Jugador(int id, String n ) {
		super();
		this.id = id; 
		this.name = n;
		this.fechaLog = LocalDateTime.now();
	}

	//la id la asigna al atomicint de la clase controller
	public int getId() {	
		return this.id;		
	}
	
	public LocalDateTime getfechaLog() {	
		return this.fechaLog;		
	}
	
	public String getnombre() {	
		return this.name;		
	}
	
	public String toString() {
		return "Jugador [id=" + id + ", name = " + name + " ]";
	}


}
