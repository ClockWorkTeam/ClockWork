/**
* Nome: UserTest
* Package: server.shared
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/05
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+------------------------------------------+
* | Data    | Programmatore |         Modifiche                        |
* +---------+---------------+------------------------------------------+
* |  130305 |     ZHP       | + creazione documento	                   |
* |  130710 |     VF        | + modificata inizializzazione dei test   |
* |         |               |                                          |
* +---------+---------------+------------------------------------------+
*
*/ 
package test.testUnita.shared;

import static org.junit.Assert.*;

import org.junit.*;

import server.shared.User;

public class UserTest {
	User user;
	
	@Before
	public void init(){
		user=new User("ClockWork7","Clock Work", "Team", "7");
	}
	
	@Test
	public void testGetUsername() {
		assertTrue("Username non � quella attesa", user.getUsername().equals("ClockWork7"));
		assertFalse("Username non � quella attesa", user.getUsername().equals("ClockWork"));		
	}

	@Test
	public void testGetName() {
		assertTrue("Nome non � quello atteso", user.getName().equals("Clock Work"));
		assertFalse("Nome non � quello atteso", user.getName().equals("ClockWork"));		
	}

	@Test
	public void testGetSurname() {
		assertTrue("Cognome non � quello atteso", user.getSurname().equals("Team"));
		assertFalse("Cognome non � quello atteso", user.getSurname().equals("Team CW"));	
	}

	@Test
	public void testGetIP() {
		assertTrue("IP non � quello atteso", user.getIP().equals("7"));
		assertFalse("IP non � quello atteso", user.getIP().equals("71"));
	}

	@Test
	public void testSetName() {
		user.setName("");
		assertTrue("Nome non � quello atteso", user.getName().equals(""));
		assertFalse("Nome non � quello atteso", user.getName().equals("Clock Work"));	
		
	}

	@Test
	public void testSetSurname() {
		user.setSurname("");
		assertTrue("Cognome non � quello atteso", user.getSurname().equals(""));
		assertFalse("Cognome non � quello atteso", user.getSurname().equals("Team"));	

	}

	@Test
	public void testSetIP() {
		user.setIP("0");
		assertTrue("IP non � quello atteso", user.getIP().equals("0"));
		assertFalse("IP non � quello atteso", user.getIP().equals("7"));
	}

}
