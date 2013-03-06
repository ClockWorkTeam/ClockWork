/*
* Nome: RecordMessageDao
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
 * Interfaccia che contiene i prototipi dei metodi per gestire i recordmessages
 * 
 */

public interface RecordMessageDao{
 /**
   * Metodo che trova i messaggi inviati all'user
   * @param user Oggetto User ricevente dei messagi
   * @return vettore dei messaggi inviati all'user
   */    
  public vector<RecordMessage> getMessages(User user);

  /* Metodo che inserisce un dato messaggio
   * @param message Oggetto RecordMessage da inserire
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */    
  public boolean createMessage(RecordMessage message);

  /* Metodo che elimina un dato messaggio
   * @param message Oggetto RecordMessage da eliminare
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */    
  public boolean removeMessage(RecordMessage message);  
}
