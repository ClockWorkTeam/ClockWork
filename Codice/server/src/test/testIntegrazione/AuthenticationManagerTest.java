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
package test.testIntegrazione;

import static org.junit.Assert.*;
import java.sql.*;
import org.junit.*;
import server.dao.JavaConnectionSQLite;
import server.shared.User;
import server.shared.UserList;
import server.usermanager.AuthenticationManager;

public class AuthenticationManagerTest {
  private AuthenticationManager authenticationManager;
  private JavaConnectionSQLite connection;
  private ResultSet rs;


  
  @Before
  public void init() {
	connection = JavaConnectionSQLite.getInstance();
	authenticationManager=new AuthenticationManager();
	connection.executeUpdate("DELETE FROM UserDataSQL;");
  }

  @After
  public void remove() {
	connection.executeUpdate("DELETE FROM UserDataSQL;");
	UserList.getInstance().removeAll();
  }
  

  
  @Test
  public void testLogin(){
	try{
	  authenticationManager.login("ClockWork", "password", "10.01.01.01");
	  assertTrue("Operazione di login errata. Utente inesistente",false);
	}catch(Exception e){
	  assertTrue("Operazione di login errata. Utente inesistente",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Username errato"));	  
	}
	
  	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', '0');");
	try{
	  authenticationManager.login("username", "wrong", "10.01.01.01");
	  assertTrue("Operazione di login errata. Password errata",false);
	}catch(Exception e){
	  assertTrue("Operazione di login errata. Password errata",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Password errata"));	  
	}
	
	try{
	  User user=authenticationManager.login("username", "password", "10.01.01.01");
	  assertTrue("Operazione di login fallita",user!=null);
	  
	  assertTrue("IP non modificata nell'utente restituito",user.getIP().equals("10.01.01.01"));
	  assertTrue("IP non modificata nel riferimento presente nella UserList",UserList.getInstance().getUser("username").getIP().equals("10.01.01.01"));
	  rs = connection.select("UserDataSQL","*","username='username'","");
	  try{
		assertTrue("IP non modificata nel riferimento presente nella base di dati", rs.getString("IP").equals("10.01.01.01"));
	  }catch(Exception e){
		assertTrue("user mancante", false);
	  }
	}catch(Exception e){
	  assertTrue("Operazione di login fallita",false);
	}
  }
	
  @Test
  public void testLogout() {
	assertTrue("Operazione di logout errata. utente inesistente",authenticationManager.logout("ClockWork")==null);
	
  	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', '10.01.01.01');");

  	assertTrue("Operazione di logout fallita",authenticationManager.logout("username")!=null);
    assertTrue("IP non modificata nel riferimento presente nella UserList",UserList.getInstance().getUser("username").getIP().equals("0"));   
  	rs = connection.select("UserDataSQL","*","username='username'","");
	try{
	  assertTrue("IP non modificata nel riferimento presente nella base di dati", rs.getString("IP").equals("0"));
	}catch(Exception e){
	  assertTrue("user mancante", false);
	}
  	
	assertTrue("Operazione di logout errata. Utente già disconnesso",authenticationManager.logout("username")!=null);
  }



  @Test
  public void testRemoveUser() {
	assertTrue("Operazione di rimozzione utente fallita", authenticationManager.removeUser("username"));
	
  	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', '0');");
  	assertTrue("Operazione di rimozzione utente fallita", authenticationManager.removeUser("username"));
  	rs = connection.select("UserDataSQL","*","username='username'","");
	try{
	  rs.getString("username");
	  assertTrue("Utente non eliminato dal database", false);
	}catch(Exception e){
	  assertTrue("Utente non eliminato dal database", true);
	}
	assertTrue("Utente non eliminato da UserList", UserList.getInstance().getUser("username")==null);	
  }

  @Test
  public void testGetAllContacts() {
    assertTrue("Numero contatti sbagliato",authenticationManager.getAllContacts("").size()==0);
	try {
	  authenticationManager.createUser("username1", "password1", "name1", "surname1", "IP1");
	  authenticationManager.createUser("username2", "password2", "name2", "surname2", "IP2");
	} catch (Exception e) {
	  assertTrue("Problema createUser", false);
	}
	
	assertTrue("Numero contatti sbagliato",authenticationManager.getAllContacts("").size()==2);
	assertTrue("Numero contatti sbagliato",authenticationManager.getAllContacts("username1").size()==1);
	
  }

  @Test
  public void testCreateUser() {
	try{
	  assertTrue("Operazione di registrazione fallita",authenticationManager.createUser("username", "password", "name","surname", "10.01.01.01")!=null);
	  rs = connection.select("UserDataSQL","*","","");
	  try {
	    assertTrue("Utente non inserito nel database",rs.getRow()==1);
		assertTrue("Utente non inserito correttamente nel db", rs.getString("username").equals("username"));
	  } catch (SQLException e) {
	    assertTrue("Eccezione lanciata dall'oggetto della classe ResultSet", false);
  	  }
  	  assertTrue("Utente non inserito correttamente in UserList", UserList.getInstance().getUser("username")!=null);
	}catch(Exception e){
	  assertTrue("Operazione di registrazione fallita",false);
	}

	try{
	  authenticationManager.createUser("username", "password2", "name2","surname2", "10.01.01.02");
	  assertTrue("Operazione di registrazione errata. Utente già esistente",false);
	}catch(Exception e){
	  assertTrue("Operazione di registrazione errata. Utente già esistente",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Username utilizzato da un altro utente"));
	  rs = connection.select("UserDataSQL","*","","");
	  try {
	    assertTrue("Utente inserito nel database",rs.getRow()==1);
	  } catch (SQLException ex) {
	    assertTrue("Eccezione lanciata dall'oggetto della classe ResultSet", false);
  	  }
	}	
	/*
	connection.finalize();
	try{
	  authenticationManager.createUser("username2", "password2", "name2","surname2", "10.01.01.02");
	  assertTrue("Operazione di registrazione errata",false);
	}catch(Exception e){
	  assertTrue("Operazione di registrazione errata",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Errore nell'inserimento dell'utente nel database"));	  
	}
	*/

  }
}
