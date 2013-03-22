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
		 if(users.addUser(user)){
			 if(!connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('"+username+"','"+password+"','"+name+"','"+surname+"','"+IP+"');")){ 
				 users.removeUser(user.getUsername());
				 user=null;
			 }
		 }else{user=null;}
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
}
