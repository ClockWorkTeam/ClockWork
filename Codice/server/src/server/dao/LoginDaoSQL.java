/**
* Nome: LoginDaoSQL
* Package: server.dao
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

package server.dao;
import server.shared.*;

import java.sql.ResultSet;
import java.sql.SQLException;

/**
 * Classe che gestisce i login, implementa i metodi pubblici dell'interfaccia LoginDao
 *
 */

public class LoginDaoSQL implements LoginDao{
  private JavaConnectionSQLite connection;
  private UserList userList;
  /**
   * Costruttore della classe LoginDaoSQL
   * @param azienda indirizzo del server aziendale
   */
  public LoginDaoSQL(JavaConnectionSQLite server, UserList users){
    connection=server;
    this.userList=users;
  }

  /**
   * Metodo che effettua il login
   * @param username Username inserito dall'utente per accedere
   * @param password Password inserita dall'utente per accedere
   * @param IP della connessione del computer dell'utente
   * @return User che rappresenta l'utente corrispondente nel DB,se la login ha avuto successo, o null se i dati sono sbagliati
   */
  public User login(String username, String password, String IP){
	  ResultSet rs = connection.select("UserDataSQL","*", "username='"+username+"' AND (password='"+password+"')","");
	  try{
		  rs.getString("username");
	  }catch(SQLException e){return null;}
	  User user =userList.getUser(username);
	  user.setIP(IP);
	  return user;
  }

  /** Metodo che effettua il logout
   *
   * @param user Oggetto User dell'utente che vuole disconnettersi
   * @return un boolean che indica se il logout e` avvenuto con successo o no
   */
  public boolean logout(User user){
    user.setIP("0");
    return 	connection.executeUpdate("UPDATE UserDataSQL SET IP='0' WHERE username='"+user.getUsername()+"';");
 }

}