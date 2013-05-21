
package server.transfer;

import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.token.Token;

import server.shared.User;
import server.usermanager.UserManager;

public class UserTransfer extends ListenerTransfer{
	private UserManager userManager;
	
	public UserTransfer(UserManager userManager){
		this.userManager=userManager;
	}
	
    public void processToken(WebSocketServerTokenEvent event, Token token) {
   		String type= token.getString("type");
   		WebSocketPacket wspacket=null;	    
   		if(type.equals("checkCredentials")){
   			User user=userManager.getUser(token.getString("username"));
   			boolean answer= userManager.checkPassword(user,token.getString("password"));
   			if(answer){
   				wspacket = new RawPacket("{\"type\":\"checkCredentials\",\"answer\":\"true\"}");
   			}else{
   				wspacket = new RawPacket("{\"type\":\"checkCredentials\",\"answer\":\"false\"}");
   			}
   			sendPacket(wspacket, event.getConnector());
   		}
   		else if(type.equals("changeData")){
   			User user = userManager.getUser(token.getString("username"));
   			boolean answerData= userManager.setUserData(user, token.getString("name"), token.getString("surname"));
   			boolean answerPassword=true;
   			if(!(token.getString("password").equals(""))){
   				answerPassword = userManager.setPassword(user, token.getString("password"));
   			}
   			if(answerData & answerPassword){
   				wspacket = new RawPacket("{\"type\":\"changeData\",\"answer\":\"true\"}");
   				java.util.Vector<User> newUser = new java.util.Vector<User>();
   				newUser.add(user);
   				WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\","));
  				broadcastToAll(wspacket2);
   			}else if (!answerData & !answerPassword){
   				wspacket = new RawPacket("{\"type\":\"changeData\",\"answer\":\"false\"}");
   			}
   			sendPacket(wspacket, event.getConnector());
   		}
	}

}
