/**
* Nome: TutorialsDaoSQLTest
* Package: server.dao
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

package server.dao;

import static org.junit.Assert.*;

import org.junit.Test;

public class TutorialsDaoSQLTest {
	 private JavaConnectionSQLite connection;
	 private TutorialsDaoSQL tutorialsDaoSQL;
	 
	 @Test
	 public void testTutorialsDaoSQL() {
		connection= new JavaConnectionSQLite();
		
		//TutorialDataSQL vuoto
		tutorialsDaoSQL=new  TutorialsDaoSQL(connection);
		assertTrue("",tutorialsDaoSQL.getTutorials().getTutorials().size()==0);
		
		//TutorialDataSQL non vuoto
		connection.executeUpdate("INSERT INTO TutorialDataSQL VALUES ('url1','title1');");
		connection.executeUpdate("INSERT INTO TutorialDataSQL VALUES ('url2','title2');");
		connection.executeUpdate("INSERT INTO TutorialDataSQL VALUES ('url3','title3');");
		tutorialsDaoSQL=new  TutorialsDaoSQL(connection);
		
		System.out.println(tutorialsDaoSQL.getTutorials().getTutorials().size());
		assertTrue("",tutorialsDaoSQL.getTutorials().getTutorials().size()==3);
		
		connection.executeUpdate("DELETE FROM TutorialDataSQL");
	}

}
