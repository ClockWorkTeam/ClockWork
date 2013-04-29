package server.transfer;

import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.Token;
import server.usermanager.*;
import server.shared.Tutorials;
import server.shared.User;

public class AuthenticationTransfer extends ListenerTransfer{
	private AuthenticationManager authenticationManager;
	private UserManager userManager;
	
	public AuthenticationTransfer(AuthenticationManager authenticationManager, UserManager userManager, Tutorials tutorials){
		this.authenticationManager=authenticationManager;
		this.userManager=userManager;
		setTutorials(tutorials);
	}
	

    public void processToken(WebSocketServerTokenEvent event, Token token) {
   		String type= token.getString("type");
   		WebSocketPacket wspacket=null;	    
   		if(type.equals("login")){
   			User user=authenticationManager.login(token.getString("username"),token.getString("password"),event.getConnector().getRemoteHost().toString());
   			if(user==null){
   				wspacket = new RawPacket("{\"type\":\"login\",\"answer\":\"false\",\"name\":\"\",\"surname\":\"\"}");
   			}else{
   				wspacket = new RawPacket("{\"type\":\"login\",\"answer\":\"true\", \"name\":\""+user.getName()+"\", \"surname\":\""+user.getSurname()+"\"}");
   				java.util.Vector<User> newUser = new java.util.Vector<User>();
   				newUser.add(user);
   				WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\""));
  				broadcastToAll(wspacket2);
    		}
   			sendPacket(wspacket, event.getConnector());
   		}
   		else if(type.equals("signUp")){
   			User user = authenticationManager.createUser(token.getString("username"),token.getString("password"), token.getString("name"), token.getString("surname"), event.getConnector().getRemoteHost().toString());
   			if(user==null){
   				wspacket = new RawPacket("{\"type\":\"singUp\",\"answer\":\"false\"}");
   			}else{
   				wspacket = new RawPacket("{\"type\":\"singUp\",\"answer\":\"true\"}");
   				java.util.Vector<User> newUser = new java.util.Vector<User>();
   				newUser.add(user);
   				WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\""));
  				broadcastToAll(wspacket2);
   			}
   			sendPacket(wspacket, event.getConnector());
   		}
   		else if(type.equals("getContacts")){
   			wspacket = new RawPacket(converter.convertUsers(userManager.getAllContacts(userManager.getUser(token.getString("username"))),"\"type\":\"getContacts\""));
   			sendPacket(wspacket, event.getConnector());
   		}
   		else if(type.equals("logout")){
   			boolean answer = authenticationManager.logout(userManager.getUser(token.getString("username")));
   			if(!answer){
   				wspacket = new RawPacket("{\"type\":\"logout\",\"answer\":\"false\"}");
   			}else{
   				User user=userManager.getUser(token.getString("username"));
   				wspacket = new RawPacket("{\"type\":\"logout\",\"answer\":\"true\"}");
   				java.util.Vector<User> newUser = new java.util.Vector<User>();
   				newUser.add(user);
   				WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\""));
  				broadcastToAll(wspacket2);
   			}   		   
   			sendPacket(wspacket, event.getConnector());
   		}

    }

    public void processPacket(WebSocketServerEvent event, WebSocketPacket packet) {           
    }

}