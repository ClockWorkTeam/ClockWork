package server.functionmanager;

import java.util.Vector;

import server.shared.User;

public class ContactsManager {
	/**genera la stringa dei contatti seguendo questo schema:
	*  { size: N,
	*    contact1: { username: x, name: y, surname: w, IP: N.N.N.N },
	*    contact2: { ... },
	*    contact3: { ... }
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
	// \"contact"+i+"\": \"{
}
