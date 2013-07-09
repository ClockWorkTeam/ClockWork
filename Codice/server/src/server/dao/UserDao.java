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
* |   |             | + addUser invece di createUser        |
* |  		 |            | + rimosso getAllUser       |
* * |  		 |            | + modificato getUser in    |
* * |  		 |            | 	findUser       |
* * |  		 |            | + aggiunto setIP       |
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

public interface UserDao{

  /**Metodo che registra un'utente nel DB
   * @param utente da aggiungere nel database
   * @param password dell'utente da aggiungere
   * @return true se l'operazione ha buon fine, altrimenti false se l'username era già presente
   */
  public boolean addUser(User user, String password);

  /**Metodo che elimina un utente dal DB
   * @param username
   * @return true se l'operazione ha buon fine, altrimenti false
   */
  public boolean removeUser(String username);

  /**Metodo che restituisce l'Utente associato al dato username
   * @param username Username dell'utente che si cerca
   * @return user l'utente corrispondente allo username dato presente nel database, altrimenti null
   */
  public User getUser(String username);

  
  /**Metodo che controlla la corrispondenza tra l'username e la password
   * @param username Username dell'utente
   * @param password inserita
   * @return boolean
   */
  public boolean checkPassword(String username, String password);

  /**Metodo che setta il campo password di un User nel DB
   * @param username dell'utente che vuole eseguire l'operazione
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setPassword(String username, String password);

  /**Metodo che setta il campo name di un User
   * @param username dell'utente che vuole eseguire l'operazione
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setName(String username, String name);

  /**Metodo che setta il campo surname di un User
   * @param username dell'utente che vuole eseguire l'operazione
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setSurname(String username, String surname);

  /**Metodo che setta il campo IP di un User
   * @param username dell'utente che vuole eseguire l'operazione
   * @param IP la stringa del nuovo IP del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setIP(String username, String IP);
  
}