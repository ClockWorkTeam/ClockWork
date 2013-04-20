/**
* Nome: RecordMessage
* Package: server.shared
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/05
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130305 |     ZHP       | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/ 

package server.shared;
/**
 * classe che rappresenta la struttura dati RecordMessage del server
 *
 */
public class RecordMessage{
	private String sender;
	private String addressee;
	private String path;
	private String dateCreation;
	
	/**
	 * Costruttore dell'oggetto RecordMessage
	 * @param sender, persona che ha inviato il messaggio
	 * @param addressee, persona che riceve il messaggio
	 * @param path, indirizzo in cui è salvato il messaggio
	 * @param dateCreation, data di creazione del messaggio
	 */
	public RecordMessage(String sender, String addressee, String path, String dateCreation){
		this.sender=sender;
		this.addressee=addressee;
		this.path=path;
		this.dateCreation=dateCreation;
	}
	
	public String getSender(){
		return sender;
	}
	
	public String getAddressee(){
		return addressee;
	}

	public String getPath(){
		return path;
	}

	public String getDate(){
		return dateCreation;
	}
}