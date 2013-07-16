/**
* Nome: UserManagerTest
* Package: server.usermanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-------------------------------------------+
* | Data    | Programmatore |         Modifiche       					|
* +---------+---------------+-------------------------------------------+
* |  130306 |     ZHP       | + creazione documento	  					|
* |  130712 |     VF        | + modificata inizializzazione dei test	|
* |         |               | + creato testSetPassword                  |
* |         |               | + creato testRemoveMessage               	|
* |         |               | + creato testGetMessage                   |
* |         |               | + creato testCreateMessage            	|
* |         |               | + creato testSetUserData              	|
* |         |               | + creato testGetUserData                  |
* |         |               | + creato testCheckPassword           		|
* +---------+---------------+-------------------------------------------+
*
*/ 
package server.test.testIntegrazione;

import static org.junit.Assert.*;

import java.sql.*;
import java.util.Vector;

import org.junit.*;

import server.dao.JavaConnectionSQLite;
import server.shared.RecordMessage;
import server.shared.User;
import server.shared.UserList;
import server.usermanager.UserManager;

public class UserManagerTest {
	UserManager userManager;
	JavaConnectionSQLite connection = JavaConnectionSQLite.getInstance();
	UserList userList;
	ResultSet rs;
	
	@Before
	public void init() {
		userManager=new UserManager();
		connection.executeUpdate("DELETE FROM UserDataSQL;");
		connection.executeUpdate("DELETE FROM RecordMessageDataSQL;");
	}

	@Test
	public void testSetPassword() throws Exception {
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		
		assertTrue("Operazione di cambio password fallita",userManager.setPassword("ClockWork", "newPassword"));
		rs= connection.select("UserDataSQL","*","","");
		assertTrue("Password non modificata", rs.getString("password").equals("newPassword"));
	}

	@Test
	public void testCheckPassword() throws Exception {
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		
		rs= connection.select("UserDataSQL","*","password='password'","");
		assertTrue("Password non modificata", !rs.isAfterLast());
		
		assertTrue("Operazione di controllo password fallita",userManager.checkPassword("ClockWork", "password"));	
	}
	
	@Test
	public void testSetUserData() throws Exception {
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		
		assertTrue("Operazione di settaggio fallita",userManager.setUserData("ClockWork", "ClockWork","Team7"));
		
		rs= connection.select("UserDataSQL","*","","");
		assertTrue("Password non modificata", !rs.isAfterLast());
		assertTrue("Password non modificata", rs.getString("username").equals("ClockWork"));
		assertTrue("Password non modificata", rs.getString("name").equals("ClockWork"));
		assertTrue("Password non modificata", rs.getString("surname").equals("Team7"));
		
		connection.executeUpdate("DELETE FROM UserDataSQL;");
		
		try{
			assertTrue("Operazione di settaggio fallita",userManager.setUserData("ClockWork", "ClockWork","Team7"));
		}
		catch(Exception e){ System.out.println("Username errato"); }
	}
	
	@Test
	public void testGetUserData() throws Exception {
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		
		User user=userManager.getUserData("ClockWork");
		
		assertTrue("Password non modificata", user.getUsername().equals("ClockWork"));
		assertTrue("Password non modificata", user.getName().equals("Clock Work"));
		assertTrue("Password non modificata", user.getSurname().equals("Team"));
	}
	
	@Test
	public void testCreateMessage() throws Exception {
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team', '7');");
		
		RecordMessage message=userManager.createMessage("sender", "ClockWork7", "prova", "");
		assertTrue("Password non modificata", message.getSender().equals("sender"));
		assertTrue("Password non modificata", message.getAddressee().equals("ClockWork7"));
		assertTrue("Password non modificata", message.getPath().equals("prova"));
		assertTrue("Password non modificata", message.getDate().equals(""));
		
		try{
			message=userManager.createMessage("sender", "ClockWork777", "prova", "");
		}
		catch(Exception e){System.out.println("Addressee errato");}
	}
	
	@Test
	public void testGetMessages() throws Exception {
		connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('sender','ClockWork7','prova','');");
		connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('sender','ClockWork7','ciao','');");
		
		Vector<RecordMessage> message=userManager.getMessages("ClockWork7");
		assertTrue("Password non modificata", message.size()==2);
	}
	
	@Test
	public void testRemoveMessage() throws Exception {
		connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('sender','ClockWork7','prova','');");
		connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('sender','ClockWork7','ciao','');");
		
		rs= connection.select("RecordMessageDataSQL","count(*) as num","","");
		assertTrue("Password non modificata", rs.getString("num").equals("2"));
		
		userManager.removeMessage("sender", "ClockWork7", "prova", "");
		
		rs= connection.select("RecordMessageDataSQL","count(*) as num","","");
		assertTrue("Password non modificata", rs.getString("num").equals("1"));
		
		userManager.removeMessage("sender", "ClockWork7", "ciao", "");
		
		rs= connection.select("RecordMessageDataSQL","count(*) as num","","");
		assertTrue("Password non modificata", rs.getString("num").equals("0"));
	}
	
}
