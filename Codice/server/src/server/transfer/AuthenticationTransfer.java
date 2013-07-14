/**
* Nome: AuthenticationTransfer
* Package: server.transfer
* Autore: Zohouri Haghian Pardis
* Data: 2013/05/24
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130524 |      ZHP      | + processClosed          |
* |         |               | + processOpened          |
* |         |               | + processToken           |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/
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
  private Tutorials tutorials;

  public AuthenticationTransfer(AuthenticationManager authenticationManager, UserManager userManager, Tutorials tutorials){
	this.authenticationManager=authenticationManager;
	this.userManager=userManager;
	this.tutorials= tutorials;
  }

  public void processToken(WebSocketServerTokenEvent event, Token token) {
    String type= token.getString("type");
   	WebSocketPacket wspacket=null;
   	if(type.equals("login")){
   	  User user=null;
	  try {
		user = authenticationManager.login(token.getString("username"),token.getString("password"),event.getConnector().getRemoteHost().toString());
	    event.getConnector().setUsername(user.getUsername());
	   	wspacket = new RawPacket("{\"type\":\"login\",\"answer\":\"true\", \"name\":\""+user.getName()+"\", \"surname\":\""+user.getSurname()+"\"}");
	   	java.util.Vector<User> newUser = new java.util.Vector<User>();
	   	newUser.add(user);
	   	WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\","));
	  	broadcast(wspacket2, event.getConnector());
	  }catch (Exception e){
		wspacket = new RawPacket("{\"type\":\"login\",\"answer\":\"false\",\"error\":\""+e.getMessage()+"\"}");
	  }
   	  sendPacket(wspacket, event.getConnector());
   	}
   	else if(type.equals("signUp")){
   	  try{
   	    User user = authenticationManager.createUser(token.getString("username"),token.getString("password"), token.getString("name"), token.getString("surname"), event.getConnector().getRemoteHost().toString());
   		event.getConnector().setUsername(user.getUsername());
		wspacket = new RawPacket("{\"type\":\"signUp\",\"answer\":\"true\"}");
		java.util.Vector<User> newUser = new java.util.Vector<User>();
		newUser.add(user);
		WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\","));
		broadcast(wspacket2, event.getConnector());
	  }catch(Exception e){
	    wspacket = new RawPacket("{\"type\":\"signUp\",\"answer\":\"false\",\"error\":\""+e.getMessage()+"\"}");
	  }
   	  sendPacket(wspacket, event.getConnector());
   	}
   	else if(type.equals("getContacts")){
   	  wspacket = new RawPacket(converter.convertUsers(authenticationManager.getAllContacts(event.getConnector().getUsername()),"\"type\":\"getContacts\","));
   	  sendPacket(wspacket, event.getConnector());
   	}
   	else if(type.equals("logout")){
   	  User user = authenticationManager.logout(event.getConnector().getUsername());
   	  event.getConnector().removeUsername();
   	  if(user!=null){
   	    java.util.Vector<User> newUser = new java.util.Vector<User>();
   	    newUser.add(user);
   	    WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\","));
   	    broadcast(wspacket2, event.getConnector());
   	  }
    }
  }

  public void processOpened(WebSocketServerEvent event) {
    connectedUsers.add(event.getConnector());
    event.getConnector().removeUsername();
    java.util.Map<String, String> tut =tutorials.getTutorials();
    String tmp =converter.convertTutorials(tut, "\"type\":\"tutorials\",");
    WebSocketPacket wspacket = new RawPacket(tmp);
    event.sendPacket(wspacket);
  }
    
  public void processClosed(WebSocketServerEvent event) {
    if(event.getConnector().getUsername()!=null){
      User user= userManager.getUserData(event.getConnector().getUsername());
      if(!user.getIP().equals("0")){
        authenticationManager.logout(user.getUsername());
    	java.util.Vector<User> newUser = new java.util.Vector<User>();
    	newUser.add(user);
    	WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\","));
    	broadcast(wspacket2, event.getConnector());
      }
    }
    connectedUsers.remove(event.getConnector());
  }
}