/**
* Nome: UserManager
* Package: server.usermanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/04/16
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130416 |     ZHP       | + getMessages |
* |         |               | + getMessage |
* |         |               | + createMessage |
* |         |               | + getAllUsers |
* |         |               | + getUser |
* |         |               | + setUserData |
* |         |               | + setPassword |
* |         |               | + checkPassword |
* |         |               | + init |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package server.usermanager;
import java.util.Vector;
import server.dao.*;
import server.shared.User;
import server.shared.RecordMessage;

/**
 * Classe che si occupa di gestire le operazioni dell'utente
 *
 */

public class UserManager{

  private UserDao userDao;
  private RecordMessageDao messageDao;
  /** Costruttore con parametri della classe UserDataManager
   * @param access riferimento alla classe che implementa l'interfaccia DAOLogin
   */
  public void init(UserDao userDao, RecordMessageDao messageDao){
		this.userDao = userDao;
		this.messageDao=messageDao;
  }

  /**Metodo che controlla la corrispondenza tra l'username e la password
   * @param user
   * @param password
   * @return boolean
   */
  public boolean checkPassword(User user, String password){
	return this.userDao.checkPassword(user.getUsername(), password);
  }

  /**Metodo che setta il campo password di un User
   * @param utente che vuole eseguire l'operazione
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setPassword(User user, String password){
	  return userDao.setPassword(user.getUsername(), password);
  }

  /**Metodo che setta il campo name e cognome di un User
   * @param user che vuole eseguire l'operazione
   * @param name la stringa del nuovo name del User
   * @param surname
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
	public boolean setUserData(User user, String name, String surname){
		boolean n = userDao.setName(user.getUsername(), name);
		boolean s = userDao.setSurname(user.getUsername(), surname);
		return (n & s);
	}

	public RecordMessage createMessage(String sender, String addressee, String path, String date){
		return messageDao.createMessage(sender, addressee, path, date);
	}

	public Vector<RecordMessage> getMessages(String username){
		return messageDao.getAllMessages(username);
	}

	public RecordMessage getMessage(String sender, String addressee, String path, String date){
		return messageDao.getMessage(sender, addressee, path, date);
	}
	public boolean removeMessage(String sender, String addressee, String path, String date){
		return messageDao.removeMessage(messageDao.getMessage(sender, addressee, path, date));
	}

  public User getUser(String username){
	  return userDao.getUser(username);
  }
  public Vector<User> getAllContacts(User user){
	  Vector<User> contacts = new Vector<User>(userDao.getAllUsers());
	  contacts.remove(user);
	  return contacts;
  }
}