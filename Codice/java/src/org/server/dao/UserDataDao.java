/*
* Nome: UserDataDao
* Package: org.server.dao
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

package org.server.dao;
import org.server.shared.*;


public interface UserDataDao{

	/*Metodo che prende le informazioni di un User dal database 
   * @param user Oggetto User usato per Login (quindi solo con i campi username e password) da cui si prendono le informazioni
   * @return l'oggetto User istanziato se presente nel db, altrimenti null
   */     
	public User getInfo(User user);

	/*Metodo che prende i messaggi di un User dal database 
   * @param user Oggetto User usato per Login (quindi solo con i campi username e password) da cui si prendono le informazioni
   * @return l'oggetto User istanziato se presente nel db, altrimenti null
   */     
	public boolean getMessages(User user);

  /*Metodo che setta i campi di un User nel DB
   * @param user Oggetto User da cui si prendono le informazioni
   * @param password la stringa della nuova password del User
   * @param name la stringa del nuovo name del User
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setInfo(User user, String password, String name, String surname);
	
  /*Metodo che setta il campo password di un User nel DB
   * @param user Oggetto User da cui si prendono le informazioni
   * @param password la stringa della nuova password del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setPassword(User user, String password);

  /*Metodo che setta il campo name di un User
   * @param user Oggetto User da cui si prendono le informazioni
   * @param name la stringa del nuovo name del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setName(User user, String name);

  /*Metodo che setta il campo surname di un User
   * @param user Oggetto User da cui si prendono le informazioni
   * @param surname la stringa del nuovo surname del User
   * @return boolean che indica se l'operazione e' andata o meno a buon fine
   */   
	public boolean setSurname(User user, String surname);


}
