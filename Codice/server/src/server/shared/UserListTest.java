/**
* Nome: UserListTest
* Package: server.shared
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

package server.shared;

import static org.junit.Assert.*;

import org.junit.Test;

public class UserListTest {
	UserList userList;
	
	private void init(){
		userList=new UserList();
	}

	@Test
	public void testAddUser() {
		init();
		User user= new User("ClockWork7","Clock Work", "Team", "7");
		assertTrue("Aggiunta non riuscita",userList.addUser(user));
		assertFalse("Aggiunti due user con lo stesso username", userList.addUser(user));
	}

	@Test
	public void testGetUser() {
		init();
		User user= new User("ClockWork7","Clock Work", "Team", "7");
		assertFalse("User presente erroneamente", userList.getUser(user.getUsername())==user );
		userList.addUser(user);
		assertTrue("User non presente", userList.getUser(user.getUsername())==user );
	}

	@Test
	public void testGetAllUsers() {
		testAddUser();
		assertTrue("Numero user presenti corretto", userList.getAllUsers().size()==1 );
		User user= new User("ClockWork","Clock Work", "Team", "7");
		userList.addUser(user);
		assertTrue("User non presente", userList.getAllUsers().contains(user) );
	}

	@Test
	public void testRemoveUser() {
		testAddUser();
		assertTrue("Rimozione riuscita", userList.removeUser("ClockWork7"));
		assertTrue("Risultato corretto",userList.getAllUsers().size()==0);
	}

}
