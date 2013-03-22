package server.dao;

import static org.junit.Assert.*;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;
import server.shared.*;

public class LoginDaoSQLTest {
	private JavaConnectionSQLite connection;
	private UserList users;
	private LoginDaoSQL login;
	
	private void init(){
		connection=new JavaConnectionSQLite();
		users=new UserList();
		login= new LoginDaoSQL(connection, users);
	}

	private void initConDB(){
		init();
		connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('Leo','par2409','','','0');");
		User user=new User("Leo","","","0.0.10.0");
		assertTrue("Utente non aggiunto",users.addUser(user));
	}
		
	@Test
	public void testEmptyUserDB(){
		init();
		assertTrue("Login effettuata erroneamente", login.login("Liquid","ciao","0.0.10.0")==null);
	}

	@Test
	public void testUserDBLogin(){
		initConDB();
		assertTrue("Login non effettuata", login.login("Liquid","","0.1")==null);
		assertTrue("Login non effettuata", login.login("Leo","","0.1")==null);
		assertTrue("Login effettuata", login.login("Leo","par2409","0.1")!=null);
//Test IP
		assertTrue("IP modificato correttamente",((users.getUser("Leo")).getIP())== "0.1");
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    try{
	    	assertTrue("IP database non modificato", (rs.getString("IP")).equals("0.1"));
	    }catch(SQLException e){System.out.println("empty");};
	    connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='Leo';");
	}

	@Test
	public void testUserDBLogout(){
		initConDB();
		User user=login.login("Leo","par2409","0.1");
		assertTrue("Login non effettuata", user!=null);
		assertTrue("Logout non effettuata", login.logout(user));
		//Test IP
		assertTrue("IP modificato correttamente",((users.getUser("Leo")).getIP())== "0");
		ResultSet rs = connection.select("UserDataSQL","*","","");
		try{
			assertTrue("IP database non modificato", (rs.getString("IP")).equals("0"));
		}catch(SQLException e){System.out.println("empty");};
		
	    connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='Leo';");
	}

}
