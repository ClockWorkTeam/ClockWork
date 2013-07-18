/**
* Nome: UserList
* Package: server.shared
* Autore: Gavagnin Jessica
* Data: 2013/04/10
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
*  |         |               | + trasformata in Singleton     |
* |         |               | + tolti controlli in     |
* |         |               |  addUser e removeUser    |
* +---------+---------------+--------------------------+
* | 1300410 |     GJ        | + getAllUsers            |
* |         |               | + getUser                |
* |         |               | + removeUser             |
* |         |               | + addUser                |
* |         |               | + UserList               |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package server.shared;
import java.util.Vector;


public class UserList {
  private Vector<User> users;
  private static UserList userList=null;
  
  private UserList(){
	users=new Vector<User>();
  }

  /**Metodo che inserisce un nuovo utente nella lista degli utenti
   * @param user (nuovo user da inserire)
   */
  public void addUser(User user){
	users.add(user);
  }

  /** Metodo che elimina un utente dal vettore di utenti
   * @param user utente da eliminare
   */
  public void removeUser(User user){
	users.remove(user);
  }

  /**Metodo che restituisce l'utent corrispondente ad un dato username
   * @param username dell'utente da cercare
   * @return user dell'utente trovato, o null se non presente
   */
  public User getUser(String username){
	for(int i=0; i< users.size(); i++){
	  if(username.equals((users.get(i)).getUsername()))
		return users.get(i);
	}
	return null;
  }

  /**Metodo che restituisce tutta la lista di utenti
	*
	* @return vettor degli utenti presenti
	*/
  public Vector<User> getAllUsers(){
	return users;
  }
  
  public static UserList getInstance(){
	  if(userList==null){
		  userList=new UserList();
	  }
	  return userList;
  }
  
  public void removeAll(){
	  users.removeAllElements();
  }
}