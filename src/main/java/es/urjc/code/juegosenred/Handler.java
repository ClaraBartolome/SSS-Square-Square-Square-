package es.urjc.code.juegosenred;


import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class Handler extends TextWebSocketHandler {

	private ObjectMapper mapper; 
	private ConcurrentHashMap <WebSocketSession ,Jugador > jugadores = new ConcurrentHashMap <WebSocketSession, Jugador>();
	private ConcurrentHashMap <Integer ,Partida > partidas = new ConcurrentHashMap <Integer ,Partida>();
	private AtomicInteger ids = new AtomicInteger();
	private AtomicInteger idp = new AtomicInteger();
	private int N_PLAYERS  = 8; 
	private int N_PARTIDAS  = 4; 
	
	
	
	public Handler() {
		
		mapper = new ObjectMapper();

	}
	

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		
	}


	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		
		try {
			JsonNode node = mapper.readTree(message.getPayload());

			ObjectNode msg = mapper.createObjectNode();
			switch (node.get("message").asText()) {
			
			case("HELLO_WORLD"):
				System.err.println(node.get("text").asText());
				
				msg.put("message", "HELLO_WORLD");
				session.sendMessage(new TextMessage (msg.toString()));
				
				break;
				
			case("CERRANDO"):
				System.err.println(node.get("text").asText());				
				break;
					
				
			case("NUEVA_PARTIDA"):
					int id = idp.get();
					
					if(id < N_PARTIDAS) {
					msg.put("message", "NUEVA_PARTIDA");

					//CREAMOS UN NUEVO JUGADOR
					String skin = node.get("Nombre").asText();
					System.err.println(node.get("Nombre").asText());
					Jugador j = new Jugador();
					int idJ;
					
					
					 idJ = ids.incrementAndGet();
					
					j = new Jugador(idJ , skin , session);					
					jugadores.put(session, j);
					
					// CREAMOS PARTIDA
					
					if(partidas.isEmpty()) { //SI NO HAY PARTIDAS CREAMOS UNA DIRECTAMENTE
						msg.put("Nueva_Partida", 0);
							//Creamos todas las partidas
						for(int i = 0; i < 8; i ++) {
							Partida p = new Partida();
							partidas.put(i, p);
						};						
						//Añadimos nuestro jugador a la partida
						j.setn(1);
						Partida p = new Partida(id, j);					
						partidas.put(id, p);
						System.err.println("Nueva Partida: " + id);
						
						msg.put("Nombre", partidas.get(id).getJ1().toString());
						msg.put("Id_J", idJ);
						msg.put("N", partidas.get(id).getJ1().getn());
					}else {
						//Buscamos una partida vacia
						Iterator iterator = partidas.entrySet().iterator();
						boolean cont = false;											
						
						while (iterator.hasNext() && cont == false) {
				             Map.Entry me2 = (Map.Entry) iterator.next();
									//Si la partida esta vacia añado J1
									if(!((Partida) me2.getValue()).estado()) { //SOMOS EL J1
										if(((Partida) me2.getValue()).getJ1() == null) {
											j.setn(1);
											((Partida) me2.getValue()).setJ1(j);
											msg.put("Nombre", partidas.get(me2.getKey()).getJ1().toString());
											msg.put("Id_J", idJ);
											msg.put("N", partidas.get(me2.getKey()).getJ1().getn());
											msg.put("Nueva_Partida", partidas.get(me2.getKey()).getId());
											System.err.println(me2.getKey());
											if(((Partida) me2.getValue()).getJ2() != null) {
												System.err.println("Nueva partida: " + partidas.get(me2.getKey()).getId());
												System.err.println("J1: " + partidas.get(me2.getKey()).getJ1());
												System.err.println("J2: " + partidas.get(me2.getKey()).getJ2());
												((Partida) me2.getValue()).SetEstado(true);
											}
											cont = true;
											
										}else{ //SOMOS EL J2
											j.setn(2);
											((Partida) me2.getValue()).setJ2(j);
											msg.put("Nombre", partidas.get(me2.getKey()).getJ1().toString());
											msg.put("J2", partidas.get(me2.getKey()).getJ2().toString());
											msg.put("N", partidas.get(me2.getKey()).getJ2().getn());
											msg.put("Id_J", idJ);
											msg.put("Nueva_Partida", partidas.get(me2.getKey()).getId());
											((Partida) me2.getValue()).SetEstado(true);
											cont = true;
											idp.getAndIncrement();
											System.err.println("Nueva partida: " + partidas.get(me2.getKey()).getId());
											System.err.println("J1: " + partidas.get(me2.getKey()).getJ1());
											System.err.println("J2: " + partidas.get(me2.getKey()).getJ2());
										}
										
									}	
				        }
						
						
						
						
						};
						
						
					
					j.sendMessage(msg.toString());
					
					break;
					
				}else {break;}
						
			//RECIBE LA POSICION DEL JUGADOR, LA CAMBIA EN EL SERVIDOR Y DEVUELVE LA POSICION DEL JUGADOR 2		
			case ("ACTUALIZAR"):

				int idP = node.get("idpact").asInt();
				int idJ1 = node.get("idjact").asInt();
				float X = node.get("J1posXact").asInt();
				float Y = node.get("J1posYact").asInt();
				float velX = node.get("J1velXact").asInt();
				float velY = node.get("J1velYact").asInt();
				
				if(partidas.get(idP).getJug(idJ1) != null) {
					Jugador J1 = partidas.get(idP).getJug(idJ1);
				
				
				if(partidas.get(idP).estado()) {
					 
					int idJ2 = partidas.get(idP).getIdOtroJug(idJ1);
					J1.setPosX(X);
					J1.setPosY(Y);
					J1.setVelX(velX);
					J1.setVelY(velY);
					
					Jugador J2 = partidas.get(idP).getJug(idJ2);
					
					if(J1.getM()) {
						J2.setPuntuacion(J2.getPuntuacion() + 1);
						J1.setM(false);
					}else if(J2.getM()) {
						J1.setPuntuacion(J1.getPuntuacion() + 1);
						J2.setM(false);
					}
					
					msg.put("X_J2", partidas.get(idP).getJug(idJ2).getPosX());
					msg.put("Y_J2", partidas.get(idP).getJug(idJ2).getPosY());
					msg.put("velX_J2", partidas.get(idP).getJug(idJ2).getVelX());
					msg.put("velY_J2", partidas.get(idP).getJug(idJ2).getVelY());
					msg.put("muerte", partidas.get(idP).getJug(idJ2).getM());
					
					msg.put("Pun_J1", J1.getPuntuacion());
					msg.put("Pun_J2", J2.getPuntuacion());
					
					msg.put("Estado", partidas.get(idP).estado());
				}else{
					
					msg.put("Estado", partidas.get(idP).estado());
				} 
				
				
				J1.sendMessage(msg.toString());
				
				}
				break;	
				
				//RECIBE LA ID DE UNA PARTIDA Y DE UN JUGADOR Y DEVUELVE SI ESTA LLENA	
			case ("COMPROBAR"):
				int id_par = node.get("id_Pcomp").asInt();
				int id1 = node.get("id_J1comp").asInt();
				
				Jugador Jug = partidas.get(id_par).getJug(id1);
				
				msg.put("Estado", partidas.get(id_par).estado());
				
				if(partidas.get(id_par).estado()) {
					
					int id2 = partidas.get(id_par).getIdOtroJug(id1);
					
					msg.put("Piel", partidas.get(id_par).getJug(id2).getnombre());					
				} 
				if(Jug != null) {
					Jug.sendMessage(msg.toString());
				}
				
				
				break;	
				
				
			case ("MUERTE"):
				int id_p = node.get("id_Pm").asInt();
				int idj1 = node.get("id_J1m").asInt();
				Boolean muerte = node.get("Mm").asBoolean();
				
				Jugador J_1 = partidas.get(id_p).getJug(idj1);
				
				partidas.get(id_p).getJug(idj1).setM(muerte);
				
				J_1.sendMessage(msg.toString());
				
				break;
			
			case("N_RONDA"):
				int id_partida = node.get("id_Pron").asInt();
				int idj = node.get("id_J1ron").asInt();
				if(partidas.get(id_partida).getJug(idj) != null) {
					partidas.get(id_partida).getJug(idj).setM(false);
					partidas.get(id_partida).setMuertes(0);
				}
				
				
				break;

			case ("CLOSE"):
				jugadores.remove(session);
				System.err.println("Cierre");
				break;
			
			case ("ENDGAME"):
				//recibe la id del jugador y de la partida y borra el jugador de la partida
				int id_part = node.get("idpcer").asInt();
				int id_j = node.get("idjcer").asInt();
				
				if(id_part != -1 && id_j != -1) {
					System.err.println("Partida cerrada");
					Jugador J1_aux = partidas.get(id_part).getJ1();
					Jugador J2_aux = partidas.get(id_part).getJ2();
					System.err.println("J1: " + J1_aux );
					System.err.println("J2: " + J2_aux);
					
					
					
					if(J1_aux != null) {
						if(J1_aux.getId() == id_j) {
							partidas.get(id_part).setJ1(null);
							partidas.get(id_part).SetEstado(false);
							partidas.get(id_part).setMuertes(0);
						}
						
					}
					if(J2_aux != null) {
						if(J2_aux.getId() == id_j) {
						partidas.get(id_part).setJ2(null);
						partidas.get(id_part).SetEstado(false);
						partidas.get(id_part).setMuertes(0);
						}
					}
					System.err.println("Partida cerrada: ");
					System.err.println("J1: " + partidas.get(id_part).getJ1() );
					System.err.println("J2: " + partidas.get(id_part).getJ2());
					
						
					}
										
				
				
			
				break;
			default:

				break;

			}
		} catch (Exception e) {
			System.err.println("Exception processing message " + message.getPayload());
			e.printStackTrace(System.err);
		}

	}
}