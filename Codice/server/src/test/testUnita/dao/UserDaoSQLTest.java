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

package server.test.testUnita.dao;

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
  public void testAddUser() throws SQLException {
	User user = new User("ClockWork7", "Clock Work", "Team", "7"); 
	assertTrue("Operazione di inserimento nel DB fallita", userDaoSQL.addUser(user, "password"));
		
	rs = connection.select("UserDataSQL","*","","");
	assertTrue("User non inserito nel database",rs.getRow()==1);
	assertTrue("Username non inserito correttamente nel db", rs.getString("username").equals("ClockWork7"));
	assertTrue("Password non inserita correttamente nel db", rs.getString("password").equals("password"));
	assertTrue("Nome non inserito correttamente nel db", rs.getString("name").equals("Clock Work"));
	assertTrue("Cognome non inserito correttamente nel db", rs.getString("surname").equals("Team"));
	assertTrue("IP non inserito correttamente nel db", rs.getString("IP").equals("7"));
  }
	
  @Test
  public void testRemoveUser() throws SQLException {
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	assertTrue("Operazione di eliminazione dell'utente non riuscita",userDaoSQL.removeUser("ClockWork7"));

	rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	assertTrue("Utente non cancellato dal database", rs.isAfterLast());
	rs = connection.select("UserDataSQL","*","","");
	assertTrue("Database non vuoto",rs.getRow()==0);
  }


  @Test
  public void testGetUser() throws SQLException {
	assertTrue("Presente un user falso", userDaoSQL.getUser("falso")==null);
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	User user = userDaoSQL.getUser("ClockWork7");
	    
	assertTrue("Username non corretto", user.getUsername().equals("ClockWork7"));
	assertTrue("Nome non corretto", user.getName().equals("Clock Work"));
	assertTrue("Cognome non corretto", user.getSurname().equals("Team"));
	assertTrue("IP non corretto", user.getIP().equals("7"));
  }
	
  @Test
  public void testCheckPassword() throws SQLException {
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	rs = connection.select("UserDataSQL","*","","");
	assertTrue("User non inserito nel database",!rs.isAfterLast());

	assertTrue("Controllo password fallito", userDaoSQL.checkPassword("ClockWork7","password"));
	assertFalse("Controllo password fallito", userDaoSQL.checkPassword("ClockWork","password"));
	assertFalse("Controllo password fallito", userDaoSQL.checkPassword("ClockWork7","password7"));
  }
	
  @Test
  public void testSetPassword() throws SQLException {
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	assertTrue("Operazione di cambio password fallita", userDaoSQL.setPassword("ClockWork7","password7"));
	rs = connection.select("UserDataSQL","*","","");
	assertTrue("Password non cambiata nel db", rs.getString("password").equals("password7"));
	    
	assertTrue("Operazione di cambio password errata", userDaoSQL.setPassword("ClockWork","password7"));
	rs = connection.select("UserDataSQL","*","username='ClockWork' and password='password7'","");
	assertTrue("Password cambiata erroneamente", rs.isAfterLast());
  }
	
  @Test
  public void testSetName() throws SQLException {
	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	userDaoSQL.setName("Clock Work","ClockWork");
	rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	assertTrue("Nome cambiato erroneamente", rs.getString("name").equals("Clock Work"));

	connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork','password','Clock Work','Team','7')");
	assertTrue("Errore nell'esecuzione della query", userDaoSQL.setName("ClockWork7","ClockWork"));
	rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	assertTrue("Nome non cambiato nel database", rs.getString("name").equals("ClockWork"));
	rs = connection.select("UserDataSQL","*","username='ClockWork'","");
	assertFalse("Nome utente sbagliato cambiato nel database", rs.getString("name").equals("ClockWork"));	
	
  }
	
  @Test
  public void testSetSurname() throws SQLException {
		
	 assertTrue("Presente un user falso", userDaoSQL.getUser("falso")==null);
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("User non inserito nel database",!rs.isAfterLast());
	    
	    assertTrue("Nome non cambiato nel db", userDaoSQL.setSurname("ClockWork7","team"));
	    rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Nome sbagliato", rs.getString("surname").equals("team"));
	    
	    assertTrue("Controllo password fallito", userDaoSQL.setSurname("ClockWork","team"));
	    rs = connection.select("UserDataSQL","*","username='ClockWork'","");
	    assertTrue("Nome sbagliato", rs.isAfterLast());
	}
	
	@Test
	public void testSetIP() throws SQLException {
		
		assertTrue("Presente un user falso", userDaoSQL.getUser("falso")==null);
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team','7')");
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("User non inserito nel database",!rs.isAfterLast());
	    
	    assertTrue("Nome non cambiato nel db", userDaoSQL.setIP("ClockWork7","77"));
	    rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Nome sbagliato", rs.getString("IP").equals("77"));
	    
	    assertTrue("Controllo password fallito", userDaoSQL.setIP("ClockWork","77"));
	    rs = connection.select("UserDataSQL","*","username='ClockWork'","");
	    assertTrue("Nome sbagliato", rs.isAfterLast());
	}
	
  @Test
  public void testGetInstance() {
	assertTrue("Rimozione riuscita",userDaoSQL.equals(UserDaoSQL.getInstance()));
  }
}