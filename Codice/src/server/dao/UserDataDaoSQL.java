/**
* Nome: UserDataDaoSQL
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

import java.sql.*;
import java.util.Vector;

public class UserDataDaoSQL implements UserDataDao{
	private JavaConnectionSQLite connection;
	
	public UserDataDaoSQL(JavaConnectionSQLite connection){
		this.connection=connection;
	}
	
	/*Metodo che prende le informazioni di un User dal database 
   * @param user Oggetto User usato per Login (quindi solo con i campi username e password) da cui si prendono le informazioni
   * @return l'oggetto User istanziato se presente nel db, altrimenti null
   */     
	public User getInfo(User user){
		String username = user.getUsername();
        String password = user.getPassword();
		ResultSet rs = connection.select("UserDataSQL","*", "username='"+username+"' AND (password='"+password+"')","");
		String name,surname;
		try{
			name=rs.getString("name");
			surname=rs.getString("surname");
		}catch(SQLException e){return null;} 
		user.setName(name);
		user.setSurname(surname);
		return user;
	}

	/*Metodo che prende le informazioni di un User dal database 
	 * @param usernae Oggetto Username del contatto da cui si prendono le informazioni
	 * @return l'oggetto User istanziato se presente nel db, altrimenti null
	 */     
	 public User getContactInfo(String username){
			ResultSet rs = connection.select("UserDataSQL","*", "username='"+username+"'","");
			String name,surname, IP;
			try{
				name=rs.getString("name");
				surname=rs.getString("surname");
				IP = rs.getString("IP");
			}catch(SQLException e){return null;} 
			
			return new User(username,"",name,surname,IP);		 
	 }

	/*Metodo che prende i messaggi di un User dal database 
   * @param user Oggetto User usato per Login (quindi solo con i campi username e password) da cui si prendono le informazioni
   * @return l'oggetto User istanziato se presente nel db, altrimenti null
   */     
	public void getMessages(User user, Vector<RecordMessage> messages){
		user.setMessages(messages);
	}

	  /*Metodo che crea un User nel DB
	   * @param username 
	   * @param password 
	   * @param name 
	   * @param surname 
	   * @param IP
	   * @return boolean che indica se l'operazione e' andata o meno a buon fine
	   */   
	  public boolean setUser(User user){
		  boolean done= connection.executeUpdate("INSERT INTO UserDataSQL VALUES ("+user.getUsername()+","+user.getPassword()+","+user.getName()+","+user.getSurname()+","+user.getIP()+");");
	      return done;
	  }

	
	
	/*Metodo che setta i campi di un User nel DB
   * @param user Oggetto User da cui si prendono le informazioni
   * @param password la stringa della nuova password del User
   * @param name la stringa del nuovo name del User
   * @param surname la stringa del nuovo surname del User
   * @param IP la stringa del nuovo IP del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setAllInfo(User user, String password, String name, String surname){
		String username=user.getUsername();
		String oldpassword=user.getPassword();
    	boolean done = connection.executeUpdate("UPDATE UserDataSQL SET password='"+password+"', name='"+name+"', surname='"+surname+"' WHERE username='"+username+"' AND (password='"+oldpassword+"');");
		if(done){
			user.setPassword(password);
			user.setName(name);
			user.setSurname(surname);
		}
		return done;	
	}
	
  /*Metodo che setta il campo password di un User nel DB
   * @param user Oggetto User da cui si prendono le informazioni
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setPassword(User user, String password){
		String username=user.getUsername();
		String oldpassword=user.getPassword();
		boolean done = connection.executeUpdate("UPDATE UserDataSQL SET password='"+password+"' WHERE username='"+username+"' AND (password='"+oldpassword+"');");
    	if(done){
    		user.setPassword(password);
    	}
		return done;
	}

  /*Metodo che setta il campo name di un User
   * @param user Oggetto User da cui si prendono le informazioni
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setName(User user, String name){
		String username=user.getUsername();
		String password=user.getPassword();
		boolean done = connection.executeUpdate("UPDATE UserDataSQL SET name='"+name+"'' WHERE username='"+username+"' AND (password='"+password+"');");
    	if(done){
    		user.setName(name);
    	}
		return done;	
	}

  /*Metodo che setta il campo surname di un User
   * @param user Oggetto User da cui si prendono le informazioni
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setSurname(User user, String surname){
		String username=user.getUsername();
		String password=user.getPassword();
		boolean done = connection.executeUpdate("UPDATE UserDataSQL SET surname='"+surname+"' WHERE username='"+username+"' AND (password='"+password+"');");
    	if(done){
    		user.setSurname(surname);
    	}
		return done;	
	}
}