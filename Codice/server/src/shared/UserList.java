/**
* Nome: UserList
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

public class UserList {
	private Vector<User> users;

	public UserList(){
		users=new Vector<User>();
	}
	
	/**Metodo che inserisce un nuovo utente nella lista degli utenti
	 * @param user (nuovo user da inserire)
	 * @param boolean, operazione ha avuto succeso o meno (in particolare se l'utente era già presente)
	 */
	public boolean addUser(User user){
		User check= getUser(user.getUsername());
		if(check==null){
			users.add(user);
			return true;
		}
		return false;
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
	
	/** Metodo che elimina un utente dal vettore di utenti
	 * @param username Username dell'utente da eliminare
	 * return boolean che corrisponde al successo dell'operazione
	 */
	public boolean removeUser(String username){
		User user=getUser(username);
		if(user!=null){
			users.remove(user);
			return true;
		}
		return false;
	}
}