package server.transfer;

import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.Token;
import server.usermanager.UserManager;

public class RecordMessageTransfer extends ListenerTransfer{
	private UserManager userManager;
	
	public RecordMessageTransfer(UserManager userManager){
		this.userManager=userManager;
	}
	
	@Override
    public void processToken(WebSocketServerTokenEvent event, Token token) {
   		String type= token.getString("type");
   		WebSocketPacket wspacket=null;	
   		if(type.equals("getMessages")){
   			wspacket = new RawPacket(converter.getMessages(userManager.getMessages(token.getString("username"))));
   	  		sendPacket(wspacket, event.getConnector());
   		}
	}

    public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){
    	tokenServer.sendPacket(connector, packet); 
    }

	@Override
	public void processPacket(WebSocketServerEvent arg0, WebSocketPacket arg1) {
		// TODO Auto-generated method stub
		
	}
}
