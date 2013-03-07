/*
* Nome: RecordMessage
* Package: org.server.shared
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


package mytalk.server.shared;
import java.util.Date;

public class RecordMessage{
	private User sender;
	private User addressee;
	private String path;
	private Date dateCreation;
	
	public RecordMessage(User sender, User addressee, String path, Date dateCreation){
		this.sender=sender;
		this.addressee= addressee;
		this.path=path;
		this.dateCreation=dateCreation;
	}
	
	public User getSender()const{
		return sender;
	}

	public User getAddressee()const{
		return addressee;
	}
	
	public String getPath()const{
		return path;
	}

	public String getCreationDate() const{
		return dateCreation;
	}
}
