/**
* Nome: RecordMessageDao
* Package: server.dao
* Autore: Gavagnin Jessica
* Data: 2013/04/03
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |   |             | + addMessage invece di createMessage        |
* |   |             | + cancellato getMessage         |
* +---------+---------------+--------------------------+
* |  130403 |     JG        | + getAllMessages         |
* |         |               | + getMessage             |
* |         |               | + removeMessage          |
* |         |               | + createMessage          |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package server.dao;
import server.shared.RecordMessage;
import java.util.Vector;
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
  public Vector<RecordMessage> getAllMessages(String username);

  /** Metodo che inserisce un dato messaggio
   * @param sender
   * @param addressee
   * @param path
   * @param date
   * @return RecordMessage creato, o null se l'operazione non ha avuto buon esito
   */
  public boolean addMessage(RecordMessage message);

  /** Metodo che elimina un dato messaggio
   * @param message Oggetto RecordMessage da eliminare
   * @return un boolean che indica se l'operazione ha avuto successo o no
   */
  public boolean removeMessage(RecordMessage message);
}