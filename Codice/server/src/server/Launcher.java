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
	private static AuthenticationManager authenticationManager=new AuthenticationManager();
	private static UserManager userManager= new UserManager();
	
	private static Launcher launcher=null;
	
	/**costruttore della classe
	 * 
	 */
	private Launcher(){
		this.javaconnectionSQLite=new JavaConnectionSQLite();
		this.userList=new UserList();
		this.loginDao=new LoginDaoSQL(javaconnectionSQLite, userList);
		this.userDao=new UserDaoSQL(javaconnectionSQLite, userList);
		this.recordMessageDao= new RecordMessageDaoSQL(javaconnectionSQLite, userList);
		authenticationManager.init(recordMessageDao, loginDao, userDao);
		userManager.init(userDao, recordMessageDao);
	}
	
	public static UserManager getUserMenager(){
		return userManager;
	}
	public static AuthenticationManager getAuthenticationManager(){
		return authenticationManager;
	}
	
	public static void getServer(){
		if(launcher==null){
			launcher=new Launcher();
		}
	}

}