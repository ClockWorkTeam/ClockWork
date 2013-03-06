/*
* Nome: User
* Package: org.server.shared
* Autore: Gavagnin Jessica
* Data: 2013/03/04
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130304 |      JG       | + ConnsessioneJavaSQLite |
* |         |               | + finalize               |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package mytalk.server.shared;

public class User {
	private String username;
  private String password;
 	private String name;
  private String surname;
	private String IP;
	private vector<RecordMessage> messages;

	/*Costruttore di User per effettuare il login 
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
		this.messages= new vector<RecordMessage>();
	}
	
	//Costruttore di User con tutti i parametri
	public User(String username, String password, String name, String surname, String IP){
		this.username=username;
		this.password=password;
		this.name=name;
		this.surname=surname;
		this.IP=IP;
		this.messages= new vector<RecordMessage>();
	}
	
//metodi get
	public String getUsername() const{
		return this.username;
	}
	public String getPassword()const{
		return this.password;
	}
	public String getName()const{
		return this.name;
	}
	public String getSurname()const{
		return this.surname;
	}
	public String getIP()const{
		return this.IP;
	}
	public vector<RecordMessage> getMessages(){
	 return messages;
	}
//metodi set	
	public void setPassword(String password){
		this.password=password;
	}
	public void setName(String name){
		this.name=name;
	}
	public void setSurname(String surname){
		this.surname=surname;
	}
	public void setIP(String IP){
		this.IP=IP;
	}
	public void setMessages(vector<RecordMessage> messages){
		this.messages=messages;
	}
	public void getMessage(RecordMessage message){
		this.messages.add(message);
	}
	public void removeMessage(RecordMessage message){
		this.messages.remove(message);
	}
}
