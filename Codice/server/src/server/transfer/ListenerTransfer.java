package server.transfer;

import java.util.Collection;
import javolution.util.FastList;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.server.TokenServer;
import server.ServerMyTalk;
import server.functionmanager.Converter;
import server.shared.Tutorials;

abstract class ListenerTransfer implements WebSocketServerTokenListener{
	protected TokenServer tokenServer;
	protected Collection<WebSocketConnector> connectedClients=new FastList<WebSocketConnector>().shared();
	private Tutorials tutorials;
	protected Converter converter =new Converter();
	
	public void setTokenServer(ServerMyTalk server) {
        tokenServer=server.getTokenServer();
    }
	
	protected void setTutorials(Tutorials tutorials){
		this.tutorials=tutorials;
	}
	
    public void broadcastToAll(WebSocketPacket packet) {
    	for (WebSocketConnector lConnector : connectedClients) {
    		tokenServer.sendPacket(lConnector, packet);
    	}
    }
    
    public WebSocketConnector getConnector(String IP){
    	for (WebSocketConnector connector : connectedClients) {
	    		if(connector.getRemoteHost().toString().equals(IP))
	    			return connector;
    	}
    	return null;
    }
        
    public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){
    	tokenServer.sendPacket(connector, packet); 
    }
    
    public void processOpened(WebSocketServerEvent event) {
    	connectedClients.add(event.getConnector());
    	WebSocketPacket wspacket = new RawPacket(converter.convertTutorials(tutorials.getTutorials(), "\"type\":\"tutorials\","));
    	event.sendPacket(wspacket);
    }
    
    public void processClosed(WebSocketServerEvent event) {
    	connectedClients.remove(event.getConnector());
    }
}
