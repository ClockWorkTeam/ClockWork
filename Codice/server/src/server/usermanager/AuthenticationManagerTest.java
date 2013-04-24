package server.usermanager;

import static org.junit.Assert.*;

import org.junit.Test;

import server.dao.JavaConnectionSQLite;
import server.dao.LoginDao;
import server.dao.LoginDaoSQL;
import server.dao.UserDao;
import server.dao.UserDaoSQL;
import server.shared.User;
import server.shared.UserList;

public class AuthenticationManagerTest {
	private AuthenticationManager authenticationManager;
	private UserDao userDao;
	public void init() {
		this.authenticationManager= new AuthenticationManager();
		JavaConnectionSQLite connection= new JavaConnectionSQLite();
		UserList userList=new UserList();
		LoginDao loginDao=new LoginDaoSQL(connection, userList);
		userDao=new UserDaoSQL(connection, userList);
		this.authenticationManager.init(loginDao, userDao);
	}

	@Test
	public void testCreateUser_and_RemoveUser() {
		init();
		User user1 = authenticationManager.createUser("username", "password", "name", "surname", "IP");
		User user2 = authenticationManager.createUser("username", "password", "", "", "IP");
		assertTrue("User non creato", user1!=null);
		assertTrue("User creato con un username già presente", user2==null);
		assertTrue("Numero utenti presenti è sbagliato", userDao.getAllUsers().size()==1);		
		authenticationManager.removeUser("username");
		assertTrue("Numero utenti presenti è sbagliato", userDao.getAllUsers().size()==0);
	}

	@Test
	public void testLogin_and_Logout() {
		init();
		assertTrue("Login utente inesistente",authenticationManager.login("username", "password", "10.01.01.01")==null);
		User user1 = authenticationManager.createUser("username", "password", "name", "surname", "0");
		assertTrue("Login password errata",authenticationManager.login("username", "p", "10.01.01.01")==null);
		
		assertTrue("Login non effettuata",authenticationManager.login("username", "password", "10.01.01.01")==user1);
		assertTrue("IP non modificata",user1.getIP().equals("10.01.01.01"));
		
		assertTrue("Logout fallita", authenticationManager.logout(user1));
		assertTrue("IP non modificata",user1.getIP().equals("0"));
		authenticationManager.removeUser("username");
	}

}
