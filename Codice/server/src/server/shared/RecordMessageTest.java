/**
* Nome: RecordMessageTest
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

import org.junit.Test;

public class RecordMessageTest {
	RecordMessage recordMessage;
	
	public void init() {
		recordMessage= new RecordMessage("ClockWork","password","prova", "2013-01-01 10:03:02");
	}

	@Test
	public void testGetSender() {
		init();
		assertTrue("Sender non è quello atteso", recordMessage.getSender() == "ClockWork");
		assertFalse("Sender non è quello atteso", recordMessage.getSender() == "Clock Work");
	}

	@Test
	public void testGetAddressee() {
		init();
		assertTrue("Password non è quella attesa", recordMessage.getAddressee() == "password");
		assertFalse("Password non è quella attesa", recordMessage.getAddressee() == "sbagliata");
	}

	@Test
	public void testGetPath() {
		init();
		assertTrue("Path non è quello atteso", recordMessage.getPath() == "prova");
		assertFalse("Path non è quello atteso", recordMessage.getPath() == "sbagliato");
	}

	@Test
	public void testGetDate() {
		init();
		assertTrue("Data non è quella attesa", recordMessage.getDate() == "2013-01-01 10:03:02");
		assertFalse("Data non è quella attesa", recordMessage.getDate() == "2013-01-01");
	}

}
