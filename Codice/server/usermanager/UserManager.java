/**
* Nome: UserManager
* Package: server.usermanager
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

package server.usermanager;
import java.util.Date;
import java.util.Vector;

import server.dao.*;
import server.shared.*;

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
 
  /**Metodo che setta il campo password di un User
   * @param utente che vuole eseguire l'operazione
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
  public boolean setPassword(User user, String password){
	  return userDao.setPassword(user.getUsername(), password);
  }
  
  /**Metodo che setta il campo name di un User
   * @param user che vuole eseguire l'operazione
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setName(User user, String name){
		return userDao.setName(user.getUsername(), name);
	}
	
  /**Metodo che setta il campo surname di un User
   * @param user che vuole eseguire l'operazione
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setSurname(User user, String surname){
		return userDao.setSurname(user.getSurname(), surname);
	}

	public RecordMessage createMessage(String sender, String addressee, String path, Date date){
		return messageDao.createMessage(sender, addressee, path, date);
	}
  
  public boolean removeMessage(RecordMessage message){
	return messageDao.removeMessage(message);
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