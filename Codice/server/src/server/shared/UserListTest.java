/**
* Nome: UserListTest
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
* |         |               | + modificato testGetAllUsers             |
* |         |               | + modificato testRemoveUsers             |
* |         |               |                                          |
* +---------+---------------+------------------------------------------+
*
*/

package server.shared;

import static org.junit.Assert.*;

import org.junit.*;

public class UserListTest {
	UserList userList;
	
	@Before
	public void init(){
		userList=new UserList();
	}

	@Test
	public void testAddUser() {
		User user= new User("ClockWork7","Clock Work", "Team", "7");
		assertTrue("Aggiunta non riuscita",userList.addUser(user));
		assertFalse("Aggiunti due user con lo stesso username", userList.addUser(user));
	}

	@Test
	public void testGetUser() {
		User user= new User("ClockWork7","Clock Work", "Team", "7");
		assertFalse("User presente erroneamente", userList.getUser(user.getUsername())==user );
		userList.addUser(user);
		assertTrue("User non presente", userList.getUser(user.getUsername())==user );
	}

	@Test
	public void testGetAllUsers() {
		User user= new User("ClockWork7","Clock Work", "Team", "7");
		User user2= new User("ClockWork","Clock Work", "Team", "7");
		userList.addUser(user);
		userList.addUser(user2);
		assertTrue("Numero user presenti corretto", userList.getAllUsers().size()==2 );
		assertTrue("User non presente", userList.getAllUsers().contains(user) );
		assertTrue("User non presente", userList.getAllUsers().contains(user2) );
	}

	@Test
	public void testRemoveUser() {
		testAddUser();
		assertTrue("Rimozione non riuscita", userList.removeUser("ClockWork7"));
		assertTrue("Risultato non corretto",userList.getAllUsers().size()==0);
		assertFalse("Rimozione riuscita", userList.removeUser("ClockWork7"));
	}

}
