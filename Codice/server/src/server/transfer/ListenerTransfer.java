package server.transfer;

import java.util.Collection;
import javolution.util.FastList;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.server.TokenServer;
import server.ServerMyTalk;
import server.functionmanager.Converter;

abstract class ListenerTransfer implements WebSocketServerTokenListener{
	static protected TokenServer tokenServer;
	static protected Collection<WebSocketConnector> connectedClients=new FastList<WebSocketConnector>().shared();
	protected Converter converter =new Converter();
	
	public void setTokenServer(ServerMyTalk server) {
        tokenServer=server.getTokenServer();
    }
	
    public void broadcastToAll(WebSocketPacket packet) {
    	for (WebSocketConnector lConnector : connectedClients) {
    		tokenServer.sendPacket(lConnector, packet);
    	}
    }
    
    public WebSocketConnector getConnector(String IP, String username){
    	
    	Collection<WebSocketConnector> clientsWithThatIP=new FastList<WebSocketConnector>().shared();
    	
    	for (WebSocketConnector lConnector : connectedClients) {
	    		if(lConnector.getRemoteHost().toString().equals(IP))
	    			clientsWithThatIP.add(lConnector);
    	}
    	WebSocketConnector connector=null;
    	for (WebSocketConnector lConnector : clientsWithThatIP) {
    		if(lConnector.getUsername().equals(username))
    			connector=lConnector;
    	}
    	
    	return connector;
    }
    
    public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){
    	tokenServer.sendPacket(connector, packet); 
    }
    
    public void processOpened(WebSocketServerEvent event) {}    
    public void processClosed(WebSocketServerEvent event) {}
    public void processPacket(WebSocketServerEvent event, WebSocketPacket packet){}

}
