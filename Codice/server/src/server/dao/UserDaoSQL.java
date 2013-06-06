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
import java.util.Vector;

public class UserDaoSQL implements UserDao{
	private JavaConnectionSQLite connection;
	private UserList userList;

	public UserDaoSQL(JavaConnectionSQLite connection, UserList users){
		this.connection=connection;
		this.userList=users;
		getUsersFromDB();
	}

	/**Metodo che registra un'utente nel DB
	 * @param username
	 * @param password
	 * @param name
	 * @param surname
	 * @param IP
	 * @return l'oggetto User se l'operazione ha buon fine, altrimenti null
	 */
	public User createUser(String username, String password, String name, String surname, String IP){
		User user=null;
		if(userList.getUser(username)==null){
			 user = new User(username, name, surname, IP);
			 userList.addUser(user);
			 connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('"+username+"','"+password+"','"+name+"','"+surname+"','"+IP+"');");
		}
		return user;
	}

	/**Metodo che elimina un'utente nel DB
	 * @param username
	 * @return l'oggetto User se l'operazione ha buon fine, altrimenti null
	 */
	public boolean removeUser(String username){
		boolean done = userList.removeUser(username);
		 if(done){
			 done= connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='"+username+"';");
		 }
		 return done;
	}

  /**Metodo che setta il campo password di un User nel DB
   * @param username dell'utente che vuole eseguire l'operazione
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
	public boolean setPassword(String username, String password){
		User user=userList.getUser(username);
		boolean done;
		if(user==null){
			done=false;
		}else{
			done = connection.executeUpdate("UPDATE UserDataSQL SET password='"+password+"' WHERE username='"+username+"';");
		}
		return done;
	}

  /**Metodo che setta il campo name di un utente
  * @param username Stringa dell'utente da cui si prendono le informazioni
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
	public boolean setName(String username, String name){
		User user=userList.getUser(username);
		boolean done;
		if(user==null){
			done=false;
		}else{
			done = connection.executeUpdate("UPDATE UserDataSQL SET name='"+name+"' WHERE username='"+username+"';");
	    	if(done){
	    		user.setName(name);
	    	}
		}
		return done;
	}

  /**Metodo che setta il campo surname di un utente
   * @param username Stringa dell'utente da cui si prendono le informazioni
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */
	public boolean setSurname(String username, String surname){
		User user=userList.getUser(username);
		boolean done;
		if(user==null){
			done=false;
		}else{
			done = connection.executeUpdate("UPDATE UserDataSQL SET surname='"+surname+"' WHERE username='"+username+"';");
	    	if(done){
	    		user.setSurname(surname);
	    	}
		}
		return done;
	}

	/**Metodo che restituisce l'Utente associato al dato username
	 * @param username Username dell'utente che si cerca
	 * @return User corrispondente o null se non esiste l'utente
	 */
	public User getUser(String username){
		return userList.getUser(username);
	}
	/**Metodo che restituisce tutti i contatti presenti nel db
	 * @return vector<User>
	 */
	public Vector<User> getAllUsers(){
		return userList.getAllUsers();
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

	/**Metodo che restituisce tutti gli utenti registrati
	 * @return vector<User>
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
