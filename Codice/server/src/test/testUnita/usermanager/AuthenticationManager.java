/**
* Nome: AuthenticationManager
* Package: server.usermanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/05/17
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |   |           | + modifiche successive alle modifiche di DAO             |
* +---------+---------------+--------------------------+
* |  130517 |     ZHP       | + removeUser             |
* |         |               | + logout                 |
* |         |               | + login                  |
* |         |               | + createUser             |
* |         |               | + init                   |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package test.testUnita.usermanager;
import java.util.Vector;
import server.dao.UserDao;
import server.shared.User;
import server.shared.UserList;

public class AuthenticationManager{
  private UserDao userDao;
  private UserList userList;

  /** Costruttore con parametri della classe AuthenticationManager
   * @param connection riferimento alla classe che si occupa della connessione con il db
   * @param users lista degli utenti presenti
   * @param messages lista dei mex presenti
   * @param loginDao riferimento alla classe che implementa l'interfaccia LoginDao
   * @param userDaoriferimento alla classe che implementa l'interfaccia UserDao
   */
  public AuthenticationManager(){
	this.userDao=UserDaoSQL.getInstance();
	this.userList=UserList.getInstance();
  }

  /** Metodo per il login, se ha buon esito carica anche i messaggi dell'utente
   * @param username username dell'utente che si sta autenticando
   * @param password
   * @param IP
   * @return user esito operazione di login
 * @throws Exception 
   */
  public User login(String username, String password, String IP) throws Exception{
	User user= userDao.getUser(username);
	if(user!=null){
	  if(userDao.checkPassword(username, password)){
		userDao.setIP(username, IP);
		User userTmp=userList.getUser(username);
		if(userTmp==null){
		  userList.addUser(user);
		  userTmp=user;
		}
		userTmp.setIP(IP);
		return userTmp;
	  }else throw new Exception("Password errata"); 
	}else throw new Exception("Username errato");
  }

  /** Metodo per segnalare al sistema il logout di un dipendente
   * @param user user del dipendente che ha effettuato il logout
   */
  public User logout(String username){
	User user= userDao.getUser(username);
	if(user!=null){
	  userDao.setIP(username, "0");
	  User userTmp=userList.getUser(username);
	  if(userTmp==null){
		userList.addUser(user);
		userTmp=user;
	  }
	  userTmp.setIP("0");
	  return userTmp;
	}
	return user;
  }

  /**Metodo che invoca il metodo di UserDao per creare un nuovo user
   * @param username
   * @param password
   * @param name
   * @param surname
   * @param IP
   * @return boolean
 * @throws Exception 
   */
  public User createUser(String username, String password, String name, String surname, String IP) throws Exception{
	if(userDao.getUser(username)==null){
	  User user = new User(username, name, surname, IP);
	  boolean result = userDao.addUser(user, password);
	  if(result){
		userList.addUser(user);
	    return user;
	  }else{
		  throw new Exception("Operazione di registrazione fallita");
	  }
	}else{
	  throw new Exception("Username utilizzato da un altro utente");
	}
  }

  /**Metodo che invoca il metodo di UserDao per eliminare uno user
   * @param username
   * @return boolean operazione ha avuto buon esito o no
   */
  public boolean removeUser(String username){
    if(userDao.getUser(username)!=null){
	  boolean result = userDao.removeUser(username);
	  if(result){
	    userList.removeUser(userList.getUser(username));
	  }
	  return result;
    }else return true;
  }
  
  public Vector<User> getAllContacts(String username){
	Vector<User> contacts = new Vector<User>(userList.getAllUsers());
	contacts.remove(userList.getUser(username));
	return contacts;
  }
}