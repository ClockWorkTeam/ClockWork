/**
* Nome: UserDao
* Package: server.dao
* Autore: Gavagnin Jessica
* Data: 2013/04/02
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130402 |     GJ        | + setSurname             |
* |         |               | + setName                |
* |         |               | + setPassword            |
* |         |				| + checkPassword          |
* |         |               | + getAllUsers            |
* |         |               | + getUser                |
* |         |               | + removeUser             |
* |         |               | + createUser             |
* |         |               | + creazione documento    |
* +---------+---------------+--------------------------+
*
*/

package server.dao;
import server.shared.User;
import java.util.Vector;

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

	/**Metodo che elimina un utente dal DB
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

	/**Metodo che restituisce l'Utente associato al dato username
	 * @param username Username dell'utente che si cerca
	 * @return User corrispondente o null se non esiste l'utente
	 */
	public User getUser(String username);

	/**Metodo che controlla la corrispondenza tra l'username e la password
	 * @param username Username dell'utente
	 * @param password inserita
	 * @return boolean
	 */
	public boolean checkPassword(String username, String password);

	/**Metodo che restituisce tutti i contatti
	 * @return vector<User>
	 */
	public Vector<User> getAllUsers();

}