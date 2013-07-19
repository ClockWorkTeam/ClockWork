/**
* Nome: Converter
* Package: server.functionmanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/04/15
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130415 |     ZHP       | + ConvetTutorials        |
* |         |               | + ConvertMessages        |
* |         |               | + ConvertUsers           |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/
package server.functionmanager;

import java.util.Map;
import java.util.Set;
import java.util.Vector;

import server.shared.RecordMessage;
import server.shared.User;

public class Converter{
	/**metodo che genera la stringa dei contatti seguendo questo schema:
	*  { size: N,
	*    username1: x, name1: y, surname1: w, IP1: N.N.N.N,
	*    username2: x, name2: y, surname2: w, IP2: N.N.N.N,
	*   ........
	*  }
	*/

	public String convertUsers(Vector<User> users, String type){
		String contacts="{"+type+" \"size\": \""+users.size()+"\"";
		for(int i=0; i<users.size(); i++){
			contacts+=", \"username"+i+"\": \""+users.get(i).getUsername()+
				"\", \"name"+i+"\": \""+users.get(i).getName()+
				"\", \"surname"+i+"\": \""+users.get(i).getSurname()+
				"\", \"IP"+i+"\": \""+users.get(i).getIP()+"\"";
		}
		contacts+="}";
		return contacts;
	}
/**metodo che genera la stringa dei messaggi seguendo questo schema:
	*  { size: N,
	*    sender1: x, path1: y, date1: w,
	*    sender2: x, path2: y, date2: w,
	*   ........
	*  }
	*/
	public String convertMessages(Vector<RecordMessage> messages, String type){
		String result="{"+type+" \"size\": \""+messages.size()+"\"";
		for(int i=0; i<messages.size(); i++){
			result+=", \"sender"+i+"\": \""+messages.get(i).getSender() +
				"\", \"path"+i+"\": \""+messages.get(i).getPath()+
				"\", \"date"+i+"\": \""+messages.get(i).getDate()+"\"";
		}
		result+="}";
		return result;
	}
/**metodo che genera la stringa dei tutorial seguendo questo schema:
	*  { size: N,
	*    title1: x, key1: k, path1: w,
	*    title2: x, key2: k, path2: w,
	*   ........
	*  }
	*/
	public String convertTutorials(Map<String, String> tutorials, String type){
		String risp="{"+type+" \"size\": \""+tutorials.size()+"\"";
		Set<String> keySet = tutorials.keySet();
		int i=0;
		for(String key:keySet){
			risp+=", \"title"+i+"\": \""+key+"\", \"path"+i+"\": \""+tutorials.get(key)+"\"";
			i++;
		}
		risp+="}";
		return risp;
	}
}
