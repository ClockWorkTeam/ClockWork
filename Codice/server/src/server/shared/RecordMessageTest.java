/**
* Nome: RecordMessage
* Package: server.shared
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/07
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130307 |     ZHP       | + creazione documento	   |
* |         |               |    TEST DI UNITA'        |
* +---------+---------------+--------------------------+
*
*/ 

package server.shared;
import static org.junit.Assert.*;

import org.junit.Test;
import java.util.Date;

public class RecordMessageTest {
	RecordMessage recMex;
	
	private void init(){
		recMex= new RecordMessage("Liquid90","Pardis","ciao", new Date(2013-01-01));	
	}

	@Test
	public void test() {
		init();
		assertTrue("Sender non è quello atteso", recMex.getSender() == "Liquid90");
		assertTrue("Password non è quello atteso", recMex.getAddressee() == "Pardis");
		assertTrue("IP non è quello atteso", recMex.getPath() == "ciao");
		assertTrue("IP non è quello atteso", (recMex.getDate()).equals(new Date(2013-01-01)));
	}

}
