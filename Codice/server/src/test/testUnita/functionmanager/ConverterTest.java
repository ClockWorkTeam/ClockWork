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
* |  130710 |     VF        | + modificati test  	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/ 
package test.testUnita.functionmanager;

import static org.junit.Assert.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Vector;
import org.junit.Test;

import server.functionmanager.Converter;
import server.shared.RecordMessage;
import server.shared.User;

public class ConverterTest {
	Converter converter = new Converter();

	@Test
	public void testConvertUsers() {
		Vector<User> users = new Vector<User>();
		
		users.add(new User("ClockWork1", "","","1"));
		users.add(new User("ClockWork2", "","","2"));
		users.add(new User("ClockWork3", "","","3"));
		
		String result= converter.convertUsers(users,"");	
		assertTrue("numero user presenti errato", result.contains("\"size\": \"3\""));
		assertTrue("numero virgole errato", (result.split(",", -1).length-1)==(3*4));
		assertTrue("numero virgolette errato", (result.split("\"", -1).length-1)==(((4*2)*3)+2)*2);		
		String esatta="{ \"size\": \"3\", \"username0\": \"ClockWork1\", \"name0\": \"\", \"surname0\": \"\", \"IP0\": \"1\", \"username1\": \"ClockWork2\", \"name1\": \"\", \"surname1\": \"\", \"IP1\": \"2\", \"username2\": \"ClockWork3\", \"name2\": \"\", \"surname2\": \"\", \"IP2\": \"3\"}";
		assertTrue("stringa errata",result.equals(esatta));
	}

	@Test
	public void testConvertMessages() {
		Vector<RecordMessage> messages =new Vector<RecordMessage>();
		java.util.Date dt = new java.util.Date();
		java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String date=sdf.format(dt);
		messages.add(new RecordMessage("ClockWork", "ClockWork1", "messaggio", date));

		String result=converter.convertMessages(messages,"");
		assertTrue("numero messaggi presenti errato", result.contains("\"size\": \"1\""));
		assertTrue("numero virgole errato", (result.split(",", -1).length-1)==(1*3));
		assertTrue("numero virgolette errato", (result.split("\"", -1).length-1)==(((3*2)*1)+2)*2);
		String esatta="{ \"size\": \"1\", \"sender0\": \"ClockWork\", \"path0\": \"messaggio\", \"date0\": \""+date+"\"}";
		assertTrue("stringa errata",result.equals(esatta));
	}

	@Test
	public void testConvertTutorials() {
		Map<String, String> tutorials = new HashMap<String,String>(2);
		tutorials.put("title1", "url1");
		tutorials.put("title2", "url2");
		
		String result=converter.convertTutorials(tutorials,"");
		assertTrue("numero messaggi presenti errato", result.contains("\"size\": \"2\""));
		assertTrue("numero virgole errato", (result.split(",", -1).length-1)==(2*2));
		assertTrue("numero virgolette errato", (result.split("\"", -1).length-1)==(((2*2)*2)+2)*2);
		String esatta="{ \"size\": \"2\", \"title0\": \"title1\", \"path0\": \"url1\", \"title0\": \"title2\", \"path0\": \"url2\"}";
		assertTrue("stringa errata",result.equals(esatta));
	}

}
