/**
* Nome: JavaConnectionSQLiteTest
* Package: server.dao
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/07
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130308 |     ZHP       | + TEST "UNITA'" 	   	   |
*
*/ 

package server.dao;

import static org.junit.Assert.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import org.junit.Test;
//PRECONDIZIONE: Il database non contenga nessun valore
public class JavaConnectionSQLiteTest {
	JavaConnectionSQLite connection=JavaConnectionSQLite.getInstance();
	
/*	 @Test
	public void resetTable(){
	 
	 connection.executeUpdate("DELETE FROM UserDataSQL");	
	 connection.executeUpdate("DELETE FROM TutorialDataSQL");
	 connection.executeUpdate("DELETE FROM RecordMessageDataSQL");
	 }
*/
	@Test
	public void testDBUser() throws SQLException {
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Tabella UserDataSQL dovrebbe essere vuota", rs.isAfterLast());

	    connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('ClockWork7','password','Clock Work','Team', '7');");
	    rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Tabella UserDataSQL  dovrebbe contenere un elemento", !rs.isAfterLast());
	    assertTrue("Username inserita non è corretta",rs.getString("username").equals("ClockWork7"));
	    assertTrue("Password inserita non è corretta",rs.getString("password").equals("password"));
	    assertTrue("Nome inserito non è corretto",rs.getString("name").equals("Clock Work"));
	    assertTrue("Cognome inserito non è corretto",rs.getString("surname").equals("Team"));
	    assertTrue("IP inserito non è corretto",rs.getString("IP").equals("7"));
	    
	    connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='ClockWork7';");
	    rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Tabella UserDataSQL dovrebbe essere vuota", rs.isAfterLast());	    
	}
	
	@Test
	public void testDBRecordMessage() throws SQLException {
	    ResultSet rs = connection.select("RecordMessageDataSQL","*","","");
	    assertTrue("Tabella RecordMessageDataSQL dovrebbe essere vuota", rs.isAfterLast());
	    
	    connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork','prova','2013-03-10 10:30:00');");
	    rs = connection.select("RecordMessageDataSQL","*","","");
	    assertTrue("Tabella RecordMessageDataSQL  dovrebbe contenere un elemento", !rs.isAfterLast());
	    assertTrue("Mittente inserito non è corretto", rs.getString("sender").equals("ClockWork7"));
	    assertTrue("Destinatario inserito non è corretto", rs.getString("addressee").equals("ClockWork"));
	    assertTrue("Messaggio inserito non è corretto", rs.getString("record_message").equals("prova"));
	    assertTrue("Data inserita non è corretta", rs.getString("creation").equals("2013-03-10 10:30:00"));
	    
	    connection.executeUpdate("DELETE FROM RecordMessageDataSQL WHERE record_message='prova';");
	    rs = connection.select("UserDataSQL","*","","");
	    assertTrue("Tabella RecordMessageDataSQL dovrebbe essere vuota", rs.isAfterLast());
	}
	
	@Test
	public void testDBTutorial() throws SQLException {
	    ResultSet rs = connection.select("TutorialDataSQL","*","","");
	    assertTrue("TabellaTutorialDataSQL dovrebbe essere vuota", rs.isAfterLast());
	    
	    connection.executeUpdate("INSERT INTO TutorialDataSQL VALUES ('www.prova.it','prova');");
	    rs = connection.select("TutorialDataSQL","*","","");
	    assertTrue("Tabella TutorialDataSQL  dovrebbe contenere un elemento", !rs.isAfterLast());
	    assertTrue("Url inserito non è corretto", rs.getString("url").equals("www.prova.it"));
	    assertTrue("Titolo inserito non è corretto", rs.getString("title").equals("prova"));
	    
	    connection.executeUpdate("DELETE FROM TutorialDataSQL WHERE title='prova';");
	    rs = connection.select("TutorialDataSQL","*","","");
	    assertTrue("Tabella TutorialDataSQL dovrebbe essere vuota", rs.isAfterLast());
	}

}