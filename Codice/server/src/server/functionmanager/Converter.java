/**
* Nome: Converter
* Package: server.functionmanager
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
package server.functionmanager;

import java.util.Map;
import java.util.Set;
import java.util.Vector;

import server.shared.RecordMessage;
import server.shared.User;

public class Converter{
	/**genera la stringa dei contatti seguendo questo schema:
	*  { size: N,
	*    username1: x, name1: y, surname1: w, IP1: N.N.N.N,
	*    username2: x, name2: y, surname2: w, IP2: N.N.N.N,
	*   ........
	*  } 
	*/
	public String getAllContacts(Vector<User> users){
		String contacts="{\"size\": \""+users.size()+"\"";
		for(int i=0; i<users.size(); i++){
			contacts+=", \"username"+i+"\": \""+users.get(i).getUsername()+
				"\", \"name"+i+"\": \""+users.get(i).getName()+
				"\", \"surname"+i+"\": \""+users.get(i).getSurname()+
				"\", \"IP"+i+"\": \""+users.get(i).getIP()+"\"";
		}
		contacts+="}";
		return contacts;
	}
	
	public String getMessages(Vector<RecordMessage> mex){
		String messages="{\"size\": \""+mex.size()+"\"";
		for(int i=0; i<mex.size(); i++){
			messages+=", \"sender"+i+"\": \""+mex.get(i).getSender() +
				"\", \"path"+i+"\": \""+mex.get(i).getPath()+
				"\", \"date"+i+"\": \""+mex.get(i).getDate()+"\"";
		}
		messages+="}";
		return messages;	
	}
	public String getTutorials(Map<String, String> tutorials){
		String risp="{\"size\": \""+tutorials.size()+"\"";
		Set<String> keySet = tutorials.keySet();
		int i=0;
		for(String key:keySet){
			risp+=", \"title"+i+"\": \""+key+"\", \"path"+i+"\": \""+tutorials.get(key)+"\"";
		}
		risp+="}";
		return risp;
	}
}
