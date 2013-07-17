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
import server.dao.UserDao;
import server.shared.User;

public class UserDaoSQL implements UserDao{
  private static UserDaoSQL userDaoSQL=null; 

  private UserDaoSQL(){}
  
  public static UserDaoSQL getInstance(){
	if(userDaoSQL==null){
	  userDaoSQL= new UserDaoSQL();
	}
	return userDaoSQL;
  }

  public User getUser(String username){
	if(username.equals("false")){
	  return null;
	}else if(username.equals("true")){
	  return new User(username,"name","surname","IP");
	}else return new User(username,"name","surname","0");
  }

  public boolean addUser(User user, String password){
	if(password.equals("true")){
	  return true;
	}
	return false;
  }

  public boolean removeUser(String username){
	if(username.equals("true")){
	  return true;
	}
	else return false;
  }

  public boolean checkPassword(String username, String password){
	if(username.equals("true") && password.equals("true")){
	  return true;
	}
	return false;
  }

  public boolean setPassword(String username, String password){
	if(password.equals("true")){
	  return true;
	}else return false;
  }

  public boolean setName(String username, String name){
	if(name.equals("true")){
	  return true;
	}else return false;
  }

  public boolean setSurname(String username, String surname){
    if(surname.equals("true")){
	  return true;
	}else return false;
  }

  public boolean setIP(String username, String IP){
    if(IP.equals("true")){
	  return true;
	}else return false;
  }
}