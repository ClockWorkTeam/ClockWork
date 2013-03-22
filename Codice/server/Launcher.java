/**
* Nome: Launcher
* Package: server
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

package server;

public class Launcher {
	
	private static Launcher launcher=null;
	
	public static void getServer(){
		if(launcher==null)
			crea();
	}	
}
