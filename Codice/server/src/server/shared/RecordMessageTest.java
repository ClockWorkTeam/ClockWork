/**
* Nome: RecordMessageTest
* Package: server.shared
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/05
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+------------------------------------------+
* | Data    | Programmatore |         Modifiche                        |
* +---------+---------------+------------------------------------------+
* |  130305 |     ZHP       | + creazione documento	                   |
* |  130710 |     VF        | + modificata inizializzazione dei test   |
* |         |               |                                          |
* +---------+---------------+------------------------------------------+
*
*/ 
package server.shared;

import static org.junit.Assert.*;

import org.junit.*;

public class RecordMessageTest {
	RecordMessage recordMessage;
	
	@Before
	public void init() {
		recordMessage= new RecordMessage("ClockWork","ClockWork7","prova", "2013-01-01 10:03:02");
	}

	@Test
	public void testGetSender() {
		assertTrue("Sender non è quello atteso", recordMessage.getSender() == "ClockWork");
		assertFalse("Sender non è quello atteso", recordMessage.getSender() == "Clock Work");
	}

	@Test
	public void testGetAddressee() {
		assertTrue("Password non è quella attesa", recordMessage.getAddressee() == "ClockWork7");
		assertFalse("Password non è quella attesa", recordMessage.getAddressee() == "ClockWork");
	}

	@Test
	public void testGetPath() {
		assertTrue("Path non è quello atteso", recordMessage.getPath() == "prova");
		assertFalse("Path non è quello atteso", recordMessage.getPath() == "sbagliato");
	}

	@Test
	public void testGetDate() {
		assertTrue("Data non è quella attesa", recordMessage.getDate() == "2013-01-01 10:03:02");
		assertFalse("Data non è quella attesa", recordMessage.getDate() == "2013-01-01");
	}

}
