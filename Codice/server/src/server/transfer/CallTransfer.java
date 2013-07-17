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
  	  WebSocketConnector connector = null;
  	  if(token.getString("contact").contains(".")){//indirizzo IP
  		connector= getIpConnector(token.getString("contact"));
  		if(connector!=null){
  			wspacket=new RawPacket("{\"type\":\"call\", \"contact\":\""+event.getConnector().getRemoteHost().toString()+"\",\"callType\":\""+token.getString("callType")+"\",\"conference\":\""+token.getString("conference")+"\"}");
  		}
  	  }else{ //username
  		connector=getUserConnector(token.getString("contact"));
  	    if(connector!=null){
  	    	wspacket=new RawPacket("{\"type\":\"call\", \"contact\":\""+event.getConnector().getUsername()+"\",\"callType\":\""+token.getString("callType")+"\",\"conference\":\""+token.getString("conference")+"\"}");
  	    }
  	  }
  	  if(connector==null){
  		wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente non connesso al server\"}");
  		connector=event.getConnector();
  	  }
      sendPacket(wspacket,connector);
   	}else if(type.equals("answeredCall")){
  	  WebSocketConnector connector=null;
      if(token.getString("contact").contains(".")){//indirizzo IP
    	connector= getIpConnector(token.getString("contact"));
      }else{ //username
    	connector=getUserConnector(token.getString("contact"));
      }
      wspacket=new RawPacket("{\"type\":\"answeredCall\", \"user\":\"" +event.getConnector().getUsername()+"\", \"answer\":\"true\"}");
   	  sendPacket(wspacket,connector);
   	}else if(type.equals("refuseCall")){
      WebSocketConnector connector=null;
      if(token.getString("contact").contains(".")){//indirizzo IP
      	connector= getIpConnector(token.getString("contact"));
      }else{ //username
      	connector=getUserConnector(token.getString("contact"));
      }
   	  wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Chiamata rifiutata\"}");
   	  sendPacket(wspacket,connector);
   	}else if(type.equals("busy")){
	  WebSocketConnector connector=null;
      if(token.getString("contact").contains(".")){//indirizzo IP
      	connector= getIpConnector(token.getString("contact"));
      }else{ //username
        connector=getUserConnector(token.getString("contact"));
      }
      wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente occupato in un'altra conversazione\"}");
      sendPacket(wspacket,connector);
	}else if(type.equals("refuseCam")){
	  WebSocketConnector connector=null;
      if(token.getString("contact").contains(".")){//indirizzo IP
      	connector= getIpConnector(token.getString("contact"));
      }else{ //username
        connector=getUserConnector(token.getString("contact"));
      }
      wspacket=new RawPacket("{\"type\":\"answeredCall\", \"answer\":\"false\", \"error\":\"Utente rifiuta di accendere la telecamera\"}");
      sendPacket(wspacket,connector);
	}else if(type.equals("sdp")){
  	  WebSocketConnector connector=null;
  	  String contact;
      if(token.getString("contact").contains(".")){//indirizzo IP
    	connector= getIpConnector(token.getString("contact"));
    	contact=event.getConnector().getRemoteHost().toString();
      }else{ //username
    	connector=getUserConnector(token.getString("contact"));
    	contact= event.getConnector().getUsername();
	  }
      String tokenToSend =token.getString("description");
      tokenToSend= tokenToSend.substring(0,tokenToSend.length()-1);    
      tokenToSend+=",\"contact\":\""+contact+"\"}";
   	  wspacket=new RawPacket(tokenToSend);
   	  sendPacket(wspacket,connector);
   	}else if(type.equals("candidate")){
      WebSocketConnector connector=null;
      String contact;
      if(token.getString("contact").contains(".")){//indirizzo IP
        connector= getIpConnector(token.getString("contact"));
        contact=event.getConnector().getRemoteHost().toString();
      }else{ //username
        connector=getUserConnector(token.getString("contact"));
        contact= event.getConnector().getUsername();
      }
      String tokenToSend =token.getString("candidate");
      tokenToSend= tokenToSend.substring(0,tokenToSend.length()-1);
      
      tokenToSend+=",\"contact\":\""+contact+"\"}";
   	  wspacket=new RawPacket(tokenToSend);
   	  sendPacket(wspacket,connector);
   	}else if(type.equals("endCall")){
   	  WebSocketConnector connector=null;
   	  String contact;
      if(token.getString("contact").contains(".")){//indirizzo IP
       	connector= getIpConnector(token.getString("contact"));
       	contact=event.getConnector().getRemoteHost().toString();
      }else{ //username
       	connector=getUserConnector(token.getString("contact"));
       	contact= event.getConnector().getUsername();
      }
   	  if(connector!=null){
   		wspacket=new RawPacket("{\"type\":\"endCall\",\"contact\":\""+contact+"\"}");
   		sendPacket(wspacket,connector);
   	  }
   	}else if(type.equals("candidateReady")){
   	  WebSocketConnector connector=null;
   	  String contact;
      if(token.getString("contact").contains(".")){//indirizzo IP
       	connector= getIpConnector(token.getString("contact"));
       	contact=event.getConnector().getRemoteHost().toString();
      }else{ //username
       	connector=getUserConnector(token.getString("contact"));
        contact= event.getConnector().getUsername();
      }
      wspacket=new RawPacket("{\"type\":\"candidateReady\",\"contact\":\""+contact+"\"}");
   	  sendPacket(wspacket,connector);
	}else if(type.equals("endCallEarly")){
	  WebSocketConnector connector=null;
	  String contact;
	  	if(token.getString("contact").contains(".")){//indirizzo IP
	  	  connector= getIpConnector(token.getString("contact"));
	      contact=event.getConnector().getRemoteHost().toString();
	    }else{ //username
	      connector=getUserConnector(token.getString("contact"));
	      contact= event.getConnector().getUsername();
	    }
	   	if(connector!=null){
	   	  wspacket=new RawPacket("{\"type\":\"endCallEarly\",\"contact\":\""+contact+"\"}");
	   	  sendPacket(wspacket,connector);
	   	}
	}else if(type.equals("addConferenceCaller")){
	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
	  wspacket=new RawPacket("{\"type\":\"addConferenceCaller\", \"user\":\"" +token.getString("user")+"\"}");
	  sendPacket(wspacket,connector);
	}else if(type.equals("addConferenceAnswer")){
	  WebSocketConnector connector = getUserConnector(token.getString("contact"));
	  wspacket=new RawPacket("{\"type\":\"addConferenceAnswer\", \"user\":\"" +token.getString("user")+"\"}");
	  sendPacket(wspacket,connector);
	}
  }
}