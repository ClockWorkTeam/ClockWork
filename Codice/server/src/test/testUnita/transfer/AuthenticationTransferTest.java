package test.testUnita.transfer;

import static org.junit.Assert.*;

import org.junit.*;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.*;

import org.json.JSONObject;
import org.json.JSONTokener;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.api.WebSocketServer;
import org.jwebsocket.config.xml.EngineConfig;
import org.jwebsocket.connectors.BaseConnector;
import org.jwebsocket.engines.BaseEngine;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.*;

import server.ServerMyTalk;
import server.shared.Tutorials;
import server.shared.User;
import server.transfer.AuthenticationTransfer;
import server.transfer.UserTransfer;
import server.usermanager.AuthenticationManager;
import server.usermanager.UserManager;

public class AuthenticationTransferTest {
	private AuthenticationTransfer authenticationTransfer;

	class StubAuthenticationTransfer extends AuthenticationTransfer {
		public StubAuthenticationTransfer(AuthenticationManager authenticationManager, UserManager userManager, Tutorials tutorials) {
			super(authenticationManager, userManager, tutorials);
		}
		private WebSocketPacket packet;
		private WebSocketPacket packet_broadcast;
		
		private BaseConnector connector;
		
		public void setConnector(BaseConnector connector){
			this.connector=connector;
		}
		public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){
			this.packet=packet;
		}
		public void broadcast(WebSocketPacket packet, WebSocketConnector connector){
			this.packet_broadcast=packet;
		}
		public WebSocketPacket getResult(){return packet;}
		public WebSocketPacket getResult_broadcast(){return packet_broadcast;}
		
