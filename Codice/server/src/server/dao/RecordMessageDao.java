/**
* Nome: RecordMessageDao
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
import java.util.Vector;
import java.util.Date;
/**
 * Interfaccia che contiene i prototipi dei metodi per gestire i recordmessages
 * 
 */

public interface RecordMessageDao{
 /**
   * Metodo che trova i messaggi inviati all'user
   * @param username dello user ricevente dei messagi
   * @return vettore dei messaggi inviati all'user
   */    
  public Vector<RecordMessage> getMessages(String username);

  /** Metodo che inserisce un dato messaggio
   * @param sender
   * @param addressee
   * @param path
   * @param date
   * @return RecordMessage creato, o null se l'operazione non ha avuto buon esito
   */    
  public RecordMessage createMessage(String sender, String addressee, String path, Date date);

  /* Metodo che elimina un dato messaggio
   * @param message Oggetto RecordMessage da eliminare
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */    
  public boolean removeMessage(RecordMessage message);  
}