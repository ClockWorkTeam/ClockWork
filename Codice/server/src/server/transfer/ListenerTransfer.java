package server.transfer;

import java.util.Collection;
import javolution.util.FastList;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.server.TokenServer;
import server.ServerMyTalk;

abstract class ListenerTransfer implements WebSocketServerTokenListener{
	protected TokenServer tokenServer;
	protected Collection<WebSocketConnector> connectedClients=new FastList<WebSocketConnector>().shared();
	
	public void setTokenServer(ServerMyTalk server) {
        tokenServer=server.getTokenServer();
    }
	
    public void broadcastToAll(WebSocketPacket packet) {
    	for (WebSocketConnector lConnector : connectedClients) {
    		tokenServer.sendPacket(lConnector, packet);
    	}
    }
    
    public void processOpened(WebSocketServerEvent event) {
    	connectedClients.add(event.getConnector());
    }
    
    public void processClosed(WebSocketServerEvent event) {
    	connectedClients.remove(event.getConnector());
    }
}
