/**
* Nome: UserTransfer
* Package: server.transfer
* Autore: Palmisano Maria Antonietta
* Data: 2013/04/25
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130425 |      PMA      | + processToken           |
* |         |               | + UserTranser            |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/
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
/*
metodo per la gestione dei token
*/
  public void processToken(WebSocketServerTokenEvent event, Token token) {
   	String type= token.getString("type");
   	WebSocketPacket wspacket=null;
   	if(type.equals("checkCredentials")){
   	  boolean answer= userManager.checkPassword(event.getConnector().getUsername(),token.getString("password"));
   	  if(answer){
   		wspacket = new RawPacket("{\"type\":\"checkCredentials\",\"answer\":\"true\"}");
   	  }else{
   		wspacket = new RawPacket("{\"type\":\"checkCredentials\",\"answer\":\"false\"}");
   	  }
   	  sendPacket(wspacket, event.getConnector());
   	}
   	else if(type.equals("changeData")){
   	  try{
   	    boolean answerData= userManager.setUserData(event.getConnector().getUsername(), token.getString("name"), token.getString("surname"));
   	    boolean answerPassword=true;
   	    if(!(token.getString("password").equals(""))){
   		  answerPassword = userManager.setPassword(event.getConnector().getUsername(), token.getString("password"));
   	    }
   	    if(answerData & answerPassword){
   		  wspacket = new RawPacket("{\"type\":\"changeData\",\"answer\":\"true\"}");
   		  java.util.Vector<User> newUser = new java.util.Vector<User>();
   		  newUser.add(userManager.getUserData(event.getConnector().getUsername()));
   		  WebSocketPacket wspacket2=new RawPacket(converter.convertUsers(newUser, "\"type\":\"getContacts\","));
  		  broadcastToAll(wspacket2);
   	    }else if (!answerData){
   	      wspacket = new RawPacket("{\"type\":\"changeData\",\"answer\":\"false\",\"error\":\"Errore nell'operazione di modifica del nome e del cognome\"}");
   	    }else if(!answerPassword){
   	      wspacket = new RawPacket("{\"type\":\"changeData\",\"answer\":\"false\",\"error\":\"Errore nell'operazione di modifica della password\"}");
   	    }
   	  }catch(Exception e){
  		wspacket = new RawPacket("{\"type\":\"changeData\",\"answer\":\"false\",\"error\":\""+e.getMessage()+"\"}");
   	  }
   	  sendPacket(wspacket, event.getConnector());
   	}
  }
}