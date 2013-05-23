package server.transfer;

import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.Token;

public class ChatTransfer extends ListenerTransfer {

    public void processToken(WebSocketServerTokenEvent event, Token token) {
   		String type= token.getString("type");
  		WebSocketPacket wspacket=null;
  		if(type.equals("sendText")){
   			WebSocketConnector connector = getConnector(token.getString("ip"), token.getString("username"));
   			wspacket=new RawPacket("{\"type\":\"sendText\", \"message\":\""+token.getString("message")+"\", \"ip\":\""+event.getConnector().getRemoteHost()+"\"}");
			sendPacket(wspacket,connector);
   		}
    
    }

}