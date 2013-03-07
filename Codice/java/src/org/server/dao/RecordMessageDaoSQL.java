/*
* Nome: RecordMessageDaoSQL
* Package: org.server.dao
* Autore: Gavagnin Jessica
* Data: 2013/03/04
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130304 |      JG       | + ConnsessioneJavaSQLite |
* |         |               | + finalize               |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package org.server.dao;
import org.server.shared.*;
/**
 * Classe che definisce dei metodi per gestire i recordmessages nel DB
 */

public RecordMessageDaoSQL implements RecordMessageDao{
	private JavaConnectionSQLite connection;
	
	public RecordMessageDaoSQL(JavaConnectionSQLite connection){
		this.connection=connection;
	}


 /**
   * Metodo che trova i messaggi inviati all'user
   * @param user Oggetto User ricevente dei messagi
   * @return vettore dei messaggi inviati all'user
   */    
  public vector<RecordMessage> getMessages(User user){
  	String username = user.getUsername();
		ResultSet rs = connection.select("RecordMessageDataSQL","*", "adressee='"+username+"')","");
		String sender, addressee, path, date;
		vector<RecordMessage> messages = new vector<RecordMessage>();
		boolean trovato = false;
	  while(!trovato){
      try{
        sender = rs.getString("sender");
        addressee= rs.getString("addressee");
        path = rs.getString("record_message");
        date = rs.getDate("creation");
        RecordMessage message=new RecordMessage(sender, addressee, path, date);
        messages.add(message);
        rs.next();
      }
      catch(SQLException e){trovato=true;}  
    }
		return messages;  
  }

  /* Metodo che inserisce un dato messaggio dal DB
   * @param message Oggetto RecordMessage da inserire
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */    
  public boolean createMessage(RecordMessage message){
		String sender = message.getSender();
		String addressee = message.getAddressee();
		String path = message.getPath();
		Date date = message.getDate();
    try{
    	connection.executeUpdate("INSERT INTO RecordMessageDataSQL VALUES ("+sender+","+addressee+","+path+","+date+");");
    }catch(SQLException e){return false;}
  	return true;
  }

  /* Metodo che elimina un dato messaggio
   * @param message Oggetto RecordMessage da eliminare
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */    
  public boolean removeMessage(RecordMessage message){
		String path = message.getPath();
    try{
    	connection.executeUpdate("DELETE FROM RecordMessageDataSQL WHERE record_message = "+path+");");
    }catch(SQLException e){return false;}
  	return true;  	
  } 
}
