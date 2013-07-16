/**
* Nome: TutorialsTest
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
* |         |               | + creato testInsert                      |
* |         |               | + creato testGetTutorials                |
* |         |               |                                          |
* +---------+---------------+------------------------------------------+
*
*/ 
package test.testUnita.shared;

import static org.junit.Assert.*;

import org.junit.*;

import server.shared.Tutorials;

public class TutorialsTest {
	Tutorials tutorials;
	
	@Before
	public void init() {
		tutorials=new Tutorials(2);
		tutorials.insert("prova", "www.prova.it");
	}
	
	@Test
	public void testTutorials(){
		assertTrue("Il tutorial non è stato inserito", tutorials.getTutorials().size()==1);
		assertTrue("Il tutorial non è stato inserito correttamente", tutorials.getTutorials().get("prova").equals("www.prova.it"));
		
	}
	
	@Test
	public void testInsert(){
		assertTrue("Il tutorial non è stato inserito", tutorials.getTutorials().containsKey("prova"));
		assertTrue("Il tutorial non è stato inserito", tutorials.getTutorials().containsValue("www.prova.it"));
	}
	
	@Test
	public void testGetTutorials(){
		Tutorials tutorials2=new Tutorials(2);
		tutorials2.insert("prova", "www.prova.it");
		assertTrue("Il tutorial non è stato inserito", tutorials.getTutorials().equals(tutorials2.getTutorials()));	
	}
	
}
