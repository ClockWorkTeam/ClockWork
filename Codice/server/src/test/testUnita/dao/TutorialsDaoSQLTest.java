/**
* Nome: TutorialsDaoSQLTest
* Package: server.dao
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-------------------------------------------+
* | Data    | Programmatore |         Modifiche        					|
* +---------+---------------+-------------------------------------------+
* |  130306 |     ZHP       | + creazione documento	   					|
* |  130712 |     VF        | + modificata inizializzazione dei test	|
* |         |               | + creato testGetTutorialsFromDB          	|
* |         |               |                    					    |
* +---------+---------------+-------------------------------------------+
*
*/ 

package test.testUnita.dao;

import static org.junit.Assert.*;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.*;

import server.dao.JavaConnectionSQLite;
import server.dao.TutorialsDaoSQL;

public class TutorialsDaoSQLTest {
  private TutorialsDaoSQL tutorialsDaoSQL;
  private JavaConnectionSQLite connection = JavaConnectionSQLite.getInstance();
  ResultSet rs;
	
  @Before
  public void init(){
	connection.executeUpdate("DELETE FROM TutorialDataSQL");
	
	connection.executeUpdate("INSERT INTO TutorialDataSQL VALUES ('url1','title1');");
	connection.executeUpdate("INSERT INTO TutorialDataSQL VALUES ('url2','title2');");
	connection.executeUpdate("INSERT INTO TutorialDataSQL VALUES ('url3','title3');");
	
	tutorialsDaoSQL=TutorialsDaoSQL.getInstance();
  }
	 
  @Test
  public void testGetTutorialsFromDB() throws SQLException {
		
		rs = connection.select("TutorialDataSQL","*","","");
		int cont=0;
		if(rs!=null){
			do{
				 cont++;
			}while( rs.next());
		}
		assertTrue("Numero messaggi errato",cont==3);
		
		assertTrue("Numero tutorial errato",tutorialsDaoSQL.getTutorials().getTutorials().size()==3);
	}
	 
  @Test
  public void testGetInstance() {
	assertTrue("Sono state create più istanze di una classe Singleton",tutorialsDaoSQL==(TutorialsDaoSQL.getInstance()));
  }

}
