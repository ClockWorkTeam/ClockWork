package server.transfer;


import java.util.Collection;
import javolution.util.FastList;

import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.RawPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.server.TokenServer;
import org.jwebsocket.token.Token;

import server.ServerMyTalk;
import server.usermanager.*;
import server.functionmanager.ContactsManager;
import server.shared.User;

public class AuthenticationTransfer implements WebSocketServerTokenListener {
	TokenServer tokenServer;
	private AuthenticationManager authenticationManager;
	private UserManager userManager;
	private Collection<WebSocketConnector> mClients;
	
	public AuthenticationTransfer(AuthenticationManager authenticationManager, UserManager userManager){
		this.authenticationManager=authenticationManager;
		this.userManager=userManager;
		mClients = new FastList<WebSocketConnector>().shared();
	}
	
    public void setTokenServer(ServerMyTalk server) {
        tokenServer=server.getTokenServer();
    }

    public void processToken(WebSocketServerTokenEvent event, Token token) {
   		String type= token.getString("type");
   		WebSocketPacket wspacket=null;	    
   		if(type.equals("Login")){
   			User user=authenticationManager.login(token.getString("username"),token.getString("password"),event.getConnector().getRemoteHost().toString());
   			if(user==null){
   				wspacket = new RawPacket("{\"risposta\":\"false\",\"name\":\"\",\"surname\":\"\"}");
   			}else{
   				wspacket = new RawPacket("{\"risposta\":\"true\", \"name\":\""+user.getName()+"\", \"surname\":\""+user.getSurname()+"\"}");
   				WebSocketPacket wspacket2=new RawPacket("{\"size\":\""+1+"\", \"username0\":\""+user.getUsername()+"\",\"name0\":\""+user.getName()+"\",\"surname0\":\""+user.getSurname()+"\",\"IP0\":\""+user.getIP()+"\"}");
  				broadcastToAll(wspacket2);
    		}
   	  		sendPacket(wspacket, event);
   		}
   		else if(type.equals("SignUp")){
   			User user = authenticationManager.createUser(token.getString("username"),token.getString("password"), token.getString("name"), token.getString("surname"), event.getConnector().getRemoteHost().toString());
   			if(user==null){
   				wspacket = new RawPacket("{\"risposta\":\"false\"}");
   			}else{
   				wspacket = new RawPacket("{\"risposta\":\"true\"}");
   				WebSocketPacket wspacket2=new RawPacket("{\"size\":\""+1+"\", \"username0\":\""+user.getUsername()+"\",\"name0\":\""+user.getName()+"\",\"surname0\":\""+user.getSurname()+"\",\"IP0\":\""+user.getIP()+"\"}");
  				broadcastToAll(wspacket2);
   			}
   	  		sendPacket(wspacket, event);
   		}
   		else if(type.equals("getContacts")){
   	    	mClients.add(event.getConnector());
   			ContactsManager contacts= new ContactsManager();
   			wspacket = new RawPacket(contacts.getAllContacts(userManager.getAllContacts(userManager.getUser(token.getString("username")))));
   	  		sendPacket(wspacket, event);
   		}
   		else if(type.equals("Logout")){
   			boolean ris = authenticationManager.logout(userManager.getUser(token.getString("username")));
   			if(!ris){
   				wspacket = new RawPacket("{\"risposta\":\"false\"}");
   			}else{
   				User user=userManager.getUser(token.getString("username"));
   				wspacket = new RawPacket("{\"risposta\":\"true\"}");
   				WebSocketPacket wspacket2=new RawPacket("{\"size\":\""+1+"\", \"username0\":\""+user.getUsername()+"\",\"name0\":\""+user.getName()+"\",\"surname0\":\""+user.getSurname()+"\",\"IP0\":\""+user.getIP()+"\"}");
  				broadcastToAll(wspacket2);
   			}   		   
   	  		sendPacket(wspacket, event);
   		}

    }

    public void processClosed(WebSocketServerEvent event) {
    	mClients.remove(event.getConnector());
    }

    public void processOpened(WebSocketServerEvent event) {
    }

    public void sendPacket(WebSocketPacket packet, WebSocketServerEvent event){
		event.sendPacket(packet); 
    }
    public void broadcastToAll(WebSocketPacket packet) {
    	for (WebSocketConnector lConnector : mClients) {
    		tokenServer.sendPacket(lConnector, packet);
    	}
    }

    public void processPacket(WebSocketServerEvent event, WebSocketPacket packet) {           
    }
    public Collection<WebSocketConnector> getClients(){
    	return mClients;
    }
}