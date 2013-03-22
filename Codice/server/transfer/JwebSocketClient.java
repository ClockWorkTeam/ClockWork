package server.transfer;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.factory.JWebSocketFactory;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.server.TokenServer;
import org.jwebsocket.token.Token;


public class JwebSocketClient implements WebSocketServerTokenListener{
	private TokenServer tokenServer;
	
	public TokenServer getTokenServer(){
		return tokenServer;
	}
	
	public void init(String[] arg){
		try{
			// the following line must not be removed due to GNU LGPL 3.0 license!  
			JWebSocketFactory.printCopyrightToConsole();  
			// check if home, config or bootstrap path are passed by command line  
			JWebSocketConfig.initForConsoleApp(arg);  
			// start the jWebSocket Server 
			JWebSocketFactory.start();
			tokenServer = (TokenServer) JWebSocketFactory.getServer("ts0");
			if(tokenServer !=null){
				System.out.println("server was found");
				tokenServer.addListener(this);
			}else{
				System.out.println("server was NOT found");
			}
		}catch(Exception lEx){
			lEx.printStackTrace();
		}
	}
	
	public static void main(String[]arg){
		JwebSocketClient jc = new JwebSocketClient();
		jc.init(arg);
	}
	@Override
	public void processClosed(WebSocketServerEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processOpened(WebSocketServerEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processPacket(WebSocketServerEvent arg0, WebSocketPacket arg1) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void processToken(WebSocketServerTokenEvent arg0, Token arg1) {
		// TODO Auto-generated method stub
		
	}
	
}
