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
	private float velX;
	private float velY;
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
		this.velX = 0;
		this.velY = 0;
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
	public float getVelX() {	
		return this.velX;		
	}
	public float getVelY() {	
		return this.velY;		
	}
	public int getPuntuacion() {	
		return this.puntuacion;		
	}
	
	public void setPosX(float x) {	
		this.posX = x;		
	}
	public void setPosY(float y) {	
		this.posY = y;		
	}
	public void setVelX(float x) {	
		this.velX = x;		
	}
	public void setVelY(float y) {	
		this.velY = y;		
	}
	public void setn(int y) {	
		this.n = y;		
	}
	public void setM(boolean b) {	
		this.muerte = b;		
	}
	public void setPuntuacion(int p) {	
		this.puntuacion = p;		
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
		return "Jugador [id=" + id + ", name = " + name + ", muerte: " + muerte + ", Puntuacion: " + puntuacion + " ]";
	}
	
	synchronized void sendMessage(String msg) throws IOException {
		session.sendMessage(new TextMessage (msg));
	}


}



