package server.transfer;

import java.util.logging.Level;
import java.util.logging.Logger;
import org.jwebsocket.api.WebSocketClientEvent;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.client.token.BaseTokenClient;
import org.jwebsocket.api.WebSocketClientListener;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.kit.WebSocketException;
import org.jwebsocket.packetProcessors.JSONProcessor;
import org.jwebsocket.token.Token;
 
/**
 *
 * @author lucas_j
 */
public class StandaloneJWebSocketJavaClient implements WebSocketClientListener {
 
    public static void main(String[] args) {
        StandaloneJWebSocketJavaClient c = new StandaloneJWebSocketJavaClient();
        BaseTokenClient client = new BaseTokenClient();
        client.addListener(c);
        try {
            client.open("ws://localhost:8787/jWebSocket");
        } catch (WebSocketException ex) {
            Logger.getLogger(StandaloneJWebSocketJavaClient.class.getName()).log(Level.SEVERE, null, ex);
        }
        try {
            client.login(null, null);
        } catch (WebSocketException ex) {
            Logger.getLogger(StandaloneJWebSocketJavaClient.class.getName()).log(Level.SEVERE, null, ex);
        }
        for (int i = 0; i < 30; i++) {
            try {
                // wait for 3 seconds, then move to next slide
                Thread.sleep(3000);
              //  c.sendPacket(client, i % 5 + 1); // slides 1..5, then back to 1
            } catch (InterruptedException ex) {
            }
        }
    }

	@Override
	public void processClosed(WebSocketClientEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processOpened(WebSocketClientEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processOpening(WebSocketClientEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processPacket(WebSocketClientEvent arg0, WebSocketPacket arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processReconnecting(WebSocketClientEvent arg0) {
		// TODO Auto-generated method stub
		
	}
 
}