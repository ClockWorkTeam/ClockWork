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
import java.util.Date;

public class RecordMessage{
	private String sender;
	private String addressee;
	private String path;
	private Date dateCreation;
	
	public RecordMessage(String sender, String addressee, String path, Date dateCreation){
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

	public Date getDate(){
		return dateCreation;
	}
}