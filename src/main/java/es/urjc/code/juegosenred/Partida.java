package es.urjc.code.juegosenred;

import java.time.LocalDateTime;

import org.springframework.web.socket.WebSocketSession;

public class Partida {
	
	private int id;
	private Jugador J1; 
	private Jugador J2;
	private Boolean Empty;
	
	public Partida () {
		this.id = 0;
		this.J1 = null;
		this.J2 = null;
		this.Empty = false;
		
	}
	
	public Partida(int id, Jugador uno) {
		super();
		this.id = id; 
		this.J1 = uno;
		this.Empty = false;
	}
	
	//GETTERS
	public int getId() {
		return this.id;
	}
	public Jugador getJ1() {
		return this.J1;
	}
	public Jugador getJ2() {
		return this.J2;
	}
	public Boolean estado() {
		return this.Empty;
	}
	
	public Jugador getJug(int id) {	
		if(this.J1.getId() == id) {
			return this.J1;
		}
		if(this.J2.getId() == id) {
			return this.J2;
		}
		else {
			return null;
		}
	}
	
	public int getIdOtroJug(int id) {	
		if(this.J1.getId() == id) {
			return this.J2.getId();
		}
		if(this.J2.getId() == id) {
			return this.J1.getId();
		}
		else {
			return -1;
		}
	}
	
	
	
	//SETTERS
	public void SetId(int x) {
		this.id = x;
	}
	public void setJ1(Jugador J) {
		this.J1 = J;
	}
	public void setJ2(Jugador J) {
		this.J2 = J;
	}
	public void SetEstado(Boolean e) {
		this.Empty = e;
	}
	
	
}
