/**
* Nome: RecordMessageDaoSQLTest
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

import java.sql.ResultSet;
import java.sql.SQLException;

import org.junit.Test;

import server.shared.RecordMessage;
import server.shared.UserList;

public class RecordMessageDaoSQLTest {
	private JavaConnectionSQLite connection;;
	private UserDaoSQL userDaoSQL;
	private RecordMessageDaoSQL recordMessageDaoSQL;
	
	public void init() {
		connection =new JavaConnectionSQLite();
		UserList userList= new UserList();
		userDaoSQL= new UserDaoSQL(connection, userList);
		recordMessageDaoSQL=new RecordMessageDaoSQL(connection,userList);
	}
	
	@Test
	public void testCreateMessage_and_RemoveMessage_and_GetMessage() throws SQLException{
		init();
		userDaoSQL.createUser("ClockWork7", "password", "Clock Work", "Team", "7");
		java.util.Date dt = new java.util.Date();
		java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		assertTrue("Destinatario non presente", recordMessageDaoSQL.createMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt))==null);

		userDaoSQL.createUser("ClockWork", "password", "Clock Work", "Team", "7");
		assertTrue("Destinatario presente", recordMessageDaoSQL.createMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt))!=null);
		
		assertTrue("Messaggio già presente", recordMessageDaoSQL.createMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt))==null);
		assertTrue("Messaggio inserito tra i messaggi del destinatario",recordMessageDaoSQL.getAllMessages("ClockWork").size()==1);
		assertTrue("Messaggio inserito erroneamente nella lista del mittente",recordMessageDaoSQL.getAllMessages("ClockWork7").size()==0);

		RecordMessage messaggioSalvato=recordMessageDaoSQL.getMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt));
		assertTrue("Messaggio inserito erroneamente", messaggioSalvato!=null);
		ResultSet rs = connection.select("RecordMessageDataSQL","*","","");		
		assertTrue("Messaggio inserito nel database", !rs.isAfterLast());
	
		assertTrue("Mittente inserito erroneamente nel database", messaggioSalvato.getSender().equals(rs.getString("sender")));
		assertTrue("Destinatario inserito erroneamente nel database", messaggioSalvato.getAddressee().equals(rs.getString("addressee")));
		assertTrue("Path inserito erroneamente nel database", messaggioSalvato.getPath().equals(rs.getString("record_message")));
		assertTrue("Data creazione inserita erroneamente nel database", messaggioSalvato.getDate().equals(rs.getString("creation")));
		
		recordMessageDaoSQL.removeMessage(recordMessageDaoSQL.getMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt)));
		
		userDaoSQL.removeUser("ClockWork7");
		userDaoSQL.removeUser("ClockWork");
	}

	@Test
	public void testGetAllMessages() {
		init();
		userDaoSQL.createUser("ClockWork", "password", "Clock Work", "Team", "7");
		java.util.Date dt = new java.util.Date();
		java.text.SimpleDateFormat sdf =new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork").size()==0);
		recordMessageDaoSQL.createMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt));
		assertTrue("Messaggio inserito tra i messaggi del destinatario",recordMessageDaoSQL.getAllMessages("ClockWork").size()==1);
		recordMessageDaoSQL.removeMessage(recordMessageDaoSQL.getMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt)));
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork").size()==0);
		
		recordMessageDaoSQL.createMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt));
		recordMessageDaoSQL.createMessage("ClockWork7", "ClockWork", "ciao", sdf.format(dt));
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork").size()==2);
		recordMessageDaoSQL.removeMessage(recordMessageDaoSQL.getMessage("ClockWork7", "ClockWork", "prova", sdf.format(dt)));
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork").size()==1);
		recordMessageDaoSQL.removeMessage(recordMessageDaoSQL.getMessage("ClockWork7", "ClockWork", "ciao", sdf.format(dt)));
		assertTrue("Numero messaggi errato",recordMessageDaoSQL.getAllMessages("ClockWork").size()==0);		
		userDaoSQL.removeUser("ClockWork");
	}


}
