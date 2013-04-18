package server;

import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.factory.JWebSocketFactory;
import org.jwebsocket.server.TokenServer;

import server.transfer.AuthenticationTransfer;
import server.transfer.CallTransfer;
import server.transfer.RecordMessageTransfer;
import server.transfer.UserTransfer;
public class ServerMyTalk {
    private TokenServer tokenServer;
    
    public TokenServer getTokenServer() {
        return tokenServer;
    }
    
    public void init(String[] aArgs) {
        try {
        	// the following line must not be removed due to GNU LGPL 3.0 license!  
        	JWebSocketFactory.printCopyrightToConsole();  
        	// check if home, config or bootstrap path are passed by command line  
        	JWebSocketConfig.initForConsoleApp(aArgs);
            JWebSocketFactory.start();
            tokenServer = (TokenServer) JWebSocketFactory.getServer("ts0");
            if (tokenServer != null) {
            	Launcher.getServer();
                System.out.println("server was found");
                AuthenticationTransfer authentication =new AuthenticationTransfer(Launcher.getAuthenticationManager(), Launcher.getUserMenager(), Launcher.getTutorials());
                UserTransfer user= new UserTransfer(Launcher.getUserMenager());
                CallTransfer call =new CallTransfer();
                RecordMessageTransfer recordMessage= new RecordMessageTransfer(Launcher.getUserMenager());
                
                tokenServer.addListener(authentication);
                tokenServer.addListener(user);
                tokenServer.addListener(recordMessage);
                tokenServer.addListener(call);

                
                authentication.setTokenServer(this);
            } else {
                System.out.println("server was NOT found");
            }
        } catch (Exception lEx) { lEx.printStackTrace();}
    }
    
    public static void main(String[] aArgs) {
        ServerMyTalk server = new ServerMyTalk();
        server.init(aArgs);
    }
}
