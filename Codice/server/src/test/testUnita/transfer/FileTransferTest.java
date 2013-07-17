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
* |  130717 |     VF        | + creato testProcessToken           		|
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
import server.transfer.FileTransfer;

public class FileTransferTest {
	private FileTransfer fileTransfer;

	class StubFileTransfer extends FileTransfer {
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
		fileTransfer=new StubFileTransfer();
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
		((StubFileTransfer)fileTransfer).setConnector(connector);
		
		//creazione del server
		ServerMyTalk server = new ServerMyTalk();
		WebSocketServer aServer=server.getTokenServer();
		fileTransfer.setTokenServer(server);
		
		//creazione dell'evento da inviare
		WebSocketServerTokenEvent event=new WebSocketServerTokenEvent(connector, aServer);

		//******caso1: file con utente connesso
		//creazione del token
		MapToken token = new MapToken();
		token=createToken("{\"type\":\"file\",\"file\":\"file\",\"contact\":\"ClockWork7\"}");
		
		fileTransfer.processToken(event, token);
		WebSocketPacket packet= ((StubFileTransfer)fileTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"file\", \"file\":\"file\", \"contact\":\"ClockWork7\"}"));
		
		//******caso2: file con utente non connesso
		token=createToken("{\"type\":\"file\",\"file\":\"file\",\"contact\":\"username\"}");
		
		fileTransfer.processToken(event, token);
		packet= ((StubFileTransfer)fileTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"fileRefused\", \"error\":\"L'utente non risulta connesso al server\", \"contact\":\"username\"}"));
		
		//******caso3: fileRefused
		token=createToken("{\"type\":\"refuseFile\",\"contact\":\"ClockWork7\"}");
		
		fileTransfer.processToken(event, token);
		packet= ((StubFileTransfer)fileTransfer).getResult();
		assertTrue("Messaggio inviato sbagliato",packet.getString().equals("{\"type\":\"fileRefused\", \"error\":\"L'utente ha rifiutato il file\", \"contact\":\"ClockWork7\"}"));
	}
}