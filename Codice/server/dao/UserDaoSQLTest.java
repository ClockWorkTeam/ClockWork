package server.dao;

import static org.junit.Assert.*;
import org.junit.Test;
import server.shared.*;
import server.dao.UserDaoSQL;

public class UserDaoSQLTest {
	
	private JavaConnectionSQLite connection;
	private UserList users;
	private UserDaoSQL userDao;
	
	private void init(){
		connection =new JavaConnectionSQLite();
		users=new UserList();
		userDao=new UserDaoSQL(connection, users);
	}
	
	@Test
	public void testRec() {
		init();
		User user=userDao.createUser("Leo", "1234", "Pardis", "Zohouri", "0.0.0.1");
		assertTrue("Creazione utente fallito",(user.getUsername()).equals("Leo"));
		assertTrue("Utente non presente", (users.getUser(user.getUsername()))!=null);
	} 
	
	@Test
	public void testPass(){
		testRec();
		assertFalse("Errore cambio password", userDao.setPassword("Liquid", "ciaociao"));
		assertTrue("Errore cambio password", userDao.setPassword("Leo","ciaociao"));
		assertTrue("Rimozione utente fallita",userDao.removeUser("Leo"));
	}
	
	@Test
	public void testName(){
		testRec();
		assertFalse("Errore cambio password", userDao.setName("Liquid", "ciaociao"));
		assertTrue("Errore cambio password", userDao.setName("Leo","ciaociao"));
		assertTrue("Rimozione utente fallita",userDao.removeUser("Leo"));
	}

	@Test
	public void testSurname(){
		testRec();
		assertFalse("Errore cambio password", userDao.setSurname("Liquid", "ciaociao"));
		assertTrue("Errore cambio password", userDao.setSurname("Leo","ciaociao"));
		assertTrue("Rimozione utente fallita",userDao.removeUser("Leo"));
	}

}
