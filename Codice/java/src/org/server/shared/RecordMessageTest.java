/*
* Nome: RecordMessageTest
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
import java.until.Date;

import org.junit.*;
import static org.junit.Assert.*;

public class RecordMessageTest{
	RecordMessage record_message;

	private void  initializationAllParameters(){
		User sender=sender;
		User addressee= addressee;
		String path=path;
		Date dateCreation=dateCreation;
		record_message=new RecordMessage(sender,addressee,path,dateCreation);
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
