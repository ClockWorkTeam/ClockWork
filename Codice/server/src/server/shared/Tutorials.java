/**
* Nome: Tutorials
* Package: server.shared
* Autore: Gavagnin Jessica
* Data: 2013/04/10
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* | 1300410 |     GJ        | + getTutorials           |
* |         |               | + insert                 |
* |         |               | + Tutorial               |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/
package server.shared;

import java.util.HashMap;
import java.util.Map;

public class Tutorials {
  private Map<String, String> tutorials;

  /**Costruttore classe tutorials
   *
   * @param numero di tutorials
   */
  public Tutorials(int num){
	tutorials=new HashMap<String,String>(num);
  }

  /**Metodo che inserisce un tutorials nella mappa di tutorials
   *
   * @param title del video
   * @param indirizzo in cui si trova il video
   */
  public void insert(String title, String url){
	tutorials.put(title, url);
  }

  /**Metodo che restituisce i tutorial presenti nel server
   *
   * @return lista dei tutorial
   */
  public Map<String,String> getTutorials(){
	return tutorials;
  }

}
