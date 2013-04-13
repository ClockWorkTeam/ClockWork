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
	private UserList users;
	
	public RecordMessageDaoSQL(JavaConnectionSQLite connection, UserList users){
		this.connection=connection;
		this.users=users;
	}

 /**
   * Metodo che trova i messaggi inviati all'user 
   * @param user Oggetto User ricevente dei messagi
   * @return vettore dei messaggi inviati all'user
   */    
  public Vector<RecordMessage> getMessages(String username){
	  User user= users.getUser(username);
	  if(user==null){return null;}
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

  /** Metodo che inserisce un dato messaggio
   * @param sender
   * @param addressee
   * @param path
   * @param date
    * @return RecordMessage creato, o null se l'operazione non ha avuto buon esito
   */    
  public RecordMessage createMessage(String sender, String addressee, String path, Date date){
	  User user= users.getUser(addressee);
	  if(user==null){return null;}
	  boolean done= connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('"+sender+"','"+addressee+"','"+path+"','"+date+"');");
	  RecordMessage message=null;
		if(done){
			message = new RecordMessage(sender, addressee,path,date);
			user.setMessage(message);			
		}
		return message;
		
  }

  /** Metodo che elimina un dato messaggio
   * @param message Oggetto RecordMessage da eliminare
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */    
  public boolean removeMessage(RecordMessage message){
		boolean done = connection.executeUpdate("DELETE FROM RecordMessageDataSQL WHERE (sender='"+message.getSender()+"' AND addressee='"+message.getAddressee()+"' AND record_message = '"+message.getPath()+"' AND creation='"+message.getDate()+"');");
		if(done){
			(users.getUser(message.getAddressee())).removeMessage(message);
		}
      	return done;  	
  } 
}