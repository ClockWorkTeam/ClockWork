/*
* Nome: UserDataDao
* Package: org.server.dao
* Autore: Gavagnin Jessica
* Data: 2013/03/04
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130304 |      JG       | + ConnsessioneJavaSQLite |
* |         |               | + finalize               |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package org.server.dao;
import org.server.shared.*;
import java.sql.*;

public UserDataDaoSQL implements UserDataDao{
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
			surname=rs.getSurname("surname");
		}catch(SQLException e){return null;} 
		user.setName(name);
		user.setSurname(surname);
		return user;
	}

	/*Metodo che prende i messaggi di un User dal database 
   * @param user Oggetto User usato per Login (quindi solo con i campi username e password) da cui si prendono le informazioni
   * @return l'oggetto User istanziato se presente nel db, altrimenti null
   */     
	public void getMessages(User user, vector<RecordMessage> messages){
		user.setMessages(messages);
	}

  /*Metodo che setta i campi di un User nel DB
   * @param user Oggetto User da cui si prendono le informazioni
   * @param password la stringa della nuova password del User
   * @param name la stringa del nuovo name del User
   * @param surname la stringa del nuovo surname del User
   * @param IP la stringa del nuovo IP del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setInfo(User user, String password, String name, String surname){
		String username=user.getUsername();
		String oldpassword=user.getPassword();
		try{
    	connection.executeUpdate("UPDATE UserDataSQL SET password='"+password+"', name='"+name+"', surname='"+surname+"' WHERE username='"+username+"' AND (password='"+oldpassword+"');");
    	user.setPassword(password);
    	user.setName(name);
    	user.setSurname(surname);
    }catch(SQLException e){return false;}
		return true;	
	}
	
  /*Metodo che setta il campo password di un User nel DB
   * @param user Oggetto User da cui si prendono le informazioni
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setPassword(User user, String password){
		String username=user.getUsername();
		String oldpassword=user.getPassword();
		try{
    	connection.executeUpdate("UPDATE UserDataSQL SET password='"+password+"' WHERE username='"+username+"' AND (password='"+oldpassword+"');");
    	user.setPassword(password);
    }catch(SQLException e){return false;}
		return true;
	}

  /*Metodo che setta il campo name di un User
   * @param user Oggetto User da cui si prendono le informazioni
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setName(User user, String name){
		String username=user.getUsername();
		String password=user.getPassword();
		try{
    	connection.executeUpdate("UPDATE UserDataSQL SET name='"+name+"'' WHERE username='"+username+"' AND (password='"+password+"');");
    	user.setName(name);
    }catch(SQLException e){return false;}
		return true;	
	}

  /*Metodo che setta il campo surname di un User
   * @param user Oggetto User da cui si prendono le informazioni
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setSurname(User user, String surname){
		String username=user.getUsername();
		String password=user.getPassword();
		try{
    	connection.executeUpdate("UPDATE UserDataSQL SET surname='"+surname+"' WHERE username='"+username+"' AND (password='"+password+"');");
    	user.setSurname(surname);
    }catch(SQLException e){return false;}
		return true;	
	}
}
