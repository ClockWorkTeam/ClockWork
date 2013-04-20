/**
* Nome: Tutorials
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

import java.util.HashMap;
import java.util.Map;

public class Tutorials {
	private Map<String, String> tutorials;

	public Tutorials(int num){
		tutorials=new HashMap<String,String>(num);
	}
	
	public void insert(String title, String url){
		tutorials.put(title, url);
	}
	
	public Map<String,String> getTutorials(){
		return tutorials;
	}
	
}
