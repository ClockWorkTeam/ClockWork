/**
* Nome: UserDaoSQLTest
* Package: server.dao
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/05
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-------------------------------------------+
* | Data    | Programmatore |         Modifiche       					|
* +---------+---------------+-------------------------------------------+
* |  130305 |     ZHP       | + creazione documento	  					|
* |  130712 |     VF        | + modificata inizializzazione dei test	|
* |         |               | + creato testAddUser                      |
* |         |               | + creato testRemoveUser                  	|
* |         |               | + creato testGetUser                      |
* |         |               | + creato testCheckPassword              	|
* |         |               | + creato testSetPassword              	|
* |         |               | + creato testSetName                      |
* |         |               | + creato testSetSurname                	|
* |         |               | + creato testIP                    		|
* |         |               |                          					|
* +---------+---------------+-------------------------------------------+
*
*/

package test.testUnita.dao;

import static org.junit.Assert.*;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.*;

import server.dao.JavaConnectionSQLite;
import server.dao.UserDaoSQL;
import server.shared.User;

public class UserDaoSQLTest {
  private UserDaoSQL userDaoSQL;
  private JavaConnectionSQLite connection = JavaConnectionSQLite.getInstance();
  ResultSet rs;
	
  @Before
  public void init(){
	userDaoSQL=UserDaoSQL.getInstance();
	connection.executeUpdate("DELETE FROM UserDataSQL");
  }

  @Test
  public void testAddUser(){
	User user = new User("ClockWork7", "Clock Work", "Team", "7"); 
	assertTrue("Operazione di inserimento nel DB fallita", userDaoSQL.addUser(user, "password"));
		
	rs = connection.select("UserDataSQL","*","","");
	try {
	  assertTrue("User non inserito nel database",rs.getRow()==1);
	  assertTrue("Username non inserito correttamente nel db", rs.getString("username").equals("ClockWork7"));
	  assertTrue("Password non inserita correttamente nel db", rs.getString("password").equals("password"));
  	  assertTrue("Nome non inserito correttamente nel db", rs.getString("name").equals("Clock Work"));
	  assertTrue("Cognome non inserito correttamente nel db", rs.getString("surname").equals("Team"));
	  assertTrue("IP non inserito correttamente nel db", rs.getString("IP").equals("7"));
	} catch (SQLException e) {
	  System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
  }
	
  @Test
  public void testRemoveUser(){
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team','7')");
	assertTrue("Operazione di eliminazione dell'utente non riuscita",userDaoSQL.removeUser("ClockWork7"));

	rs = connection.select("UserDataSQL","*","","");
	try {
	  assertTrue("Database non vuoto",rs.getRow()==1);
	} catch (SQLException e) {
	  System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
  }


  @Test
  public void testGetUser(){
	assertTrue("Presente un user falso", userDaoSQL.getUser("falso")==null);
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	User user = userDaoSQL.getUser("ClockWork7");
	assertTrue("Username non corretto", user.getUsername().equals("ClockWork7"));
	assertTrue("Nome non corretto", user.getName().equals("Clock Work"));
	assertTrue("Cognome non corretto", user.getSurname().equals("Team"));
	assertTrue("IP non corretto", user.getIP().equals("7"));
  }
	
  @Test
  public void testCheckPassword(){
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	assertTrue("Controllo password fallito", userDaoSQL.checkPassword("ClockWork7","password"));
	assertFalse("Controllo password fallito", userDaoSQL.checkPassword("ClockWork","password"));
	assertFalse("Controllo password fallito", userDaoSQL.checkPassword("ClockWork7","password7"));
  }
	
  @Test
  public void testSetPassword(){
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");

	userDaoSQL.setPassword("Clock Work","password2");
	rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	try{
	  assertTrue("Password cambiata erroneamente", rs.getString("password").equals("password"));
	  
 	  connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team','7')");
 	  
	  assertTrue("Errore nell'esecuzione della query", userDaoSQL.setPassword("ClockWork7","password2"));
	  rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	  assertTrue("Password non cambiata nel database", rs.getString("password").equals("password2"));
	  
	  rs = connection.select("UserDataSQL","*","username='ClockWork'","");
	  assertFalse("Password utente sbagliato cambiata nel database", rs.getString("password").equals("password2"));
	} catch (SQLException e) {
	  System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
  }
	
  @Test
  public void testSetName(){
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	userDaoSQL.setName("Clock Work","ClockWork");
	rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	try{
	  assertTrue("Nome cambiato erroneamente", rs.getString("name").equals("Clock Work"));
	  
 	  connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team','7')");
 	  
	  assertTrue("Errore nell'esecuzione della query", userDaoSQL.setName("ClockWork7","ClockWork"));
	  rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	  assertTrue("Nome non cambiato nel database", rs.getString("name").equals("ClockWork"));
	  
	  rs = connection.select("UserDataSQL","*","username='ClockWork'","");
	  assertFalse("Nome utente sbagliato cambiato nel database", rs.getString("name").equals("ClockWork"));
	} catch (SQLException e) {
	  System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
  }
	
  @Test
  public void testSetSurname() {	
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");

	userDaoSQL.setSurname("Clock Work","Team2");
	rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	try{
	  assertTrue("Cognome cambiato erroneamente", rs.getString("surname").equals("Team"));
	  
 	  connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team','7')");
 	  
	  assertTrue("Errore nell'esecuzione della query", userDaoSQL.setSurname("ClockWork7","Team2"));
	  rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	  assertTrue("Cognome non cambiato nel database", rs.getString("surname").equals("Team2"));
	  
	  rs = connection.select("UserDataSQL","*","username='ClockWork'","");
	  assertFalse("Cognome utente sbagliato cambiato nel database", rs.getString("surname").equals("Team2"));
	} catch (SQLException e) {
	  System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
  }
	
  @Test
  public void testSetIP() {
		
    connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	userDaoSQL.setIP("Clock Work","10");
	rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	try{
	  assertTrue("IP cambiato erroneamente", rs.getString("IP").equals("7"));
	  
	  connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team','7')");
	 	  
	  assertTrue("Errore nell'esecuzione della query", userDaoSQL.setIP("ClockWork7","10"));
	  rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	  assertTrue("IP non cambiato nel database", rs.getString("IP").equals("10"));
		  
	  rs = connection.select("UserDataSQL","*","username='ClockWork'","");
	  assertFalse("IP utente sbagliato cambiato nel database", rs.getString("IP").equals("10"));
	}catch (SQLException e) {
	  System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
  }
	
  @Test
  public void testGetInstance() {
	assertTrue("Sono state create più istanze di una classe Singleton",userDaoSQL==(UserDaoSQL.getInstance()));
  }
}