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
package test.testIntegrazione;

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
  private JavaConnectionSQLite connection;
  private ResultSet rs;
	
  @Before
  public void init() {
	userManager=new UserManager();
	connection = JavaConnectionSQLite.getInstance();
	connection.executeUpdate("DELETE FROM UserDataSQL;");
	connection.executeUpdate("DELETE FROM RecordMessageDataSQL;");
  }
	
  @After
  public void remove() {
	connection.executeUpdate("DELETE FROM UserDataSQL;");
	connection.executeUpdate("DELETE FROM RecordMessageDataSQL;");
	UserList.getInstance().removeAll();
  }

  @Test
  public void testCheckPassword() {
	assertFalse("Operazione di controllo password fallita",userManager.checkPassword("username", "password"));
	
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', 'IP');");
	assertFalse("Operazione di controllo password fallita",userManager.checkPassword("wrongUsername", "password"));
	assertFalse("Operazione di controllo password fallita",userManager.checkPassword("username", "wrongPassword"));
	assertTrue("Operazione di controllo password fallita",userManager.checkPassword("username", "password"));
  }

  @Test
  public void testSetPassword() {
	try {
	  userManager.setPassword("username", "password2");
	  assertTrue("Operazione di cambio password errata. Username errato",false);
	} catch (Exception e) {
	  assertTrue("Operazione di cambio password errata. Username errato",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Username errato"));
	}

	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', 'IP');");	
	try {
	  assertTrue("Operazione di cambio password fallita", userManager.setPassword("username", "password2"));
	  rs = connection.select("UserDataSQL","*","username='username'","");
	  try{
		assertTrue("Password non modificata nel riferimento presente nella base di dati", rs.getString("password").equals("password2"));
	  }catch(Exception e){
		assertTrue("user mancante", false);
	  }
	} catch (Exception e) {
	  assertTrue("Operazione di cambio password fallita",false);
	}
  }
	
  @Test
  public void testSetUserData() {
	try {
	  userManager.setUserData("username", "newName","newSurname");
	  assertTrue("Operazione di cambio dati errata. Username errato",false);
	} catch (Exception e) {
	  assertTrue("Operazione di cambio dati errata. Username errato",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Username errato"));
	}
	
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', 'IP');");
	try {
	  assertTrue("Operazione di cambio dati fallita", userManager.setUserData("username", "newName","newSurname"));
	  rs= connection.select("UserDataSQL","*","","");
	  try{
		assertTrue("Nome non modificato nel riferimento presente nella base di dati", rs.getString("name").equals("newName"));
		assertTrue("Cognome non modificato nel riferimento presente nella base di dati", rs.getString("surname").equals("newSurname"));		
	  }catch(Exception e){
		assertTrue("user mancante", false);
	  }
	} catch (Exception e) {
	  assertTrue("Operazione di cambio dati fallita",false);
	}
  }
	
  @Test
  public void testGetUserData() {
    assertTrue("Operazione errata. Non dovrebbe esistere l'utente", userManager.getUserData("username")==null);
	
    connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('username','password','name','surname', 'IP');");
    assertTrue("Operazione fallita", userManager.getUserData("username")!=null);
 }
	
 @Test
  public void testCreateMessage(){
	try{
 	  userManager.createMessage("sender", "addressee", "mex", "date");
      assertTrue("Operazione errata, destinatario non presente", false);
	}catch(Exception e) {
  	  assertTrue("Operazione errata, destinatario non presente", true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Destinatario inesistente"));
	}
	/* connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team', '0');");
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
*/	}
	
/*	@Test
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
*/	
}
