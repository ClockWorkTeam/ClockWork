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

package server.dao;

import static org.junit.Assert.*;

import java.sql.*;

import org.junit.*;

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
  public void testAddMessage() throws SQLException {
	java.util.Date dt = new java.util.Date();
	java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String data=sdf.format(dt);
	RecordMessage message=new RecordMessage("ClockWork7", "ClockWork", "prova", data);
		
	assertTrue("Operazione di inserimento nel DB fallita", recordMessageDaoSQL.addMessage(message));
		
    rs = connection.select("RecordMessageDataSQL","*","","");
    assertTrue("Messaggio non inserito nel database",rs.getRow()==1);
	assertTrue("Sender non inserito correttamente nel db", rs.getString("sender").equals("ClockWork7"));
	assertTrue("Addressee non inserita correttamente nel db", rs.getString("addressee").equals("ClockWork"));
	assertTrue("Sender non inserito correttamente nel db", rs.getString("record_message").equals("prova"));
	assertTrue("Addressee non inserita correttamente nel db", rs.getString("creation").equals(data));
  }
	
  @Test
  public void testRemoveMessage() throws SQLException {
	java.util.Date dt = new java.util.Date();
	java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	String data=sdf.format(dt);
	RecordMessage m=new RecordMessage("ClockWork7", "ClockWork", "prova", data);
	connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork','prova','"+data+"');");
	
	assertTrue("Operazione di rimozzione messaggio nel DB fallita", recordMessageDaoSQL.removeMessage(m));
	rs = connection.select("RecordMessageDataSQL","*","","");
	assertTrue("Database non vuoto",rs.getRow()==0);
  }
	
	@Test
	public void testGetAllMessages() throws SQLException {
		java.util.Date dt = new java.util.Date();
		java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String data=sdf.format(dt);

		connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork','prova','"+data+"');");
		connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('ClockWork7','ClockWork','ciao','"+data+"');");
		rs = connection.select("RecordMessageDataSQL","*","","");
		int cont=0;
		if(rs!=null){
			do{
				 cont++;
			}while( rs.next());
		}
		assertTrue("Numero messaggi errato",cont==2);
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork").size()==2);
	}


  @Test
  public void testGetInstance() {
	assertTrue("Sono state create più istanze di una classe Singleton",recordMessageDaoSQL==(RecordMessageDaoSQL.getInstance()));
  }
	
}
