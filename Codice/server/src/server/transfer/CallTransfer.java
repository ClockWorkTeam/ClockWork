package server.transfer;

import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.Token;

public class CallTransfer extends ListenerTransfer {

    public void processToken(WebSocketServerTokenEvent event, Token token) {
   		String type= token.getString("type");
  		WebSocketPacket wspacket=null;
  		System.out.println("Numero clienti" + connectedClients.size());
   		if(type.equals("call")){
  		  	for (WebSocketConnector connector : connectedClients) {
   	    		if(connector.getRemoteHost().toString().equals(token.getString("ip"))){
   	    			wspacket=new RawPacket("{\"type\":\"call\", \"ip\":\""+event.getConnector().getRemoteHost()+"\",\"typecall\":\""+token.getString("calltype")+"\"}");
   	    			sendPacket(wspacket,connector);
   	    		}
   	    	}
   		}else if(type.equals("answeredcall")){
   		  	for (WebSocketConnector connector : connectedClients) {
   	    		if(connector.getRemoteHost().toString().equals(token.getString("ip"))){
   	    			wspacket=new RawPacket("{\"type\":\"answeredCall\", \"response\":\"true\"}");
   	    			sendPacket(wspacket,connector);
   	    		}
   	    	}   			
   		}else if(type.equals("offer")){
   			for (WebSocketConnector connector : connectedClients) {   				
   	    		if(connector.getRemoteHost().toString().equals(token.getString("ip"))){
   	    			wspacket=new RawPacket(token.getString("description"));
   	    			sendPacket(wspacket,connector);
   	    		}
   	    	}
   		}else if(type.equals("candidate")){
   			for (WebSocketConnector connector : connectedClients) {
   	    		if(connector.getRemoteHost().toString().equals(token.getString("ip"))){
   	    			wspacket=new RawPacket(token.getString("cand"));
   	    			sendPacket(wspacket,connector);
   	    		}
   	    	}
   		}	
    }

    public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){
    	tokenServer.sendPacket(connector, packet); 
    }
    public void processPacket(WebSocketServerEvent event, WebSocketPacket packet) {    
    }
}