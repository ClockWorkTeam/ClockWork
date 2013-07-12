/**
* Nome: ChatTransfer
* Package: server.transfer
* Autore: Ceseracciu Marco
* Data: 2013/05/28
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130528 |      CM       | + processToken           |
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

public class ChatTransfer extends ListenerTransfer {
  public void processToken(WebSocketServerTokenEvent event, Token token) {
    String type= token.getString("type");
  	WebSocketPacket wspacket=null;
  	if(type.equals("sendText")){
   	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
   	  if(connector!=null){
   		wspacket=new RawPacket("{\"type\":\"sendText\", \"message\":\""+token.getString("message")+"\", \"contact\":\""+event.getConnector().getUsername()+"\"}");
   	  }else{
   		wspacket=new RawPacket("{\"type\":\"notDelivered\", \"message\":\""+token.getString("message")+"\", \"contact\":\""+token.getString("contact")+"\"}");
   		connector= event.getConnector();
   	  }
   	  sendPacket(wspacket,connector);
   	}
  }
}