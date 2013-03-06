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

public class RecordMessage{
	private User sender;
	private String path;
	private String dateCreation;
	
	public RecordMessage(User sender, String path, String dateCreation){
		this.sender=sender;
		this.path=path;
		this.dateCreation=dateCreation;
	}
	
	public User getSender()const{
		return sender;
	}
	
	public String getPath()const{
		return path;
	}

	public String getCreationDate() const{
		return dateCreation;
	}
}
