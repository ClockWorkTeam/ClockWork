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
public class User {
  private String username;
  private String password;
  private String name;
  private String surname;
  private String IP;
  private Vector<RecordMessage> messages;

  /**Costruttore di User per effettuare il login 
   * @param username Stringa dell'username dato alla login
   * @param password Stringa della password data alla login
   * @param IP Stringa dell'IP del client che sta effettuando la login
   */     
  public User(String username, String password, String IP){
    this.username=username;
	this.password=password;
	this.name="";
	this.surname="";
	this.IP=IP;
	this.messages= new Vector<RecordMessage>();
  }
	
  /**Costruttore di User con tutti i parametri (tranne messaggi)
   * @param username
   * @param password
   * @param name
   * @param surname
   * @param IP
   */
  public User(String username, String password, String name, String surname, String IP){
    this.username=username;
	this.password=password;
	this.name=name;
	this.surname=surname;
	this.IP=IP;
	this.messages= new Vector<RecordMessage>();
  }
	
  /**Metodo che restituisce l'username
   * @return
   */
  public String getUsername(){
    return this.username;
  }
  
  /**Metodo che restituisce la password
   * @return
   */
  public String getPassword(){
    return this.password;
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
	/**
	 * @param password
	 */
	public void setPassword(String password){
		this.password=password;
	}
	
	/**
	 * @param name
	 */
	public void setName(String name){
		this.name=name;
	}
	
	/**
	 * @param surname
	 */
	public void setSurname(String surname){
		this.surname=surname;
	}
	public void setIP(String IP){
		this.IP=IP;
	}

//metodi dei messaggi
	/**
	 * @return
	 */
	public Vector<RecordMessage> getMessages(){
	 return messages;
	}
	/**
	 * @param messages
	 */
	public void setMessages(Vector<RecordMessage> messages){
		this.messages=messages;
	}
	
	/**
	 * @param message
	 */
	public boolean isUserMessage(RecordMessage message){
		int pos =this.messages.indexOf(message);
		return (pos!=-1);
	}

	/**
	 * @param message
	 */
	public void setMessage(RecordMessage message){
		this.messages.add(message);
	}
	
	/**
	 * @param message
	 */
	public void removeMessage(RecordMessage message){
		this.messages.remove(message);
	}
}