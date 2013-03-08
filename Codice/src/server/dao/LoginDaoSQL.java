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

/**
 * Classe che gestisce i login, implementa i metodi pubblici dell'interfaccia
 * 
 */

public class LoginDaoSQL implements LoginDao{

  private JavaConnectionSQLite connection;
  
  /**
   * Costruttore della classe SqlDAOLogin
   * @param azienda indirizzo del server aziendale
   */
  public LoginDaoSQL(JavaConnectionSQLite server){
    connection=server;
  }

  /**
   * Metodo che prova il login
   * 
   * @param login Oggetto Login da cui si prendono le informazioni
   * @return un boolean che indica se il login e` avvenuto con successo o no
   * 
   */    
  public boolean login(User user){
    String username = user.getUsername();
    String password = user.getPassword();
    String IP=user.getIP();
    ResultSet rs = connection.select("UserDataSQL","*", "username='"+username+"' AND (password='"+password+"')",""); 
    if(rs==null){return false;} 
      return connection.executeUpdate("UPDATE UserDataSQL SET IP='"+IP+"' WHERE username='"+username+"' AND (password='"+password+"');");
  }

  /**
   * Metodo che effettua il logout
   * 
   * @param login Oggetto Login da cui si prendono le informazioni
   * @return un boolean che indica se il login e` avvenuto con successo o no
   * 
   */    
  public boolean logout(User user){
    String username = user.getUsername();
    String password = user.getPassword();
    user.setIP("0");
    return 	connection.executeUpdate("UPDATE UserDataSQL SET IP='0' WHERE username='"+username+"' AND (password='"+password+"');");
 }

}