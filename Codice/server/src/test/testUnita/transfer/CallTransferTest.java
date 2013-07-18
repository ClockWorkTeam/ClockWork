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
* |  130718 |     VF        | + creato testProcessToken           		|
* +---------+---------------+-------------------------------------------+
*
*/

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
import server.transfer.CallTransfer;
import server.transfer.ChatTransfer;

public class CallTransferTest {
	private CallTransfer callTransfer;

	class StubCallTransfer extends CallTransfer {
		private WebSocketPacket packet;
		private BaseConnector connector;
		
		public void setConnector(BaseConnector connector){
			this.connector=connector;
		}

		public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){
			this.packet=packet;
		}
		
		public WebSocketPacket getResult(){return packet;}
		
		public WebSocketConnector getUserConnector(String username){
			if(connector.getUsername().equals(username)){
				return connector;
			}
		    return null;
		}
		public WebSocketConnector getIpConnector(String ip){
			if(connector.getUsername().equals(ip)){
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
		callTransfer=new StubCallTransfer();
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
		BaseConnector connector=new StubBaseConnector(baseEngine);
		connector.setUsername("ClockWork7");
		((StubCallTransfer)callTransfer).setConnector(connector);
		
		//creazione del server
		ServerMyTalk server = new ServerMyTalk();
		WebSocketServer aServer=server.getTokenServer();
		callTransfer.setTokenServer(server);
		
		//creazione dell'evento da inviare
		WebSocketServerTokenEvent event=new WebSocketServerTokenEvent(connector, aServer);

		//******caso1: call attraverso indirizzo IP
		//creazione del token
		MapToken token = new MapToken();
		InetAddress ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"call\",\"contact\":\""+ia.toString()+"\",\"callType\":\"callType\",\"conference\":\"conference\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		WebSocketPacket packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"call\", \"contact\":\""+ia.toString()+"\",\"callType\":\"callType\",\"conference\":\"conference\"}"));

		
		//******caso2: call attraverso contatto
		token=createToken("{\"type\":\"call\",\"contact\":\"ClockWork7\",\"callType\":\"callType\",\"conference\":\"conference\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"call\", \"contact\":\"ClockWork7\",\"callType\":\"callType\",\"conference\":\"conference\"}"));
		
		
		//******caso3: call con errore di connessione
		token=createToken("{\"type\":\"call\",\"contact\":\"contact\",\"callType\":\"callType\",\"conference\":\"conference\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente non connesso al server\"}"));
		
		//******caso4: answeredCall attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"answeredCall\",\"contact\":\""+ia.toString()+"\",\"conference\":\"conference\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"user\":\""+ia.toString()+"\", \"answer\":\"true\"}"));
		
		//******caso5: answeredCall attraverso contatto
		token=createToken("{\"type\":\"answeredCall\",\"contact\":\"ClockWork7\",\"conference\":\"conference\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"user\":\"ClockWork7\", \"answer\":\"true\"}"));
		
		//******caso6: refuseCall attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"refuseCall\",\"contact\":\""+ia.toString()+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Chiamata rifiutata\"}"));
		
		//******caso7: refuseCall attraverso contatto
		token=createToken("{\"type\":\"refuseCall\",\"contact\":\"ClockWork7\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Chiamata rifiutata\"}"));
		
		//******caso8: busy attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"busy\",\"contact\":\""+ia.toString()+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente occupato in un'altra conversazione\"}"));
		
		//******caso9: busy attraverso contatto
		token=createToken("{\"type\":\"busy\",\"contact\":\"ClockWork7\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		System.out.println(packet.getString());
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente occupato in un'altra conversazione\"}"));


		
	}
}