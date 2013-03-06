/*
* Nome: LoginDaoSQL
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
import java.sql.ResultSet;
import java.sql.SQLException;

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
    try{
			connection.select("UserDataSQL","*", "username='"+username+"' AND (password='"+password+"')",""); 
    }
    catch(SQLException e){return false;} 
    try{
    	connection.executeUpdate("UPDATE UserDataSQL SET IP='"+IP+"' WHERE username='"+username+"' AND (password='"+password+"');");
    }catch(SQLException e){return false;}
    return true;
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
    try{
    	connection.executeUpdate("UPDATE UserDataSQL SET IP='0' WHERE username='"+username+"' AND (password='"+password+"');");
    	user.setIP(0);
    }catch(SQLException e){return false;}
    eturn true;
  }

}
