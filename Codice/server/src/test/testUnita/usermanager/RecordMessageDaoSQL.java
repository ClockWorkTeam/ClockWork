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

package test.testUnita.usermanager;
import server.dao.RecordMessageDao;
import server.shared.RecordMessage;

import java.util.Vector;
/**
 * Classe STUB
 */

public class RecordMessageDaoSQL implements RecordMessageDao{
  private static RecordMessageDaoSQL recordMessageDaoSQL=null;
  
  private RecordMessageDaoSQL(){}

  public static RecordMessageDaoSQL getInstance(){
	if(recordMessageDaoSQL==null){
	  recordMessageDaoSQL= new RecordMessageDaoSQL();
	}
	return recordMessageDaoSQL;
  }

  public Vector<RecordMessage> getAllMessages(String username){
	Vector<RecordMessage> messages= new Vector<RecordMessage>();
	if(username.equals("vuoto")){
	  return messages;
	}else{
	  messages.add(new RecordMessage("sender", "addressee", "path", "dateCreation"));
	  if(username.equals("uno")){
	    return messages;
	  }else{
		messages.add(new RecordMessage("sender2", "addressee", "path2", "dateCreation2"));
		return messages;
	  }
	}
  }

  public boolean addMessage(RecordMessage message){
	if(message.getSender().equals("true")){
	  return true;
	}
	return false;
  }

  public boolean removeMessage(RecordMessage message){
	if(message.getSender().equals("true")){
	  return true;
	}
	return false;
  }
}