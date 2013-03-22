package server.dao;

import static org.junit.Assert.*;
import org.junit.Test;
import server.shared.*;
import java.util.Date;
import java.util.Vector;

public class RecordMessageDaoSQLTest {
	private JavaConnectionSQLite connection;
	private UserList usersList;
	
	private RecordMessageDaoSQL rec;
	private UserDaoSQL users;
	
	private void init(){
		connection =new JavaConnectionSQLite();
		usersList= new UserList();
		
		rec=new RecordMessageDaoSQL(connection,usersList);
		users= new UserDaoSQL(connection,usersList);
	}
	
	@Test
	public void testCreate() {
		init();
		User user1 =users.createUser("Liquid90", "ciao", "Giacomo", "Bain", "0.0.0.2");
		User user2=users.createUser("Leo", "ciaociao", "Pardis", "ZH", "0.0.1.2");
		
		RecordMessage mex = rec.createMessage(user1.getUsername(), user2.getUsername(), "ciao", new Date(2013-3-12));
		
		Vector<RecordMessage> messages = user1.getMessages();
		assertTrue("numero errato di messaggi presenti", messages.size()==0);
		messages = user2.getMessages();
		assertTrue("numero errato di messaggi presenti", messages.size()==1);
		assertTrue("Il messaggio non è presente", messages.contains(mex));
	}

	@Test
	public void testGetMex() {
		init();
		User user1 =users.createUser("Liquid90", "ciao", "Giacomo", "Bain", "0.0.0.2");
		User user2=users.createUser("Leo", "ciaociao", "Pardis", "ZH", "0.0.1.2");
		
		rec.createMessage(user1.getUsername(), user2.getUsername(), "ciao", new Date(2013-3-12));
		
		Vector<RecordMessage> messages = user2.getMessages();
		assertTrue("Il messaggio non è stato assegnato correttamente", messages==rec.getMessages(user2.getUsername()));
	}
	
	@Test
	public void testRM(){
		init();
		users.createUser("Liquid90", "ciao", "Giacomo", "Bain", "0.0.0.2");
		RecordMessage mex = rec.createMessage("Je", "Liquid90", "ciao", new Date(2013-3-12));
		assertTrue("errore nella cancellazione", rec.removeMessage(mex));
	}
}
