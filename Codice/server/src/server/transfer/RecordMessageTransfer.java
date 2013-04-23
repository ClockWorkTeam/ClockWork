package server.transfer;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.Vector;

import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.Token;

import server.shared.RecordMessage;
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
   		}else if (type.equals("saveMessage")){
   			java.util.Date dt = new java.util.Date();
   			java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
   			RecordMessage recMex= userManager.createMessage(token.getString("username"), token.getString("addressee"), token.getString("path"), sdf.format(dt));
   			String IPaddressee= userManager.getUser(token.getString("addressee")).getIP();
   			if(!IPaddressee.equals("0")){
   				for (WebSocketConnector connector : connectedClients) {
   	   	    		if(connector.getRemoteHost().toString().equals(IPaddressee)){
   	   	    			Vector<RecordMessage> vecRecMex=new Vector<RecordMessage>();
   	   	    			vecRecMex.add(recMex);
   	   	    			wspacket=new RawPacket(converter.getMessages(vecRecMex));
   	   	    			sendPacket(wspacket,connector);
   	   	    		}
   	   	    	}   
   			}
   		}else if (type.equals("removeMessage")){
   			
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
