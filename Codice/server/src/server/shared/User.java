/**
* Nome: User
* Package: server.shared
* Autore: Gavagnin Jessica
* Data: 2013/04/10
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |         |               | + tolto messages         |
* +---------+---------------+--------------------------+
* |  130410 |      GJ       | + removeMessage          |
* |         |               | + setMessages            |
* |         |               | + getMessages            |
* |         |               | + setMessage             |
* |         |               | + setIP                  |
* |         |               | + setSurname             |
* |         |               | + setName                |
* |         |               | + getIP                  |
* |         |               | + getSurname             |
* |         |               | + getName                |
* |         |               | + getUsername            |
* |         |               | + User                   |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*/

package server.shared;

/**
 * classe che rappresenta la struttura dati User del server
 *
 */
public class User {
  private String username;
  private String name;
  private String surname;
  private String IP;

  /**Costruttore di User 
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
}