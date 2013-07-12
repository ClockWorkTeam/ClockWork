/**
* Nome: RecordMessageDaoSQL
* Package: server.dao
* Autore: Gavagnin Jessica
* Data: 2013/04/03
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |   |             | + trasformata in Singleton        |
* |   |             | + tolto userList        |
* |   |             | + tolti controlli        |
* |   |             | + addMessage invece di createMessage        |
* |   |             | + cancellato getMessage         |
* +---------+---------------+--------------------------+
* |  130403 |     GJ        | + removeMessage          |
* |         |               | + getAllMessages         |
* |         |               | + getMessage             |
* |         |               | + createMessage          |
* |         |               | + RecordMessageDaoSQL    |                         |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package server.dao;
import server.shared.RecordMessage;
import java.sql.ResultSet ;
import java.sql.SQLException;
import java.util.Vector;
/**
 * Classe che definisce dei metodi per gestire i recordmessages nel DB
 */

public class RecordMessageDaoSQL implements RecordMessageDao{
  private JavaConnectionSQLite connection;
  private static RecordMessageDaoSQL recordMessageDaoSQL=null;
  
  private RecordMessageDaoSQL(){
	this.connection=JavaConnectionSQLite.getInstance();
  }

  public static RecordMessageDaoSQL getInstance(){
	if(recordMessageDaoSQL==null){
		recordMessageDaoSQL= new RecordMessageDaoSQL();
	}
	return recordMessageDaoSQL;
  }
 /**
   * Metodo che trova i messaggi inviati all'user
   * @param user Oggetto User ricevente dei messagi
   * @return vettore dei messaggi inviati all'user
   */
  public Vector<RecordMessage> getAllMessages(String username){
	Vector<RecordMessage> messages=new Vector<RecordMessage>();
	ResultSet rs = connection.select("RecordMessageDataSQL","*", "addressee='"+username+"'","");
	if(rs!=null){
	  String path, sender, addressee, date;
	  try{
		do{
	  	  sender = rs.getString("sender");
		  addressee = rs.getString("addressee");
		  path = rs.getString("record_message");
		  date = rs.getString("creation");
		  messages.add(new RecordMessage(sender, addressee, path, date));
		}while( rs.next());
	  }catch(SQLException e){return null;}
	}
	return messages;
  }

  /** Metodo che inserisce un dato messaggio
   * @param sender
   * @param addressee
   * @param path
   * @param date
   * @return RecordMessage creato, o null se l'operazione non ha avuto buon esito
   */
  public boolean addMessage(RecordMessage message){
	boolean result= connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ('"+message.getSender()+"','"+message.getAddressee()+"','"+message.getPath()+"','"+message.getDate()+"');");
	return result;
  }

  /** Metodo che elimina un dato messaggio
   * @param message Oggetto RecordMessage da eliminare
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */
  public boolean removeMessage(RecordMessage message){
	boolean result = connection.executeUpdate("DELETE FROM RecordMessageDataSQL WHERE (sender='"+message.getSender()+"' AND addressee='"+message.getAddressee()+"' AND record_message = '"+message.getPath()+"' AND creation='"+message.getDate()+"');");
   	return result;
  }
}