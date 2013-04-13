package server.usermanager;

import static org.junit.Assert.*;
import org.junit.Test;

import server.dao.*;
import server.shared.User;
import server.shared.UserList;

public class AuthenticationManagerTest {
	private AuthenticationManager am;
	UserList users;
	
	
	private void init(){
		JavaConnectionSQLite connection =new JavaConnectionSQLite();
		users = new UserList();
		LoginDao loginDao= new LoginDaoSQL(connection, users);
		UserDao userDao =new UserDaoSQL(connection,users);
		RecordMessageDao messages =new RecordMessageDaoSQL(connection, users);
		am=new AuthenticationManager();
		am.init(messages, loginDao, userDao);
	}

	@Test
	public void test(){
		init();
		User user =am.login("Liquid", "1234", "09092");
		assertTrue("Login errata", user==null);
		
		user=am.createUser("Liquid90", "1234", "Giacomo", "Bain", "1234");
		assertTrue("registrazione fallita",user!=null);

		User user2=am.createUser("Liquid90", "666667987", "", "", "");
		assertTrue("registrato user con username già presente",user2==null);
			
		assertTrue("logout fallito", am.logout(user));
		assertTrue("ip non modificata",user.getIP()=="0");
		
		assertFalse("login errata", am.login("Liquid90", "","")!=null);

		user= am.login("Liquid90", "1234","909");
		assertTrue("login errata", user!=null);
		assertFalse("ip non modificata", user.getIP()=="0");
	}

}
