package server.shared;

import static org.junit.Assert.*;

import org.junit.Test;

public class UserListTest {
	UserList users;
	
	private void init(){
		users=new UserList();
	}
	@Test
	public void test() {
		init();
		User user= new User("Liquid90","Giacomo","Bain","0.0.10.10");
		assertTrue("Errore nella registrazione", users.addUser(user));
		assertFalse("Aggiunti due user con lo stesso username", users.addUser(user));
		assertTrue("User non trovato", users.getUser(user.getUsername())==user );
		assertTrue("Numero utenti errato",(users.getAllUsers()).size()==1);
		assertTrue("Errore nella cancellazione", users.removeUser(user.getUsername()));
		assertFalse("Cancellato user non esistenta", users.removeUser(user.getUsername()));
		assertTrue("Numero utenti errato",(users.getAllUsers()).size()==0);
	
	}

}
