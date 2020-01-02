package es.urjc.code.juegosenred;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;

public class Jugador {
	
	private int id; 	
	private String name;
	private LocalDateTime fechaLog;
	private WebSocketSession session;
	private int n; //Guarda si eres J1 o J2
	private float posX;
	private float posY;
	private int puntuacion;
	private boolean muerte;
	
	public Jugador () {}
	
	public Jugador(int id, String n , WebSocketSession s) {
		super();
		this.id = id; 
		this.name = n;
		this.fechaLog = LocalDateTime.now();
		this.session = s;
		this.n = 0;
		this.posX = 0;
		this.posY = 0;
		this.puntuacion = 0;
		this.muerte = false;
	}

	//la id la asigna al atomicint de la clase controller
	
	
	
	public int getId() {	
		return this.id;		
	}
	public int getn() {	
		return this.n;		
	}
	public boolean getM() {	
		return this.muerte;		
	}
	
	public float getPosX() {	
		return this.posX;		
	}
	public float getPosY() {	
		return this.posY;		
	}
	
	public void setPosX(float x) {	
		this.posX = x;		
	}
	public void setPosY(float y) {	
		this.posY = y;		
	}
	public void setn(int y) {	
		this.n = y;		
	}
	public void setM(boolean b) {	
		this.muerte = b;		
	}
	
	
	public WebSocketSession getSession() {
		return session;
	}

	public void setSession(WebSocketSession session) {
		this.session = session;
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
	
	synchronized void sendMessage(String msg) throws IOException {
		session.sendMessage(new TextMessage (msg));
	}


}



