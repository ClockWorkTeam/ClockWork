/**
* Nome: UserManager
* Package: server.usermanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/05/16
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130516 |     ZHP       | + getMessages |
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

public class UserManager{

  private UserDao userDao;
  private RecordMessageDao recordMessageDao;
  /** Costruttore con parametri della classe UserDataManager
   * @param access riferimento alla classe che implementa l'interfaccia DAOLogin
   */
  public UserManager(){
	this.userDao = UserDaoSQL.getInstance();
	this.recordMessageDao=RecordMessageDaoSQL.getInstance();
  }

  /**Metodo che controlla la corrispondenza tra l'username e la password
   * @param user
   * @param password
   * @return boolean
   */
  public boolean checkPassword(String username, String password){
	return userDao.checkPassword(username, password);
  }

  /**Metodo che setta il campo password di un User
   * @param utente che vuole eseguire l'operazione
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setPassword(String username, String password){
	return userDao.setPassword(username, password);
  }

  /**Metodo che setta il campo name e cognome di un User
   * @param user che vuole eseguire l'operazione
   * @param name la stringa del nuovo name del User
   * @param surname
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setUserData(String username, String name, String surname){
	User user= userDao.getUser(username);
	if(user!=null){
	  User userS=null;
	  if(!user.getName().equals(name)){
		userDao.setName(username, name);
		userS=userList.
	  }
		boolean s = userDao.setSurname(username, surname);
		return (n & s);
	}return false;
  }

  public User getUserData(String username){
	  return userDao.getUser(username);
  }
  /** Metodo che crea il messaggio in differita, e se l'utente destinatario è online restituisce RecordMessage
   * 
   * @param sender
   * @param addressee
   * @param path
   * @param date
   * @return
   * @throws Exception 
   */
  public RecordMessage createMessage(String sender, String addressee, String path, String date) throws Exception{
	RecordMessage message = new RecordMessage(sender, addressee, path, date);
	if( recordMessageDao.addMessage(message)){
	  if(userDao.getUser(addressee).getIP()!="0"){
		return message;
	  }else{
		return null;
	  }
	}else throw new Exception ("errore nella registrazione del messaggio");
  }

  /** Metodo che trova i messaggi inviati all'user
   * @param user Oggetto User ricevente dei messagi
   * @return vettore dei messaggi inviati all'user
   */
  public Vector<RecordMessage> getMessages(String username){
	return recordMessageDao.getAllMessages(username);
  }

  /** Metodo che elimina un dato messaggio
   * 
   * @param sender
   * @param addressee
   * @param path
   * @param date
   * @return
   */
  public boolean removeMessage(String sender, String addressee, String path, String date){
	RecordMessage message = new RecordMessage(sender, addressee, path, date);
	return recordMessageDao.removeMessage(message);
  }

}