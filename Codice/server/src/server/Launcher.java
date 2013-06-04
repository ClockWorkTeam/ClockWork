/**
* Nome: Launcher
* Package: server
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

package server;

import server.dao.*;
import server.shared.*;
import server.usermanager.*;

public class Launcher {
  private JavaConnectionSQLite javaconnectionSQLite;
  private UserList userList;
  private LoginDao loginDao;
  private UserDao userDao;
  private RecordMessageDao recordMessageDao;
  private TutorialsDaoSQL tutorialsDao;
  private static AuthenticationManager authenticationManager=new AuthenticationManager();
  private static UserManager userManager= new UserManager();
  private static Tutorials tutorials;
  private static Launcher launcher=null;
	
  /**costruttore della classe
   * inizializza i riferimenti alle classi uniche del server
   */
  private Launcher(){
	this.javaconnectionSQLite=new JavaConnectionSQLite();
	this.userList=new UserList();
	this.loginDao=new LoginDaoSQL(javaconnectionSQLite, userList);
	this.userDao=new UserDaoSQL(javaconnectionSQLite, userList);
	this.recordMessageDao= new RecordMessageDaoSQL(javaconnectionSQLite, userList);
	this.tutorialsDao=new TutorialsDaoSQL(javaconnectionSQLite);
	tutorials= tutorialsDao.getTutorials();
	authenticationManager.init(loginDao, userDao);
	userManager.init(userDao, recordMessageDao);
  }
	
  /**Metodo che resituisce il riferimento alla classe server.usermanager.UserManager
   * @return riferimento alla classe UserManager
   */
  public static UserManager getUserMenager(){
	return userManager;
  }
	
  /**Metodo che resituisce il riferimento alla classe server.usermanager.AutheticationManager
   * @return riferimento alla classe AutheticationManager
   */
  public static AuthenticationManager getAuthenticationManager(){
	return authenticationManager;
  }
	
  /**Metodo che resituisce il riferimento alla classe server.shared.Tutorials
   * @return lista tutorials presenti nel server
   */
  public static Tutorials getTutorials(){
	return tutorials;
  }
	
  /**Metodo per inizializzare la classe stessa un'unica volta
   */
  public static void getServer(){
	if(launcher==null){
		launcher=new Launcher();
	}
  }

}