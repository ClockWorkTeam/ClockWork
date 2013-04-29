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
   		if(type.equals("call")){
  		  	WebSocketConnector connector = getConnector(token.getString("ip"));
   	    	if(connector!= null){
   	    		wspacket=new RawPacket("{\"type\":\"call\", \"ip\":\""+event.getConnector().getRemoteHost()+"\",\"typecall\":\""+token.getString("calltype")+"\"}");
   	    		sendPacket(wspacket,connector);
   	    	}
   		}else if(type.equals("answeredCall")){
  		  	WebSocketConnector connector = getConnector(token.getString("ip"));
   	    	if(connector!= null){
   	    		wspacket=new RawPacket("{\"type\":\"answeredCall\", \"response\":\"true\"}");
   	    		sendPacket(wspacket,connector);
   	    	}   			
   		}else if(type.equals("offer")){
  		  	WebSocketConnector connector = getConnector(token.getString("ip"));
   	    	if(connector!= null){
    			wspacket=new RawPacket(token.getString("description"));
    			sendPacket(wspacket,connector);
   	    	}
   		}else if(type.equals("candidate")){
  		  	WebSocketConnector connector = getConnector(token.getString("ip"));
   	    	if(connector!= null){
    			wspacket=new RawPacket(token.getString("cand"));
    			sendPacket(wspacket,connector);
   	    	}
   		}	
    }


    public void processPacket(WebSocketServerEvent event, WebSocketPacket packet) {    
    }
}