package server.transfer;

import static org.junit.Assert.*;

import org.glassfish.grizzly.websockets.WebSocketEngine;
import org.junit.*;

import java.io.UnsupportedEncodingException;
import java.util.*;

import javolution.util.FastMap;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.jwebsocket.api.EngineConfiguration;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.api.WebSocketServer;
import org.jwebsocket.config.xml.EngineConfig;
import org.jwebsocket.connectors.BaseConnector;
import org.jwebsocket.engines.BaseEngine;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.*;

import server.ServerMyTalk;
import server.usermanager.AuthenticationManager;
import server.usermanager.UserManager;

public class UserTransferTest {
	private UserTransfer userTransfer;

	class StubUserTransfer extends UserTransfer {
		public StubUserTransfer(UserManager userManager) {
			super(userManager);
			// TODO Auto-generated constructor stub
		}

		public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){}
	}
	
	
	@Before
	public void init() {
		userTransfer=new StubUserTransfer(new UserManager());
	}
	
	@Test
	public void test() throws Exception {
				
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

		//creazione del token
		MapToken token = new MapToken();
		String str = "{\"type\":\"checkCredentials\",\"password\":\"prova\"}";
		JSONTokener jsonTokener = new JSONTokener(str);
		JSONObject jsonObject = new JSONObject(jsonTokener);
		for (Iterator iterator = jsonObject.keys(); iterator.hasNext();) {
		  String key = (String) iterator.next();
		  String value = (String) jsonObject.get(key);
		  token.setString(key, value);
		}
		
		
		userTransfer.processToken(event, token);
	}

}
/*
//----WebSocketServerTokenEvent(org.jwebsocket.api.WebSocketConnector aConnector, org.jwebsocket.api.WebSocketServer aServer)
WebSocketConnector aConnector=getUserConnector("ClockWork7");
WebSocketServer aServer=tokenServer.getServer();
WebSocketServerTokenEvent event=new WebSocketServerTokenEvent(aConnector, aServer);
//
*/




/*
public static Token packetToToken(WebSocketPacket aDataPacket) {
    Token lToken = new Token();
    try {
            String lStr = aDataPacket.getString("UTF-8");
            JSONTokener jsonTokener = new JSONTokener(lStr);
            JSONObject jsonObject = new JSONObject(jsonTokener);
            for (Iterator lIterator = jsonObject.keys(); lIterator.hasNext();) {
                    String lKey = (String) lIterator.next();
                    lToken.put(lKey, jsonObject.get(lKey));
            }
    } catch (UnsupportedEncodingException ex) {
            // TODO: process exception
            // log.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
    } catch (JSONException ex) {
            // // TODO: process exception
            // log.error(ex.getClass().getSimpleName() + ": " + ex.getMessage());
    }
    return lToken;
}*/