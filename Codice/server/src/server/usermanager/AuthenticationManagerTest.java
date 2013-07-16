/**
* Nome: AuthenticationManagerTest
* Package: server.usermanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-------------------------------------------+
* | Data    | Programmatore |         Modifiche       					|
* +---------+---------------+-------------------------------------------+
* |  130306 |     ZHP       | + creazione documento	   					|
* |  130713 |     VF        | + modificata inizializzazione dei test	|
* |         |               | + creato testCreateUser                   |
* |         |               | + creato testRemoveUser               	|
* |         |               | + creato testLogin  		                |
* |         |               | + creato testLogout  			          	|
* |         |               | + creato testGetAllContacts	          	|
* |         |               |                          					|
* +---------+---------------+-------------------------------------------+
*
*/ 
package server.usermanager;

import static org.junit.Assert.*;

import java.sql.*;

import org.junit.*;

import server.dao.JavaConnectionSQLite;
import server.shared.User;


public class AuthenticationManagerTest {
	private AuthenticationManager authenticationManager;
	JavaConnectionSQLite connection = JavaConnectionSQLite.getInstance();
	ResultSet rs;
	
	@Before
	public void init() {
		authenticationManager=new AuthenticationManager();
		connection.executeUpdate("DELETE FROM UserDataSQL;");
	}

	@Test
	public void testCreateUser() throws Exception {
		rs= connection.select("UserDataSQL","count(*) as num","","");
		assertTrue("DB non vuoto", rs.getString("num").equals("0"));
		try{
			authenticationManager.createUser("ClockWork7", "password", "name", "surname", "IP");
		}
		catch(Exception e){System.out.println("Username già presente");}
		
		rs= connection.select("UserDataSQL","count(*) as num","","");
		assertTrue("Numero utenti presenti è sbagliato", rs.getString("num").equals("1"));
		
		//viene testato se esite già
		try{
			authenticationManager.createUser("ClockWork7", "password", "name", "surname", "IP");
		}
		catch(Exception e){System.out.println("Username già presente");}
		
		rs= connection.select("UserDataSQL","count(*) as num","","");
		assertTrue("Numero utenti presenti è sbagliato", rs.getString("num").equals("1"));
	}
	
	@Test
	public void testRemoveUser() throws Exception {
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team', '0');");
		
		rs= connection.select("UserDataSQL","count(*) as num","","");
		assertTrue("DB non vuoto", rs.getString("num").equals("1"));
		
		authenticationManager.removeUser("ClockWork7");
		
		rs= connection.select("UserDataSQL","count(*) as num","","");
		assertTrue("Numero utenti presenti è sbagliato", rs.getString("num").equals("0"));
		
		//viene testato se l'utente non c'è
		authenticationManager.removeUser("ClockWork7");
		
		rs= connection.select("UserDataSQL","count(*) as num","","");
		assertTrue("Numero utenti presenti è sbagliato", rs.getString("num").equals("0"));
	}

	@Test
	public void testLogin() throws Exception {
		try{
			assertTrue("Login utente inesistente",authenticationManager.login("username", "password", "10.01.01.01")==null);
		}
		catch(Exception e){System.out.println("Username errato");}
		
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', '0');");
		
		try{
			assertTrue("Login utente inesistente",authenticationManager.login("username", "p", "10.01.01.01")==null);
		}
		catch(Exception e){System.out.println("Password errata");}
		
		User user=authenticationManager.login("username", "password", "10.01.01.01");
		assertTrue("IP non modificata",user.getUsername().equals("username"));
		assertTrue("IP non modificata",user.getIP().equals("10.01.01.01"));
	}
	
	@Test
	public void testLogout() throws Exception {
		assertTrue("Logout utente inesistente",authenticationManager.logout("username")==null);
		
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', '10.01.01.01');");
		
		assertTrue("Username sbagliato",authenticationManager.logout("username").getUsername().equals("username"));
		assertTrue("IP sbagliato",authenticationManager.logout("username").getIP().equals("0"));
	}

	@Test
	public void testGetAllContacts() throws Exception {
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', '10.01.01.01');");
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username2','password','name','surname', '10.01.01.01');");
		
		rs= connection.select("UserDataSQL","count(*) as num","","");
		int num=rs.getInt("num");
		
		assertTrue("Numero contatti sbagliato",authenticationManager.getAllContacts("username").size()==num);
	}
	
}
