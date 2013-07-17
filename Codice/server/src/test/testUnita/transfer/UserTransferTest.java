/**
* Nome: UserManagerTest
* Package: server.usermanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-------------------------------------------+
* | Data    | Programmatore |         Modifiche       					|
* +---------+---------------+-------------------------------------------+
* |  130306 |     ZHP       | + creazione documento	  					|
* |  130716 |     VF        | + creato testProcessToken           		|
* +---------+---------------+-------------------------------------------+
*
*/ 

package test.testUnita.transfer;

import static org.junit.Assert.*;

import org.junit.*;

import java.util.*;

import org.json.JSONObject;
import org.json.JSONTokener;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.api.WebSocketServer;
import org.jwebsocket.config.xml.EngineConfig;
import org.jwebsocket.connectors.BaseConnector;
import org.jwebsocket.engines.BaseEngine;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.*;

import server.ServerMyTalk;
import server.shared.User;
import server.transfer.UserTransfer;
import server.usermanager.UserManager;

public class UserTransferTest {
	private UserTransfer userTransfer;

	class StubUserTransfer extends UserTransfer {
		private WebSocketPacket packet;
		private WebSocketPacket packet_broadcast;
		public StubUserTransfer(UserManager userManager) {
			super(userManager);
			// TODO Auto-generated constructor stub
		}

		public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){
			this.packet=packet;
		}
		public void broadcast(WebSocketPacket packet, WebSocketConnector connector){
			this.packet_broadcast=packet;
		}
		public WebSocketPacket getResult(){return packet;}
		public WebSocketPacket getResult_broadcast(){return packet_broadcast;}
		
	}
	
	class StubUserManager extends UserManager {
		public boolean checkPassword(String username, String password){
			if(password.equals("prova")){
				return true;
			}
			return false;
		}
		
		public User getUserData(String username){
			return new User("username", "name", "surname", "IP");
		}
		public boolean setUserData(String username, String name, String surname) throws Exception{
			if(name.equals("name_errato") || surname.equals("surname_errato")){
				return false;
			}
			if(name.equals("eccezzione") && surname.equals("eccezzione")){
				throw new Exception("Username errato");
			}
			return true;
		}
		public boolean setPassword(String username, String password){
			if(password.equals("prova")){
				return true;
			}
			return false;
		}
		public void broadcast(WebSocketPacket p, WebSocketConnector c){
			
		}
		
	}
	
	//creazione del token
	public MapToken createToken(String str) throws Exception{
		MapToken token = new MapToken();
		JSONTokener jsonTokener = new JSONTokener(str);
		JSONObject jsonObject = new JSONObject(jsonTokener);
		for (Iterator iterator = jsonObject.keys(); iterator.hasNext();) {
		  String key = (String) iterator.next();
		  String value = (String) jsonObject.get(key);
		  token.setString(key, value);
		}
		return token;
	}
	
	@Before
	public void init() {
		userTransfer=new StubUserTransfer(new StubUserManager());
	}
	
	@Test
	public void testProcessToken() throws Exception {
				
		//creazione del connector
		Vector<String> domains= new Vector<String>();
		domains.add("prova");
		Map<String, Object> aSettigns = new HashMap<String, Object>();
		aSettigns.put("prova", null);
		//EngineConfig e=new EngineConfig(String aId, String aName, String aJar, Integer aPort, Integer aSSLPort, String aKeyStore, String aKeyStorePassword, String aContext, String aServlet, int aTimeout, int aMaxFrameSize, List<String> aDomains, Integer aMaxConnections, String aOnMaxConnectionsStrategy, Map<String, Object> aSettigns)
		EngineConfig engineConfig=new EngineConfig("prova", "prova", "prova", 1024, 1024, "prova", "prova", "prova", "prova", 1024, 1024, domains, 1024, "prova", aSettigns);
		BaseEngine  baseEngine=new BaseEngine (engineConfig);
		BaseConnector connector=new BaseConnector(baseEngine);
		connector.setUsername("ClockWork7");
		
		//creazione del server
		ServerMyTalk server = new ServerMyTalk();
		WebSocketServer aServer=server.getTokenServer();
		userTransfer.setTokenServer(server);
		
		//creazione dell'evento da inviare
		WebSocketServerTokenEvent event=new WebSocketServerTokenEvent(connector, aServer);

		//******caso1: checkCredentials con dati corretti
		//creazione del token
		MapToken token = new MapToken();
		token=createToken("{\"type\":\"checkCredentials\",\"password\":\"prova\"}");
		
		userTransfer.processToken(event, token);
		WebSocketPacket packet= ((StubUserTransfer)userTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"checkCredentials\",\"answer\":\"true\"}"));
		
		//******caso2: checkCredentials con dati errati
		token=createToken("{\"type\":\"checkCredentials\",\"password\":\"prova2\"}");
		
		userTransfer.processToken(event, token);
		packet= ((StubUserTransfer)userTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"checkCredentials\",\"answer\":\"false\"}"));
		
		//******caso3: changeData con dati corretti
		token=createToken("{\"type\":\"changeData\",\"password\":\"prova\",\"name\":\"name\",\"surname\":\"surname\"}");
		
		userTransfer.processToken(event, token);
		packet= ((StubUserTransfer)userTransfer).getResult();
		WebSocketPacket packet_broadcast= ((StubUserTransfer)userTransfer).getResult_broadcast();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"changeData\",\"answer\":\"true\"}"));
		assertTrue("Messaggio inviato sbagliato",packet_broadcast.getString().equals("{\"type\":\"getContacts\", \"size\": \"1\", \"username0\": \"username\", \"name0\": \"name\", \"surname0\": \"surname\", \"IP0\": \"IP\"}"));
		
		//******caso4: changeData con nome errato
		token=createToken("{\"type\":\"changeData\",\"password\":\"prova\",\"name\":\"name_errato\",\"surname\":\"surname\"}");
		
		userTransfer.processToken(event, token);
		packet= ((StubUserTransfer)userTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"changeData\",\"answer\":\"false\",\"error\":\"Errore nell'operazione di modifica del nome e del cognome\"}"));
		
		//******caso5: changeData con cognome errato
		token=createToken("{\"type\":\"changeData\",\"password\":\"prova\",\"name\":\"name\",\"surname\":\"surname_errato\"}");
		
		userTransfer.processToken(event, token);
		packet= ((StubUserTransfer)userTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"changeData\",\"answer\":\"false\",\"error\":\"Errore nell'operazione di modifica del nome e del cognome\"}"));
		
		//******caso6: changeData con nome e cognome errati
		token=createToken("{\"type\":\"changeData\",\"password\":\"prova\",\"name\":\"name_errato\",\"surname\":\"surname_errato\"}");
		
		userTransfer.processToken(event, token);
		packet= ((StubUserTransfer)userTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"changeData\",\"answer\":\"false\",\"error\":\"Errore nell'operazione di modifica del nome e del cognome\"}"));
		
		//******caso7: changeData con eccezzione
		token=createToken("{\"type\":\"changeData\",\"password\":\"prova\",\"name\":\"eccezzione\",\"surname\":\"eccezzione\"}");
		
		userTransfer.processToken(event, token);
		packet= ((StubUserTransfer)userTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"changeData\",\"answer\":\"false\",\"error\":\"Username errato\"}"));
	}

}