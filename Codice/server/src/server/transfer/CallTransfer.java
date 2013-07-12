/**
* Nome: CallTransfer
* Package: server.transfer
* Autore: Zohouri Haghian Pardis
* Data: 2013/05/28
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130528 |      ZHP      | + processToken           |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/
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
  		wspacket=new RawPacket("{\"type\":\"call\", \"contact\":\""+event.getConnector().getUsername()+"\",\"callType\":\""+token.getString("callType")+"\"}");
  	  }else{
  		wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente non connesso al server\"}");
  		connector=event.getConnector();
  	  }
      sendPacket(wspacket,connector);
   	}else if(type.equals("answeredCall")){
  	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
   	  wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"true\"}");
   	  sendPacket(wspacket,connector);
   	}else if(type.equals("refuseCall")){
  	  WebSocketConnector connector =  getUserConnector(token.getString("contact"));
   	  wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Chiamata rifiutata\"}");
   	  sendPacket(wspacket,connector);
   	}else if(type.equals("busy")){
  	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
      wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente occupato in un'altra conversazione\"}");
      sendPacket(wspacket,connector);
	}else if(type.equals("offer")){
  	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
   	  wspacket=new RawPacket(token.getString("description"));
   	  sendPacket(wspacket,connector);
   	}else if(type.equals("candidate")){
  	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
   	  wspacket=new RawPacket(token.getString("candidate"));
   	  sendPacket(wspacket,connector);
   	}else if(type.equals("endCall")){
   	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
   	  if(connector!=null){
   		wspacket=new RawPacket("{\"type\":\"endCall\"}");
   		sendPacket(wspacket,connector);
   	  }
   	}else if(type.equals("candidateReady")){
   	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
      wspacket=new RawPacket("{\"type\":\"candidateReady\"}");
   	  sendPacket(wspacket,connector);
	}
  }
}