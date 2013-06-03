package server.transfer;

import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.Token;

public class CallTransfer extends ListenerTransfer {

    public void processToken(WebSocketServerTokenEvent event, Token token) {
   		String type= token.getString("type");
  		WebSocketPacket wspacket=null;
   		if(type.equals("call")){
  		  	WebSocketConnector connector = getUserConnector(token.getString("contact"));
  		  	if(connector!=null){
  		  		wspacket=new RawPacket("{\"type\":\"call\", \"contact\":\""+event.getConnector().getUsername()+"\",\"typecall\":\""+token.getString("calltype")+"\"}");
  		  	}else{
  		  		wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"error\"}");
  		  		connector=event.getConnector();
  		  	}
    		sendPacket(wspacket,connector);
   		}else if(type.equals("answeredCall")){
  		  	WebSocketConnector connector = getUserConnector(token.getString("contact"));
   	    	wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"true\"}");
   	    	sendPacket(wspacket,connector);   			
   		}else if(type.equals("refusecall")){
  		  	WebSocketConnector connector =  getUserConnector(token.getString("contact"));
   	    	wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"false\"}");
   	    	sendPacket(wspacket,connector);
   		}else if(type.equals("busy")){
  		  	WebSocketConnector connector = getUserConnector(token.getString("contact"));
     		wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"busy\"}");
     		sendPacket(wspacket,connector);   			
   		}else if(type.equals("offer")){
  		  	WebSocketConnector connector = getUserConnector(token.getString("contact"));
   			wspacket=new RawPacket(token.getString("description"));
   			sendPacket(wspacket,connector);
   		}else if(type.equals("candidate")){
  		  	WebSocketConnector connector = getUserConnector(token.getString("contact"));
   			wspacket=new RawPacket(token.getString("cand"));
   			sendPacket(wspacket,connector);
   		}else if(type.equals("endcall")){
   			WebSocketConnector connector = getUserConnector(token.getString("contact"));
   			if(connector!=null){
   				wspacket=new RawPacket("{\"type\":\"endcall\"}");
   				sendPacket(wspacket,connector);
   			}
   		}else if(type.equals("candidateready")){
   			WebSocketConnector connector = getUserConnector(token.getString("contact"));
    		wspacket=new RawPacket("{\"type\":\"candidateready\"}");
   			sendPacket(wspacket,connector);
   		}
	}

}