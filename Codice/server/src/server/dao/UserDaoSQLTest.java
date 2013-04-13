package server.dao;

import static org.junit.Assert.*;

import org.junit.Test;
import server.shared.*;
import server.dao.UserDaoSQL;

public class UserDaoSQLTest {
	
	private JavaConnectionSQLite connection;
	private UserList users;
	private UserDaoSQL userDao;
	User user;
	
	private void init(){
		connection =new JavaConnectionSQLite();
		users=new UserList();
		userDao=new UserDaoSQL(connection, users);
		user=userDao.createUser("Leo", "1234", "Pardis", "Zohouri", "0.0.0.1");
	}
	
	@Test
	public void testRec() {
		init();
		
		assertTrue("Creazione utente fallito",(user.getUsername()).equals("Leo"));
		assertTrue("Utente non presente", (users.getUser(user.getUsername()))!=null);
		assertTrue("Rimozione utente fallita",userDao.removeUser("Leo"));
	} 
	
	@Test
	public void testPass(){
		init();
		assertFalse("Errore cambio password", userDao.setPassword("Liquid", "ciaociao"));
		assertTrue("Errore cambio password", userDao.setPassword("Leo","ciaociao"));
		assertTrue("Rimozione utente fallita",userDao.removeUser("Leo"));
	}
		
	@Test
	public void testName(){
		init();
		assertFalse("Errore cambio password", userDao.setName("Liquid", "ciaociao"));
		assertTrue("Errore cambio password", userDao.setName("Leo","ciaociao"));
		assertTrue("Rimozione utente fallita",userDao.removeUser("Leo"));
	}
	
	@Test
	public void testSurname(){
		init();
		assertFalse("Errore cambio password", userDao.setSurname("Liquid", "ciaociao"));
		assertTrue("Errore cambio password", userDao.setSurname("Leo","ciaociao"));
		assertTrue("Rimozione utente fallita",userDao.removeUser("Leo"));
	}

}
