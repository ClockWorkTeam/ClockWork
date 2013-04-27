/**
* Nome: UserManagerTest
* Package: server.usermanager
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
package server.usermanager;

import static org.junit.Assert.*;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;

import server.dao.JavaConnectionSQLite;
import server.dao.RecordMessageDao;
import server.dao.RecordMessageDaoSQL;
import server.dao.UserDao;
import server.dao.UserDaoSQL;
import server.shared.RecordMessage;
import server.shared.User;
import server.shared.UserList;

public class UserManagerTest {
	UserManager userManager;
	JavaConnectionSQLite connection;
	UserList userList;
	public void init() {
		userManager=new UserManager();
		connection =new JavaConnectionSQLite();
		userList=new UserList();
		UserDao userDao= new UserDaoSQL(connection, userList);
		RecordMessageDao recordMessageDao = new RecordMessageDaoSQL(connection, userList);
		userManager.init(userDao, recordMessageDao);
	}

	@Test
	public void testSetPassword() throws SQLException {
		init();
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		userList.addUser(new User("ClockWork","Clock Work","Team", "0"));

		assertTrue("Operazione di cambio password fallita",userManager.setPassword(userList.getUser("ClockWork"), "newPassword"));
		ResultSet rs= connection.select("UserDataSQL","*","","");
		assertTrue("Password non modificata", rs.getString("password").equals("newPassword"));
		
		userList.removeUser("ClockWork");
		connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork';");
	}

	@Test
	public void testSetName() throws SQLException {
		init();
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		userList.addUser(new User("ClockWork","Clock Work","Team", "0"));

		assertTrue("Operazione di cambio nome fallita", userManager.setName(userList.getUser("ClockWork"), "Clockwork"));
		assertTrue("Nome non modificato nel contatto in shared",userList.getUser("ClockWork").getName().equals("Clockwork"));
		ResultSet rs= connection.select("UserDataSQL","*","","");
		assertTrue("Nome non modificato nel contatto in db", rs.getString("name").equals("Clockwork"));
		
		userList.removeUser("ClockWork");
		connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork';");

	}

	@Test
	public void testSetSurname() throws SQLException {
		init();
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		userList.addUser(new User("ClockWork","Clock Work","Team", "0"));

		assertTrue("Operazione di cambio nome fallita", userManager.setSurname(userList.getUser("ClockWork"), "Clockwork"));
		assertTrue("Nome non modificato nel contatto in shared",userList.getUser("ClockWork").getSurname().equals("Clockwork"));
		ResultSet rs= connection.select("UserDataSQL","*","","");
		assertTrue("Nome non modificato nel contatto in db", rs.getString("surname").equals("Clockwork"));
		
		userList.removeUser("ClockWork");
		connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork';");
	}

	@Test
	public void testCreateMessage_GetMessage_GetMessages_RemoveMessage() {
		init();
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		userList.addUser(new User("ClockWork","Clock Work","Team", "0"));
		
		java.util.Date dt = new java.util.Date();
		java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		assertTrue("Creazione messaggio fallita", userManager.createMessage("sender","ClockWork" ,"Prova",  sdf.format(dt))!=null);
		RecordMessage message = userManager.getMessage("sender","ClockWork" ,"Prova",  sdf.format(dt));
		assertTrue("Messaggio non esistente", message!=null);
		assertTrue("Numero messaggi errato",userManager.getMessages("ClockWork").size()==1);
		assertTrue("Errore nella rimozione del messaggio", userManager.removeMessage("sender","ClockWork" ,"Prova",  sdf.format(dt)));
		assertTrue("Numero messaggi errato",userManager.getMessages("ClockWork").size()==0);
		
		userList.removeUser("ClockWork");
		connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork';");
	}

	@Test
	public void testGetUser() {
		init();
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		userList.addUser(new User("ClockWork","Clock Work","Team", "0"));

		assertTrue("Utente errato", userList.getUser("ClockWork")==userManager.getUser("ClockWork"));
		
		userList.removeUser("ClockWork");
		connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork';");
		
		assertTrue("Utente non rimosso", userManager.getUser("ClockWork")==null);
	}

	@Test
	public void testGetAllContacts() {
		init();
		assertTrue("numero contatti errato", userManager.getAllContacts(null).size()==0);
		
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		userList.addUser(new User("ClockWork","Clock Work","Team", "0"));

		assertTrue("numero contatti errato", userManager.getAllContacts(null).size()==1);
		assertTrue("numero contatti errato", userManager.getAllContacts(userManager.getUser("ClockWork")).size()==0);
		
		userList.removeUser("ClockWork");
		connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork';");
		assertTrue("numero contatti errato", userManager.getAllContacts(null).size()==0);		
	}

}
