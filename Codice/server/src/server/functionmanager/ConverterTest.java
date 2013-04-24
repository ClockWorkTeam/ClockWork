/**
* Nome: ConverterTest
* Package: server.functionmanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130306 |     ZHP       | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/ 
package server.functionmanager;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;
import org.junit.Test;

import server.shared.RecordMessage;
import server.shared.User;

public class ConverterTest {
	Converter converter = new Converter();

	@Test
	public void testGetAllContacts() {
		Vector<User> users = new Vector<User>();
		
		users.add(new User("ClockWork1", "","","1"));
		users.add(new User("ClockWork2", "","","2"));
		users.add(new User("ClockWork3", "","","3"));
		
		String result= converter.getAllContacts(users);	
		assertTrue("numero user presenti errato", result.contains("\"size\": \"3\""));
		assertTrue("numero virgole errato", (result.split(",", -1).length-1)==(3*4));
		assertTrue("numero virgolette errato", (result.split("\"", -1).length-1)==(((4*2)*3)+2)*2);		
		
		System.out.println(result);
	}

	@Test
	public void testGetMessages() {
		Vector<RecordMessage> messages =new Vector<RecordMessage>();
		java.util.Date dt = new java.util.Date();
		java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		messages.add(new RecordMessage("ClockWork", "ClockWork1", "messaggio", sdf.format(dt)));

		String result=converter.getMessages(messages);
		assertTrue("numero messaggi presenti errato", result.contains("\"size\": \"1\""));
		assertTrue("numero virgole errato", (result.split(",", -1).length-1)==(1*3));
		assertTrue("numero virgolette errato", (result.split("\"", -1).length-1)==(((3*2)*1)+2)*2);
		System.out.println(result);
	}

	@Test
	public void testGetTutorials() {
		Map<String, String> tutorials = new HashMap<String,String>(2);
		tutorials.put("title1", "url1");
		tutorials.put("title2", "url2");
		
		String result=converter.getTutorials(tutorials);
		assertTrue("numero messaggi presenti errato", result.contains("\"size\": \"2\""));
		assertTrue("numero virgole errato", (result.split(",", -1).length-1)==(2*2));
		assertTrue("numero virgolette errato", (result.split("\"", -1).length-1)==(((2*2)*2)+2)*2);
		System.out.println(result);		
	}

}
