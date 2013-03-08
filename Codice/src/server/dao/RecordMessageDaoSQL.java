/**
* Nome: RecordMessageDaoSQL
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
import server.shared.*;
import java.sql.ResultSet ;
import java.sql.SQLException;
import java.util.Date;
import java.util.Vector;
/**
 * Classe che definisce dei metodi per gestire i recordmessages nel DB
 */

public class RecordMessageDaoSQL implements RecordMessageDao{
	private JavaConnectionSQLite connection;
	private UserDataDao userData;
	
	public RecordMessageDaoSQL(JavaConnectionSQLite connection){
		this.connection=connection;
	}

 /**
   * Metodo che trova i messaggi inviati all'user 
   * @param user Oggetto User ricevente dei messagi
   * @return vettore dei messaggi inviati all'user
   */    
  public Vector<RecordMessage> getMessages(User user){
  	String username = user.getUsername();
  	ResultSet rs = connection.select("RecordMessageDataSQL","*", "adressee='"+username+"')","");
	if(rs!=null){
		String path, sender, addressee;
		Date date;
		boolean trovato = false;
		try{
			while(!trovato){
				sender = rs.getString("sender");
				addressee = rs.getString("addressee");
				path = rs.getString("record_message");
		        date = rs.getDate("creation");
		        user.setMessage(new RecordMessage(sender, addressee, path, date));
		        rs.next();
			}
		}catch(SQLException e){return null;}
	}
	return user.getMessages();  
  }

  /* Metodo che inserisce un dato messaggio dal DB
   * @param message Oggetto RecordMessage da inserire
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */    
  public boolean createMessage(RecordMessage message, User addressee){
		String sender = message.getSender();
		String path = message.getPath();
		Date date = message.getDate();
		boolean done= connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ("+sender+","+addressee.getUsername()+","+path+","+date+");");
		if(done){
			addressee.setMessage(message);			
		}
      	return done;
  }

  /* Metodo che elimina un dato messaggio
   * @param message Oggetto RecordMessage da eliminare
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */    
  public boolean removeMessage(RecordMessage message, User addressee){
		String path = message.getPath();
		boolean done = connection.executeUpdate("DELETE FROM RecordMessageDataSQL WHERE record_message = "+path+");");
		if(done){
			addressee.removeMessage(message);
		}
      	return done;  	
  } 
}