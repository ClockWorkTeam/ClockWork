/**
* Nome: UserDaoSQL
* Package: server.dao
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/05
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130305 |     ZHP       | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package server.dao;
import server.shared.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Vector;

public class UserDaoSQL implements UserDao{
	private JavaConnectionSQLite connection;
	private UserList users;
	
	public UserDaoSQL(JavaConnectionSQLite connection, UserList users){
		this.connection=connection;
		this.users=users;
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
		 User user = new User(username, name, surname, IP);
		 ResultSet rs =connection.select("UserDataSQL", "*", "username='"+username+"'", "");
		 try{
			 System.out.println(rs.getString("name"));
			 rs.getString("name"); //presente nel DB
			 if(users.getUser(username)==null){ //ma non nella lista
				 users.addUser(new User(rs.getString("username"), rs.getString("name"),rs.getString("surname"), rs.getString("IP")));
			 }
			 user=null;
		 }catch(SQLException e){//non presente nel db
			 User user2=users.getUser(username);
			 if(user2==null){//non presente nella lista
				 connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('"+username+"','"+password+"','"+name+"','"+surname+"','"+IP+"');");
			 }
		 }
	     return user;
	}
	    
	/**Metodo che elimina un'utente nel DB 
	 * @param username
	 * @return l'oggetto User se l'operazione ha buon fine, altrimenti null
	 */     
	public boolean removeUser(String username){
		boolean done = connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='"+username+"';");
		 if(done){
			 done= users.removeUser(username);
		 }
		 return done;
	}
		 
  /**Metodo che setta il campo password di un User nel DB
   * @param username dell'utente che vuole eseguire l'operazione
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setPassword(String username, String password){
		User user=users.getUser(username);
		if(user==null){return false;}
		boolean done = connection.executeUpdate("UPDATE UserDataSQL SET password='"+password+"' WHERE username='"+username+"';");
		return done;
	}

  /**Metodo che setta il campo name di un User
  * @param username Stringa dell'utente da cui si prendono le informazioni
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setName(String username, String name){
		User user=users.getUser(username);
		if(user==null){return false;}
		boolean done = connection.executeUpdate("UPDATE UserDataSQL SET name='"+name+"' WHERE username='"+username+"';");
    	if(done){ user.setName(name); }
		return done;	
	}

  /**Metodo che setta il campo surname di un User
   * @param username Stringa dell'utente da cui si prendono le informazioni
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setSurname(String username, String surname){
		User user=users.getUser(username);
		if(user==null){return false;}
		boolean done = connection.executeUpdate("UPDATE UserDataSQL SET surname='"+surname+"' WHERE username='"+username+"';");
    	if(done){
    		user.setSurname(surname);
    	}
		return done;
	}

	/**Metodo che restituisce l'Utente associato al dato username
	 * @param username Username dell'utente che si cerca
	 * @return User corrispondente o null se non esiste l'utente
	 */
	public User getUser(String username){
		return users.getUser(username);
	}
	/**Metodo che restituisce tutti i contatti presenti nel db
	 * @return vector<User>
	 */
	public Vector<User> getAllUsers(){
		return users.getAllUsers();
	}
}
