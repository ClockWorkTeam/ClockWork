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
import server.shared.RecordMessage;
import java.sql.ResultSet ;
import java.sql.SQLException;
import java.util.Vector;
/**
 * Classe che definisce dei metodi per gestire i recordmessages nel DB
 */

public class RecordMessageDaoSQL{
  private static RecordMessageDaoSQL recordMessageDaoSQL=null;
  
  private RecordMessageDaoSQL(){
System.out.println("provaMex");
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
 /* public Vector<RecordMessage> getAllMessages(String username){

  }


  public boolean addMessage(RecordMessage message){

  }


  public boolean removeMessage(RecordMessage message){
	
  }*/
}