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
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"call\", \"contact\":\""+ia.toString()+"\",\"callType\":\"callType\",\"conference\":\"conference\"}"));

		
		//******caso2: call attraverso contatto
		token=createToken("{\"type\":\"call\",\"contact\":\"ClockWork7\",\"callType\":\"callType\",\"conference\":\"conference\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"call\", \"contact\":\"ClockWork7\",\"callType\":\"callType\",\"conference\":\"conference\"}"));
		
		
		//******caso3: call con errore di connessione
		token=createToken("{\"type\":\"call\",\"contact\":\"contact\",\"callType\":\"callType\",\"conference\":\"conference\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente non connesso al server\"}"));
		
		//******caso4: answeredCall attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"answeredCall\",\"contact\":\""+ia.toString()+"\",\"conference\":\"conference\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"user\":\""+ia.toString()+"\", \"answer\":\"true\"}"));
		
		//******caso5: answeredCall attraverso contatto
		token=createToken("{\"type\":\"answeredCall\",\"contact\":\"ClockWork7\",\"conference\":\"conference\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"user\":\"ClockWork7\", \"answer\":\"true\"}"));
		
		//******caso6: refuseCall attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"refuseCall\",\"contact\":\""+ia.toString()+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Chiamata rifiutata\"}"));
		
		//******caso7: refuseCall attraverso contatto
		token=createToken("{\"type\":\"refuseCall\",\"contact\":\"ClockWork7\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Chiamata rifiutata\"}"));
		
		//******caso8: busy attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"busy\",\"contact\":\""+ia.toString()+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente occupato in un'altra conversazione\"}"));
		
		//******caso9: busy attraverso contatto
		token=createToken("{\"type\":\"busy\",\"contact\":\"ClockWork7\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente occupato in un'altra conversazione\"}"));
		
		//******caso10: refuseCam attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"refuseCam\",\"contact\":\""+ia.toString()+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente rifiuta di accendere la telecamera\"}"));
		
		//******caso11: refuseCam attraverso contatto
		token=createToken("{\"type\":\"refuseCam\",\"contact\":\"ClockWork7\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente rifiuta di accendere la telecamera\"}"));

		//******caso12: sdp attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		MapToken token2 = new MapToken();
		token2=createToken("{\"campo1\":\"desc1\", \"campo2\":\"desc2\"}");
		token=createToken("{\"type\":\"sdp\",\"contact\":\""+ia.toString()+"\",\"description\":\""+token2+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{campo2=desc2, campo1=desc1,\"contact\":\""+ia.toString()+"\"}"));
		
		//******caso13: sdp attraverso contatto
		token2=createToken("{\"campo1\":\"desc1\", \"campo2\":\"desc2\"}");
		token=createToken("{\"type\":\"sdp\",\"contact\":\"ClockWork7\",\"description\":\""+token2+"\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{campo2=desc2, campo1=desc1,\"contact\":\"ClockWork7\"}"));
		
		//******caso14: candidate attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token2 = new MapToken();
		token2=createToken("{\"campo1\":\"desc1\", \"campo2\":\"desc2\"}");
		token=createToken("{\"type\":\"candidate\",\"contact\":\""+ia.toString()+"\",\"candidate\":\""+token2+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{campo2=desc2, campo1=desc1,\"contact\":\""+ia.toString()+"\"}"));
		
		//******caso15: candidate attraverso contatto
		token2=createToken("{\"campo1\":\"desc1\", \"campo2\":\"desc2\"}");
		token=createToken("{\"type\":\"candidate\",\"contact\":\"ClockWork7\",\"candidate\":\""+token2+"\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{campo2=desc2, campo1=desc1,\"contact\":\"ClockWork7\"}"));
		
		//******caso16: endCall attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"endCall\",\"contact\":\""+ia.toString()+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"endCall\",\"contact\":\""+ia.toString()+"\"}"));
		
		//******caso17: endCall attraverso contatto
		token=createToken("{\"type\":\"endCall\",\"contact\":\"ClockWork7\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"endCall\",\"contact\":\"ClockWork7\"}"));
		
		//******caso18: candidateReady attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"candidateReady\",\"contact\":\""+ia.toString()+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"candidateReady\",\"contact\":\""+ia.toString()+"\"}"));
		
		//******caso19: candidateReady attraverso contatto
		token=createToken("{\"type\":\"candidateReady\",\"contact\":\"ClockWork7\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"candidateReady\",\"contact\":\"ClockWork7\"}"));
		
		//******caso20: endCallEarly attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"endCallEarly\",\"contact\":\""+ia.toString()+"\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"endCallEarly\",\"contact\":\""+ia.toString()+"\"}"));
		
		//******caso21: endCallEarly attraverso contatto
		token=createToken("{\"type\":\"endCallEarly\",\"contact\":\"ClockWork7\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"endCallEarly\",\"contact\":\"ClockWork7\"}"));
		
		//******caso22: addConferenceCaller attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"addConferenceCaller\",\"contact\":\""+ia.toString()+"\",\"user\":\"user\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"addConferenceCaller\", \"user\":\"user\"}"));
		
		//******caso23: addConferenceCaller attraverso contatto
		token=createToken("{\"type\":\"addConferenceCaller\",\"contact\":\"ClockWork7\",\"user\":\"user\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"addConferenceCaller\", \"user\":\"user\"}"));
		
		//******caso24: addConferenceAnswer attraverso indirizzo IP
		ia=InetAddress.getLocalHost();
		token=createToken("{\"type\":\"addConferenceAnswer\",\"contact\":\""+ia.toString()+"\",\"user\":\"user\"}");
		connector.setUsername(ia.toString());
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"addConferenceAnswer\", \"user\":\"user\"}"));
		
		//******caso25: addConferenceAnswer attraverso contatto
		token=createToken("{\"type\":\"addConferenceAnswer\",\"contact\":\"ClockWork7\",\"user\":\"user\"}");
		connector.setUsername("ClockWork7");
		
		callTransfer.processToken(event, token);
		packet= ((StubCallTransfer)callTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"addConferenceAnswer\", \"user\":\"user\"}"));	
	}
}