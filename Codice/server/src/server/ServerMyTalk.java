package server;
/**
* Nome: ServerMyTalk
* Package: server
* Autore: Zohouri Haghian Pardis
* Data: 2013/04/22
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130422 |     ZHP       | + main                   |
* |         |               | + init                   |
* |         |               | + getTokenServer         |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/


import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.factory.JWebSocketFactory;
import org.jwebsocket.server.TokenServer;

import server.transfer.AuthenticationTransfer;
import server.transfer.CallTransfer;
import server.transfer.ChatTransfer;
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
            	Launcher launcher = Launcher.getInstance();
                System.out.println("server was found");
                AuthenticationTransfer authentication =new AuthenticationTransfer(launcher.getAuthenticationManager(), launcher.getUserManager(), launcher.getTutorials());
                UserTransfer user= new UserTransfer(launcher.getUserManager());
                CallTransfer call =new CallTransfer();
                RecordMessageTransfer recordMessage= new RecordMessageTransfer(launcher.getUserManager());
                ChatTransfer chat = new ChatTransfer();

                tokenServer.addListener(authentication);
                tokenServer.addListener(user);
                tokenServer.addListener(recordMessage);
                tokenServer.addListener(call);
                tokenServer.addListener(chat);

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
