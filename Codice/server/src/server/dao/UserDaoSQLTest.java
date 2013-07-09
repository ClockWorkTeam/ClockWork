/**
* Nome: UserDaoSQLTest
* Package: server.dao
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

package server.dao;

import static org.junit.Assert.*;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;
import server.shared.User;
import server.shared.UserList;

public class UserDaoSQLTest {
	private UserDaoSQL userDaoSQL;
	private JavaConnectionSQLite connection = JavaConnectionSQLite.getInstance();
	public void init() {
		userDaoSQL=UserDaoSQL.getInstance();	
	}
	
/* @Test
	public void resetTable(){
	 init();
	 
	 connection.executeUpdate("DELETE FROM UserDataSQL");	
	}
*/
	/**
	 * Nota il test per la creazione e la rimozione di un utente deve essere eseguito in un unico metodo, poichè i test lavorano in parallelo
	 * per cui se si creano 2 test, uno di creazione e uno di eliminazione si alternerebbe la loro correttezza
	 * @throws SQLException
	 */
	@Test
	public void testAddAndRemoveUser() throws SQLException {
		init();
		User user = new User("ClockWork7", "Clock Work", "Team", "7"); 
		assertTrue("Operazione di inserimento nel DB fallita", userDaoSQL.addUser(user, "password"));
		
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("User non inserito nel database",!rs.isAfterLast());
		assertTrue("Username non inserito correttamente nel db", rs.getString("username").equals("ClockWork7"));
		assertTrue("Password non inserita correttamente nel db", rs.getString("password").equals("password"));
		assertTrue("Nome non inserito correttamente nel db", rs.getString("name").equals("Clock Work"));
		assertTrue("Cognome non inserito correttamente nel db", rs.getString("surname").equals("Team"));
		assertTrue("IP non inserito correttamente nel db", rs.getString("IP").equals("7"));
		
		assertTrue("",userDaoSQL.removeUser("ClockWork7"));
		rs = connection.select("UserDataSQL","*","username='ClockWork7'","");
	    assertTrue("Utente cancellato dal database", rs.isAfterLast());
	}

	@Test
	public void testGetUser() throws SQLException {
		init();
		assertTrue("Presente un user falso", userDaoSQL.getUser("falso")==null);
		userDaoSQL.addUser(new User("ClockWork7", "Clock Work", "Team", "7"), "password");
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("User non inserito nel database",!rs.isAfterLast());

		assertTrue("User non trovato", userDaoSQL.getUser("ClockWork7")!=null);
		userDaoSQL.removeUser("ClockWork7");
	}
	
	
		/*@Test
	public void testSetPassword() throws SQLException {
		init();
		User user =userDaoSQL.createUser("ClockWork7", "password", "Clock Work", "Team", "7");
		assertTrue("Operazione di cambio password fallita",userDaoSQL.setPassword(user.getUsername(), "nuova_password"));
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Password non cambiata nel db", rs.getString("password").equals("nuova_password"));
		userDaoSQL.removeUser("ClockWork7");
	}

	@Test
	public void testSetName() throws SQLException {
		init();
		User user =userDaoSQL.createUser("ClockWork7", "password", "Clock Work", "Team", "7");
		String nuovoNome="ClockWork";
		assertTrue("Operazione di cambio nome fallita",userDaoSQL.setName(user.getUsername(), nuovoNome));
		assertTrue("Nome non cambiato nella lista", userList.getUser(user.getUsername()).getName().equals(nuovoNome));
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Nome non cambiato nel db", rs.getString("name").equals(nuovoNome));
		userDaoSQL.removeUser("ClockWork7");
	}

	@Test
	public void testSetSurname() throws SQLException {
		init();
		User user =userDaoSQL.createUser("ClockWork7", "password", "Clock Work", "Team", "7");
		String nuovoCognome="ClockWorkTeam";
		assertTrue("Operazione di cambio nome fallita",userDaoSQL.setSurname(user.getUsername(), nuovoCognome));
		assertTrue("Cognome non cambiato nella lista", userList.getUser(user.getUsername()).getSurname().equals(nuovoCognome));
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Cognome non cambiato nel db", rs.getString("surname").equals(nuovoCognome));
		userDaoSQL.removeUser("ClockWork7");
	}
*/
}