/**
* Nome: ListenerTransfer
* Package: server.transfer
* Autore: Ceseracciu Marco
* Data: 2013/05/25
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130525 |      CM       | + sendPacket               |
* |         |               | + getIpConnector         |
* |         |               | + getUserConnector       |
* |         |               | + broadcastToAll         |
* |         |               | + SetTokenServer         |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package server.transfer;

import java.util.Collection;
import javolution.util.FastList;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.server.TokenServer;
import server.ServerMyTalk;
import server.functionmanager.Converter;

abstract class ListenerTransfer implements WebSocketServerTokenListener{
  static protected TokenServer tokenServer;
  static protected Collection<WebSocketConnector> connectedUsers=new FastList<WebSocketConnector>().shared();
  protected Converter converter =new Converter();

  public void setTokenServer(ServerMyTalk server) {
    tokenServer=server.getTokenServer();
  }

  /**Metodo che invia il pacchetto dato in broadcast a tutti gli utenti connessi
   *
   * @param packet Pacchetto da inviare
   */
  public void broadcast(WebSocketPacket packet, WebSocketConnector from) {
  	for (WebSocketConnector lConnector : connectedUsers) {
  	  if(!lConnector.equals(from) && lConnector.getUsername()!=null){
  		  System.out.println(lConnector.getUsername());
  		tokenServer.sendPacket(lConnector, packet);
  	  }
    }
  }

  /**Metodo che individua nella lista di connettori quello corrispondente al dato username
   *
   * @param username del connettore da cercare
   * @return connettore corrispondente alla username o null se non � presente
   */
  public WebSocketConnector getUserConnector(String username){
   	WebSocketConnector connector=null;
   	for (WebSocketConnector lConnector : connectedUsers) {
      if(lConnector.getUsername()!=null && lConnector.getUsername().equals(username))
    	connector=lConnector;
    }
    return connector;
  }

  /**Metodo che individua nella lista di connettori l'ultimo con ip corrispondente a quello dato
   *
   * @param ip del connettore da cercare
   * @return ultimo connettore presente in lista tra quelli con ip uguale a quello dato, null se non � presente
   */
  public WebSocketConnector getIpConnector(String IP){
  	WebSocketConnector connector=null;
   	for (WebSocketConnector lConnector : connectedUsers) {
	  if(lConnector.getRemoteHost().toString().equals(IP))
	  	connector = lConnector;
    }
    return connector;
  }

  /**Metodo invia il pacchetto al connettore
   *
   * @param packet Pacchetto da inviare
   * @param connector Utente a cui inviarlo
   */
  public void sendPacket(WebSocketPacket packet, WebSocketConnector connector){
  	tokenServer.sendPacket(connector, packet);
  }

  public void processOpened(WebSocketServerEvent event) {}
  public void processClosed(WebSocketServerEvent event) {}
  public void processPacket(WebSocketServerEvent event, WebSocketPacket packet){}

}