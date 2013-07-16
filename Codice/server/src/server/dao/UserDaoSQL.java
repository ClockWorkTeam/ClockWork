/**
* Nome: UserDaoSQL
* Package: server.dao
* Autore: Gavagnin Jessica
* Data: 2013/04/02
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+------------------------+
* | Data    | Programmatore |         Modifiche      |
* +---------+---------------+--------------------------+
* |  		 |            | + traformata in Singleton|
* |  		 |            | + tolti controlli nei metodi|
* |  		 |            | + rimosso getAllUser       |
* * |  		 |            | + aggiunto setIP       |
* +---------+---------------+------------------------+
* |  130402 |     GJ        | + removeUser           |
* |         |               | + checkPassword        |
* |         |               | + setSurname           |
* |         |               | + setName              |
* |         |               | + setPassword 	     |
* |         |               | + getUser              |
* |         |               | + getAllUsers          |
* |         |               | + getUserFromDB        |
* |         |               |  + createUser          |
* |         |               |  + UserDaoSQL          |
* |         |               |  + creazione documento |
* +---------+---------------+------------------------+
*
*/

package server.dao;
import server.shared.UserList;
import server.shared.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDaoSQL implements UserDao{
  private JavaConnectionSQLite connection;
  private UserList userList;
  private static UserDaoSQL userDaoSQL=null; 

  private UserDaoSQL(){
	this.connection=JavaConnectionSQLite.getInstance();
	this.userList=UserList.getInstance();
	getUsersFromDB();
  }
  
  public static UserDaoSQL getInstance(){
	if(userDaoSQL==null){
	  userDaoSQL= new UserDaoSQL();
	}
	return userDaoSQL;
  }

  /**Metodo che restituisce l'Utente associato al dato username
   * @param username Username dell'utente che si cerca
   * @return true se l'utente è presente nel database, altrimenti false
   */
  public User getUser(String username){
	ResultSet rs = connection.select("UserDataSQL","*", "username='"+username+"'","");
	User user =null;
	String name, surname, IP;
	try{
	  name = rs.getString("name");
	  surname = rs.getString("surname");
      IP = rs.getString("IP");
	  user = new User(username, name, surname, IP);
	}catch(Exception e){ return null;}
	return user;
  }

  /**Metodo che registra un'utente nel DB
   * @param utente da aggiungere nel database
   * @return true se l'operazione ha buon fine, altrimenti false se l'username era già presente
   */
  public boolean addUser(User user, String password){
	return connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('"+user.getUsername()+"','"+password+"','"+user.getName()+"','"+user.getSurname()+"','"+user.getIP()+"');");
  }

  /**Metodo che elimina un utente dal DB
   * @param username
   * @return true se l'operazione ha buon fine, altrimenti false
   */
  public boolean removeUser(String username){
	return connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='"+username+"';");
  }

  /**Metodo che controlla la corrispondenza tra lo username e la password
   * @param username Username dell'utente
   * @param password inserita
   * @return boolean
   */
  public boolean checkPassword(String username, String password){
 	ResultSet rs = connection.select("UserDataSQL","*", "username='"+username+"' AND (password='"+password+"')","");
 	try{
	  rs.getString("username");
	}catch(SQLException e){return false;}
	return true;
  }

  /**Metodo che setta il campo password di un User nel DB
   * @param username dell'utente che vuole eseguire l'operazione
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setPassword(String username, String password){
	return connection.executeUpdate("UPDATE UserDataSQL SET password='"+password+"' WHERE username='"+username+"';");
  }

  /**Metodo che setta il campo name di un utente
   * @param username Stringa dell'utente da cui si prendono le informazioni
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setName(String username, String name){
	return connection.executeUpdate("UPDATE UserDataSQL SET name='"+name+"' WHERE username='"+username+"';");
  }

  /**Metodo che setta il campo surname di un utente
   * @param username Stringa dell'utente da cui si prendono le informazioni
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setSurname(String username, String surname){
    return connection.executeUpdate("UPDATE UserDataSQL SET surname='"+surname+"' WHERE username='"+username+"';");
  }

  /**Metodo che setta il campo IP di un User
   * @param username dell'utente che vuole eseguire l'operazione
   * @param IP la stringa del nuovo IP del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
  public boolean setIP(String username, String IP){
	  return connection.executeUpdate("UPDATE UserDataSQL SET IP='"+IP+"' WHERE username='"+username+"';");
  }

  /**Metodo che inserisce in userList tutti gli utenti registrati nel database
   */
  private void getUsersFromDB(){
	ResultSet rs =connection.select("UserDataSQL", "*", "", "");
	if(rs!=null){
	  String username, name, surname, IP;
	  try{
		do{
		  username = rs.getString("username");
		  name = rs.getString("name");
		  surname = rs.getString("surname");
		  IP = rs.getString("IP");
		  userList.addUser(new User(username, name, surname, IP));
		}while(rs.next());
	  }catch(SQLException e){}
    }
  }	
}