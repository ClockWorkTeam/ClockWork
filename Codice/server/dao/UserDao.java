/**
* Nome: UserDao
* Package: server.dao
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130306 |     ZHP       | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/ 

package server.dao;
import server.shared.*;


public interface UserDao{

	/**Metodo che registra un'utente nel DB 
	 * @param username
	 * @param password
	 * @param name
	 * @param surname
	 * @param IP
	 * @return l'oggetto User se l'operazione ha buon fine, altrimenti null
	 */     
	public User createUser(String username, String password, String name, String surname, String IP);
	
	/**Metodo che registra un'utente nel DB 
	 * @param username
	 * @return l'oggetto User se l'operazione ha buon fine, altrimenti null
	 */     
	public boolean removeUser(String username);
	
  /**Metodo che setta il campo password di un User nel DB
   * @param username dell'utente che vuole eseguire l'operazione
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setPassword(String username, String password);

  /**Metodo che setta il campo name di un User
   * @param user Oggetto User da cui si prendono le informazioni
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setName(String username, String name);

  /**Metodo che setta il campo surname di un User
   * @param user Oggetto User da cui si prendono le informazioni
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setSurname(String username, String surname);

}