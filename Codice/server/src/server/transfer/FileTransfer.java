/**
* Nome: FileTransfer
* Package: server.transfer
* Autore: Zohouri Haghian Pardis
* Data: 2013/05/28
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130528 |      ZHP      | + creazione documento	   |
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

public class FileTransfer extends ListenerTransfer {
  public void processToken(WebSocketServerTokenEvent event, Token token) {
	String type= token.getString("type");
	WebSocketPacket wspacket=null;
	if(type.equals("file")){
	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
	  if(connector!=null){
		wspacket=new RawPacket("{\"type\":\"file\", \"file\":\""+token.getString("file")+"\", \"contact\":\""+event.getConnector().getUsername()+"\"}");
	  }else{
		wspacket=new RawPacket("{\"type\":\"fileRefused\", \"error\":\"L'utente non risulta connesso al server\", \"contact\":\""+token.getString("contact")+"\"}");
		connector= event.getConnector();
	  }
	  sendPacket(wspacket,connector);
	}
	else if(type.equals("refuseFile")){
	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
	  if(connector!=null){
		wspacket=new RawPacket("{\"type\":\"fileRefused\", \"error\":\"L'utente ha rifiutato il file\", \"contact\":\""+token.getString("contact")+"\"}");
		connector= event.getConnector();
	  }
	  sendPacket(wspacket,connector);
	}
  }
}
