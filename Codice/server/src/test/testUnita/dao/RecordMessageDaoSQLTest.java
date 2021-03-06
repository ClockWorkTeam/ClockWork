/**
* Nome: RecordMessageDaoSQLTest
* Package: server.dao
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-------------------------------------------+
* | Data    | Programmatore |         Modifiche        					|
* +---------+---------------+-------------------------------------------+
* |  130306 |     ZHP       | + creazione documento	 					|
* |  130712 |     VF        | + modificata inizializzazione dei test	|
* |         |               | + creato testAddMessage                 	|
* |         |               | + creato testRemoveMessage           		|
* |         |               | + creato testGetAllMessages              	|
* |         |               |                          					|
* +---------+---------------+-------------------------------------------+
*
*/ 

package test.testUnita.dao;

import static org.junit.Assert.*;

import java.sql.*;

import org.junit.*;

import server.dao.JavaConnectionSQLite;
import server.dao.RecordMessageDaoSQL;
import server.shared.RecordMessage;

public class RecordMessageDaoSQLTest {
  private RecordMessageDaoSQL recordMessageDaoSQL;
  private JavaConnectionSQLite connection = JavaConnectionSQLite.getInstance();
  ResultSet rs;
	
  @Before
  public void init(){
	recordMessageDaoSQL=RecordMessageDaoSQL.getInstance();
	connection.executeUpdate("DELETE FROM RecordMessageDataSQL");	
  }
	
  @Test
  public void testAddMessage(){
	java.util.Date dt = new java.util.Date();
	java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String data=sdf.format(dt);
	RecordMessage message=new RecordMessage("ClockWork7", "ClockWork", "prova", data);
		
	assertTrue("Operazione di inserimento nel DB fallita", recordMessageDaoSQL.addMessage(message));
		
    rs = connection.select("RecordMessageDataSQL","*","","");
    try {
		assertTrue("Messaggio non inserito nel database",rs.getRow()==1);
		assertTrue("Sender non inserito correttamente nel db", rs.getString("sender").equals("ClockWork7"));
		assertTrue("Addressee non inserita correttamente nel db", rs.getString("addressee").equals("ClockWork"));
		assertTrue("Sender non inserito correttamente nel db", rs.getString("record_message").equals("prova"));
		assertTrue("Addressee non inserita correttamente nel db", rs.getString("creation").equals(data));
	} catch (SQLException e) {
		System.out.println("Eccezzione lanciata dall'oggetto della classe ResultSet");
	}
	
  }
	
  @Test
  public void testRemoveMessage(){
	java.util.Date dt = new java.util.Date();
	java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String data=sdf.format(dt);
	RecordMessage m=new RecordMessage("ClockWork7", "ClockWork", "prova", data);
	connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork','prova','"+data+"');");
	connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork2','prova','"+data+"');");
	
	assertTrue("Operazione di rimozzione messaggio nel DB fallita", recordMessageDaoSQL.removeMessage(m));
	rs = connection.select("RecordMessageDataSQL","*","","");
	try {
		assertTrue("Database non vuoto",rs.getRow()==1);
	} catch (SQLException e) {
		System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
  }
	
  @Test
  public void testGetAllMessages(){
    java.util.Date dt = new java.util.Date();
	java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String data=sdf.format(dt);

	connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork','prova','"+data+"');");
	connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork','ciao','"+data+"');");
	connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork2','ciao','"+data+"');");
		
	int cont=0;
	//messaggi di un utente
	try {
		rs = connection.select("RecordMessageDataSQL","count(*) as num","addressee='ClockWork'","");
		cont = rs.getInt("num");
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork").size()==cont);
	} catch (SQLException e1) {
		System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
		
	//messaggi di un'altro utente
	try {
		rs = connection.select("RecordMessageDataSQL","count(*) as num","addressee='ClockWork2'","");
		cont = rs.getInt("num");
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork2").size()==cont);
	} catch (SQLException e1) {
		System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
		
	//non ci sono messaggi per un utente
	try {
		rs = connection.select("RecordMessageDataSQL","count(*) as num","addressee='ClockWork7'","");
		cont = rs.getInt("num");
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork7").size()==cont);
	} catch (SQLException e1) {
		System.out.println("Eccezione lanciata dall'oggetto della classe ResultSet");
	}
  }


  @Test
  public void testGetInstance() {
	assertTrue("Sono state create pi� istanze di una classe Singleton",recordMessageDaoSQL==(RecordMessageDaoSQL.getInstance()));
  }
	
}
