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
import java.util.Map;

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
    int cont=0;
	//messaggi di un utente
	try {
	  rs = connection.select("TutorialDataSQL","count(*) as num","","");
	  cont = rs.getInt("num");
	  
	  Map<String, String> tutorials=tutorialsDaoSQL.getTutorials().getTutorials();
	  assertTrue("Numero tutorial errato",tutorials.size()==cont);

	  assertTrue("Titolo tutorial errato",tutorials.containsKey("title1"));
	  assertTrue("Indirizzo tutorial errato",tutorials.containsValue("url1"));
	  assertTrue("Titolo tutorial errato",tutorials.containsKey("title2"));
	  assertTrue("Indirizzo tutorial errato",tutorials.containsValue("url2"));
	  assertTrue("Titolo tutorial errato",tutorials.containsKey("title3"));
	  assertTrue("Indirizzo tutorial errato",tutorials.containsValue("url3"));
	}catch (SQLException e1) {
	  System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
    }  
  }
	 
  @Test
  public void testGetInstance() {
	assertTrue("Sono state create più istanze di una classe Singleton",tutorialsDaoSQL==(TutorialsDaoSQL.getInstance()));
  }

}
