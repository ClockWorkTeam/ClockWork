/**
* Nome: User
* Package: server.shared
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/05
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130305 |     ZHP       | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/ 

package server.shared;
import java.util.Vector;

/**
 * classe che rappresenta la struttura dati User del server
 *
 */
public class User {
  private String username;
  private String name;
  private String surname;
  private String IP;
  private Vector<RecordMessage> messages;

	
  /**Costruttore di User con tutti i parametri (tranne password e messaggi)
   * @param username
   * @param name
   * @param surname
   * @param IP
   */
  public User(String username, String name, String surname, String IP){
    this.username=username;
	this.name=name;
	this.surname=surname;
	this.IP=IP;
	this.messages= new Vector<RecordMessage>();
  }
//metodi get
  public String getUsername(){
    return this.username;
  }
  public String getName(){
	return this.name;
  }
  public String getSurname(){
	  return this.surname;
  }
  public String getIP(){
	  return this.IP;
  }

//metodi set	
  public void setName(String name){
	this.name=name;
  }
  public void setSurname(String surname){
	this.surname=surname;
  }
  public void setIP(String IP){
	  this.IP=IP;
  }

//metodi dei messaggi
  public Vector<RecordMessage> getMessages(){
	  return messages;
  }
  public void setMessages(Vector<RecordMessage> messagesNew){
	  this.messages=messagesNew;
  }
  public void setMessage(RecordMessage message){
		 this.messages.add(message);
  }
	
  public void removeMessage(RecordMessage message){
	  this.messages.remove(message);
  }
}