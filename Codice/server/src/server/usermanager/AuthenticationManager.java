/**
* Nome: AuthenticationManager
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
import server.dao.*;
import server.shared.User;

/**
 * Classe che si occupa di gestire i login nel sistema
 * 
 * @author 
 * @version 
 */

public class AuthenticationManager{
  private RecordMessageDao messages;
  private LoginDao loginDao;
  private UserDao userDao;

  
  /** Costruttore con parametri della classe AuthenticationManager
   * @param connection riferimento alla classe che si occupa della connessione con il db
   * @param users lista degli utenti presenti
   * @param messages lista dei mex presenti
   * @param loginDao riferimento alla classe che implementa l'interfaccia LoginDao
   * @param userDaoriferimento alla classe che implementa l'interfaccia UserDao
   */
  public void init(RecordMessageDao messages, LoginDao loginDao, UserDao userDao){
	  this.messages=messages;
	  this.loginDao=loginDao;
	  this.userDao=userDao;
  }
   
  /** Metodo per il login, se ha buon esito carica anche i messaggi dell'utente
   * @param username username dell'utente che si sta autenticando 
   * @param password
   * @param IP
   * @return user esito operazione di login
   */
  public User login(String username, String password, String IP){
	  User user = loginDao.login(username, password, IP);
	  if(user!=null){	   
	  	messages.getMessages(user.getUsername());
	  }
	  return user; 
  }
   
  /** Metodo per segnalare al sistema il logout di un dipendente
   * @param user user del dipendente che ha effettuato il logout
   */
  public boolean logout(User user){
		return loginDao.logout(user);
  }
  
	/**Metodo che invoca il metodo di UserDao per creare un nuovo user
	 * @param username
	 * @param password
	 * @param name
	 * @param surname
	 * @param IP
	 * @return l'oggetto User se l'operazione ha buon fine, altrimenti null
	 */     
	public User createUser(String username, String password, String name, String surname, String IP){
		return userDao.createUser(username, password, name, surname, IP);
	}

	/**Metodo che invoca il metodo di UserDao per eliminare uno user
	 * @param username
	 * @return boolean operazione ha avuto buon esito o no
	 */	
	public boolean removeUser(String username){
		return userDao.removeUser(username);
	}
}