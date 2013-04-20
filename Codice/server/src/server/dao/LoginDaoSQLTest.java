/**
* Nome: LoginDaoSQLTest
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

import static org.junit.Assert.*;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;
import server.shared.*;

public class LoginDaoSQLTest {
	private JavaConnectionSQLite connection;
	private UserList userList;
	private LoginDaoSQL loginDaoSQL;
	
	private void init(){
		connection=new JavaConnectionSQLite();
		userList=new UserList();
		loginDaoSQL= new LoginDaoSQL(connection, userList);
	}

	private void initConDB(){
		init();
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team', '0');");
		userList.addUser(new User("ClockWork7","Clock Work","Team", "0"));
	}
		
	@Test
	public void testUserEmptyDB(){
		init();
		assertTrue("Login effettuata erroneamente", loginDaoSQL.login("ClockWork7","password","0.0.10.0")==null);
	}

	@Test
	public void testUserDBLogin() throws SQLException{
		initConDB();
		assertTrue("Login non effettuata", loginDaoSQL.login("ClockWork","password","0.1")==null);
		assertTrue("Login non effettuata", loginDaoSQL.login("ClockWork7","","0.1")==null);
		assertTrue("Login effettuata", loginDaoSQL.login("ClockWork7","password","0.1")!=null);

		assertTrue("IP non modificato",((userList.getUser("ClockWork7")).getIP())== "0.1");
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("IP database non modificato", (rs.getString("IP")).equals("0.1"));
	    
	    connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork7';");
	}

	@Test
	public void testUserDBLogout() throws SQLException{
		initConDB();
		User user=loginDaoSQL.login("ClockWork7","password","0.1");
		assertTrue("Login non effettuata", user!=null);
		assertTrue("Logout non effettuata", loginDaoSQL.logout(user));

		assertTrue("IP modificato correttamente",((userList.getUser("ClockWork7")).getIP())== "0");
		ResultSet rs = connection.select("UserDataSQL","*","","");
		assertTrue("IP database non modificato", (rs.getString("IP")).equals("0"));
		
	    connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork7';");
	}

}
