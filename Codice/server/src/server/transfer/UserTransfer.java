package server.transfer;

import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.Token;

import server.usermanager.UserManager;

public class UserTransfer extends ListenerTransfer{
	private UserManager userManager;
	
	public UserTransfer(UserManager userManager){
		this.userManager=userManager;
	}
	
	@Override
	public void processToken(WebSocketServerTokenEvent arg0, Token arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processPacket(WebSocketServerEvent arg0, WebSocketPacket arg1) {
		// TODO Auto-generated method stub
		
	}

    public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){}
}
