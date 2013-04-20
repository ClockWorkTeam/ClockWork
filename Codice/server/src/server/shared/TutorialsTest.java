/**
* Nome: TutorialsTest
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

public class TutorialsTest {
	Tutorials tutorials;
	
	@Test
	public void testTutorials(){
		tutorials=new Tutorials(2);
		tutorials.insert("prova", "www.prova.it");
		assertTrue("Il tutorial non è stato inserito", tutorials.getTutorials().size()==1);
		assertTrue("Il tutorial non è stato inserito correttamente", tutorials.getTutorials().get("prova").equals("www.prova.it"));
		
	}

}