		public WebSocketConnector getUserConnector(String username){
			if(!connector.getUsername().equals(username)){
				return connector;
			}
		    return null;
		  }
		
	}
	
	class StubBaseConnector extends BaseConnector {

		public StubBaseConnector(WebSocketEngine aEngine) {
			super(aEngine);
		}
		
		public InetAddress getRemoteHost() {
			InetAddress ia=null;
			try {
				ia = InetAddress.getLocalHost();
			} catch (UnknownHostException e) {}
            return ia;
		}
		
		
	}
	
	class StubAuthenticationManager extends AuthenticationManager {
		public User login(String username, String password, String IP) throws Exception{
			if(username.equals("username_eccezione")){
				throw new Exception("errore di autenticazione");
			}
			return new User(username,"name","surname","10");
		}
		public User createUser(String username, String password, String name, String surname, String IP) throws Exception{
			if(username.equals("username_eccezione")){
				throw new Exception("errore registrazione");
			}
			return new User(username,"name","surname","IP");
		}
		
		public Vector<User> getAllContacts(String username){
			Vector<User> user=new Vector<User>();
			user.add(new User(username,"name","surname","IP"));
			user.add(new User(username,"name","surname","IP"));
			return user;	
		}
		
		public User logout(String username){
			return new User(username,"name","surname","IP");
		}
		
	}
	
	class StubTutorials extends Tutorials {
		public StubTutorials(int num) {
			super(num);
		}
	}
	
	class StubUserManager extends UserManager {
		public boolean checkPassword(String username, String password){
			if(password.equals("prova")){
				return true;
			}
			return false;
		}
		
		public User getUserData(String username){
			return new User("", "", "", "");
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
		authenticationTransfer=new StubAuthenticationTransfer(new StubAuthenticationManager(), new StubUserManager(), new StubTutorials(10));
	}
	
	@Test
	public void testProcessToken() throws Exception {
				
		//creazione del connector
		Vector<String> domains= new Vector<String>();
		domains.add("prova");
		Map<String, Object> aSettigns = new HashMap<String, Object>();
		aSettigns.put("prova", null);
		EngineConfig engineConfig=new EngineConfig("prova", "prova", "prova", 1024, 1024, "prova", "prova", "prova", "prova", 1024, 1024, domains, 1024, "prova", aSettigns);
		BaseEngine  baseEngine=new BaseEngine (engineConfig);
		BaseConnector connector=new StubBaseConnector(baseEngine);
		connector.setUsername("ClockWork7");
		((StubAuthenticationTransfer)authenticationTransfer).setConnector(connector);
		
		//creazione del server
		ServerMyTalk server = new ServerMyTalk();
		WebSocketServer aServer=server.getTokenServer();
		authenticationTransfer.setTokenServer(server);
		
		//creazione dell'evento da inviare
		WebSocketServerTokenEvent event=new WebSocketServerTokenEvent(connector, aServer);

		//******caso1: login corretto
		//creazione del token
		MapToken token = new MapToken();
		token=createToken("{\"type\":\"login\",\"username\":\"ClockWork7\",\"password\":\"prova\"}");
		
		authenticationTransfer.processToken(event, token);
		WebSocketPacket packet= ((StubAuthenticationTransfer)authenticationTransfer).getResult();
		WebSocketPacket packet_broadcast= ((StubAuthenticationTransfer)authenticationTransfer).getResult_broadcast();
		System.out.println(packet.getString() );
		System.out.println(packet_broadcast.getString() );
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"login\",\"answer\":\"true\", \"name\":\"name\", \"surname\":\"surname\"}"));
		assertTrue("Messaggio inviato sbagliato",packet_broadcast.getString().equals("{\"type\":\"getContacts\", \"size\": \"1\", \"username0\": \"ClockWork7\", \"name0\": \"name\", \"surname0\": \"surname\", \"IP0\": \"10\"}"));
		
		//******caso2: login con eccezione
		token=createToken("{\"type\":\"login\",\"username\":\"username_eccezione\",\"password\":\"prova\"}");
		connector.setUsername("username_eccezione");
		
		authenticationTransfer.processToken(event, token);
		packet= ((StubAuthenticationTransfer)authenticationTransfer).getResult();
		System.out.println(packet.getString() );
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"login\",\"answer\":\"false\",\"error\":\"errore di autenticazione\"}"));
		
		//******caso3: login già effettuato
		token=createToken("{\"type\":\"login\",\"username\":\"username\",\"password\":\"prova\"}");
		connector.setUsername("ClockWork7");
		
		authenticationTransfer.processToken(event, token);
		packet= ((StubAuthenticationTransfer)authenticationTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"login\",\"answer\":\"false\",\"error\":\"Utente autenticato su un altro dispositivo\"}"));

		//******caso4: signUp effettuato
		token=createToken("{\"type\":\"signUp\",\"username\":\"username\",\"password\":\"prova\",\"name\":\"name\",\"surname\":\"surname\"}");
		connector.setUsername("ClockWork7");
		
		authenticationTransfer.processToken(event, token);
		packet= ((StubAuthenticationTransfer)authenticationTransfer).getResult();
		packet_broadcast= ((StubAuthenticationTransfer)authenticationTransfer).getResult_broadcast();
		System.out.println(packet.getString());
		System.out.println(packet_broadcast.getString() );
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"signUp\",\"answer\":\"true\"}"));
		assertTrue("Messaggio inviato sbagliato",packet_broadcast.getString().equals("{\"type\":\"getContacts\", \"size\": \"1\", \"username0\": \"username\", \"name0\": \"name\", \"surname0\": \"surname\", \"IP0\": \"IP\"}"));
		
		//******caso5: signUp non effettuato
		token=createToken("{\"type\":\"signUp\",\"username\":\"username_eccezione\",\"password\":\"prova\",\"name\":\"name\",\"surname\":\"surname\"}");
		connector.setUsername("ClockWork7");
		
		authenticationTransfer.processToken(event, token);
		packet= ((StubAuthenticationTransfer)authenticationTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"signUp\",\"answer\":\"false\",\"error\":\"errore registrazione\"}"));
		
		//******caso5: getContacts
		token=createToken("{\"type\":\"getContacts\"}");
		connector.setUsername("ClockWork7");
		
		authenticationTransfer.processToken(event, token);
		packet= ((StubAuthenticationTransfer)authenticationTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"getContacts\", \"size\": \"2\", \"username0\": \"ClockWork7\", \"name0\": \"name\", \"surname0\": \"surname\", \"IP0\": \"IP\", \"username1\": \"ClockWork7\", \"name1\": \"name\", \"surname1\": \"surname\", \"IP1\": \"IP\"}"));
		
		

	}

}