/**
* Nome: UserTest
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

import java.util.Vector;

import org.junit.Test;

public class UserTest {
	User user;
	
	public void init(){
		user=new User("ClockWork7","Clock Work", "Team", "7");
	}

	@Test
	public void testGetUsername() {
		init();
		assertTrue("Username non è quella attesa", user.getUsername().equals("ClockWork7"));
		assertFalse("Username non è quella attesa", user.getUsername().equals("ClockWork"));		
	}

	@Test
	public void testGetName() {
		init();
		assertTrue("Nome non è quello atteso", user.getName().equals("Clock Work"));
		assertFalse("Nome non è quello atteso", user.getName().equals("ClockWork"));		
	}

	@Test
	public void testGetSurname() {
		init();
		assertTrue("Cognome non è quello atteso", user.getSurname().equals("Team"));
		assertFalse("Cognome non è quello atteso", user.getSurname().equals("Team CW"));	
	}

	@Test
	public void testGetIP() {
		init();
		assertTrue("IP non è quello atteso", user.getIP().equals("7"));
		assertFalse("IP non è quello atteso", user.getIP().equals("71"));
	}

	@Test
	public void testSetName() {
		testGetName();
		user.setName("");
		assertTrue("Nome non è quello atteso", user.getName().equals(""));
		assertFalse("Nome non è quello atteso", user.getName().equals("Clock Work"));	
		
	}

	@Test
	public void testSetSurname() {
		testGetSurname();
		user.setSurname("");
		assertTrue("Cognome non è quello atteso", user.getSurname().equals(""));
		assertFalse("Cognome non è quello atteso", user.getSurname().equals("Team"));	

	}

	@Test
	public void testSetIP() {
		testGetIP();
		user.setIP("0");
		assertTrue("IP non è quello atteso", user.getIP().equals("0"));
		assertFalse("IP non è quello atteso", user.getIP().equals("7"));
	}

	@Test
	public void testGetMessages() {
		init();
		assertTrue("Il numero di messaggi inizialmente dovrebbe essere 0", user.getMessages().size()==0);
		user.setMessage(new RecordMessage("ClockWork","ClockWork7","prova", "2013-01-01 10:03:02"));
		assertTrue("Il numero di messaggi dovrebbe essere 1", user.getMessages().size()==1);
	}
	
	@Test
	public void testSetMessage() {
		init();
		int num_mex=(user.getMessages()).size();
		user.setMessage(new RecordMessage("ClockWork","ClockWork7","prova", "2013-01-01 10:03:02"));
		assertTrue("Il messaggio non è stato aggiunto", user.getMessages().size()==(num_mex+1));
	}

	@Test
	public void testSetMessages() {
		init();
		Vector<RecordMessage> messages= new Vector<RecordMessage>();
		messages.add(new RecordMessage("ClockWork","ClockWork7","prova", "2013-01-01 10:03:02"));
		messages.add(new RecordMessage("ClockWork","ClockWork7","prova2", "2013-01-01 11:03:02"));
		user.setMessages(messages);
		assertTrue("I messaggi non sono stati aggiunti", user.getMessages().size()==2);
		assertFalse("I messaggi non sono stati aggiunti", user.getMessages().size()==0);
	}


	@Test
	public void testRemoveMessage() {
		testSetMessages();
		assertTrue("Il numero di messaggi inizialmente dovrebbe essere 2", user.getMessages().size()==2);
		RecordMessage message= user.getMessages().get(0);
		user.removeMessage(message);
		assertTrue("Il messaggio non è stato tolto", user.getMessages().size()==1);		
	}


}
