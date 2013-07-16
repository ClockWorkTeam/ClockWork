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

package test.testUnita.usermanager;
import server.shared.UserList;
import server.shared.User;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserDaoSQL{
  private static UserDaoSQL userDaoSQL=null; 

  private UserDaoSQL(){
	  System.out.println("provaUser");
  }
  
  public static UserDaoSQL getInstance(){
	if(userDaoSQL==null){
	  userDaoSQL= new UserDaoSQL();
	}
	return userDaoSQL;
  }

  /*
  public User getUser(String username){

  }

  public boolean addUser(User user, String password){

  }

  public boolean removeUser(String username){
  }

 
  public boolean checkPassword(String username, String password){
	  if(username.equals("username_sbagliato") || password.equals("password_sbagliato")){
		  return false;
	  }
	  return true;
  }


  public boolean setPassword(String username, String password){
  }

  
  public boolean setName(String username, String name){
  }

 
  public boolean setSurname(String username, String surname){
  }

 
  public boolean setIP(String username, String IP){
  }

  private void getUsersFromDB(){

  }	*/
}