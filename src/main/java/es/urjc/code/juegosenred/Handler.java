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
					
					int idJ = ids.incrementAndGet();
					
					Jugador j = new Jugador(idJ , skin , session);					
					jugadores.put(session, j);
					// CREAMOS PARTIDA
					msg.put("Nueva_Partida", id);
					if(partidas.isEmpty()) { //SI NO HAY PARTIDAS CREAMOS UNA DIRECTAMENTE

							//Creamos todas las partidas
						for(int i = 0; i < 8; i ++) {
							Partida p = new Partida();
							partidas.put(i, p);
						};						
						//Añadimos nuestro jugador a la partida
						j.setn(1);
						Partida p = new Partida(id, j);					
						partidas.put(id, p);
						System.err.println(id);
						msg.put("Nombre", partidas.get(id).getJ1().toString());
						msg.put("Id_J", idJ);
						msg.put("N", partidas.get(id).getJ1().getn());
					}else {
						//Buscamos una partida vacia
						Iterator iterator = partidas.entrySet().iterator();
						boolean cont = false;
						while (iterator.hasNext() && cont == false) {
				             Map.Entry me2 = (Map.Entry) iterator.next();
									//Si la partida esta vacia añado J2
									if(!((Partida) me2.getValue()).estado()) { //SOMOS EL J1
										if(((Partida) me2.getValue()).getJ1() == null) {
											j.setn(1);
											((Partida) me2.getValue()).setJ1(j);
											msg.put("Nombre", partidas.get(me2.getKey()).getJ1().toString());
											msg.put("Id_J", idJ);
											msg.put("N", partidas.get(me2.getKey()).getJ1().getn());
											System.err.println(me2.getKey());
											if(((Partida) me2.getValue()).getJ2() != null) {
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
											System.err.println(me2.getKey());
											((Partida) me2.getValue()).SetEstado(true);
											cont = true;
											idp.getAndIncrement();
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
				Jugador J1 = partidas.get(idP).getJug(idJ1);
				
				if(partidas.get(idP).estado()) {
					int idJ2 = partidas.get(idP).getIdOtroJug(idJ1);
					J1.setPosX(X);
					J1.setPosY(Y);
					J1.setVelX(velX);
					J1.setVelY(velY);
					
					Jugador J2 = partidas.get(idP).getJug(idJ2);
					
					boolean cambiar = false;
					
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
				
				Jug.sendMessage(msg.toString());
				
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
				
				partidas.get(id_partida).getJug(idj).setM(false);
				partidas.get(id_partida).setMuertes(0);
				
				break;

		/*	case ("NEW_PLAYER"):
				if (jugadores.size() < N_PLAYERS  ) {
				String skin = node.get("skin").asText();
				int id = ids.incrementAndGet();
				
				Jugador j = new Jugador(id , skin , session);
				
				jugadores.put(session, j);
				
				msg.put("message", "UPDATE_ID");
				msg.put("id", id);
				
				j.sendMessage(msg.toString());
				
				
				}
				else {}
				break; */
				
			case ("CLOSE"):
				jugadores.remove(session);
				System.err.println("Cierre");
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