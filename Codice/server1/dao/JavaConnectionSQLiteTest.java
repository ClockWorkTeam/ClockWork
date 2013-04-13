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

public class JavaConnectionSQLiteTest {
	JavaConnectionSQLite connection;
	
	private void init(){
		connection= new JavaConnectionSQLite();
	}
	
	@Test
	public void testDBUser() {
		init();
	    ResultSet rs = connection.select("UserDataSQL","*","","");
	    try{
	    	System.out.println(rs.getString("username"));
	    }catch(SQLException e){System.out.println("empty");};

	    connection.executeUpdate("INSERT INTO UserDataSQL VALUES ('Leo','par1368','','','000');");
	    rs = connection.select("UserDataSQL","*","","");
	    try{
	    	System.out.println(rs.getString("username"));
	    }catch(SQLException e){System.out.print("empty");};
	    
	    connection.executeUpdate("DELETE FROM UserDataSQL WHERE username='Leo';");
	}
	
	@Test
	public void testDBRecordMessage() {
		init();
	    ResultSet rs = connection.select("RecordMessageDataSQL","*","","");
	    try{
	    	System.out.println(rs.getString("record_message"));
	    }catch(SQLException e){System.out.println("empty");};

	    connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('Liquid90','Leo','ciao','2013-03-10');");
	    rs = connection.select("RecordMessageDataSQL","*","","");
	    try{
	    	System.out.println(rs.getString("record_message"));
	    }catch(SQLException e){System.out.print("empty");};
	    
	    connection.executeUpdate("DELETE FROM RecordMessageDataSQL WHERE record_message='ciao';");
	    
	}
}