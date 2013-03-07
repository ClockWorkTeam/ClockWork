/*
* Nome: AuthenticationManager
* Package: org.server.usermanager
* Autore: 
* Data: 
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package org.server.usermanager;
import org.server.dao.*;
import org.server.shared.*;

/**
 * Classe che si occupa di gestire i login nel sistema
 * 
 * @author 
 * @version 
 */

public class AuthenticationManager{
  private LoginDao access;
  private UserDataDao infoUser;
  private RecordMessageDao mexUser; 

  /* Costruttore con parametri della classe AuthenticationManager
   * @param access riferimento alla classe che implementa l'interfaccia DAOLogin
   */
  public AuthenticationManager(DAOLogin access, UserDataDao infoUser){
		this.access = access;
		this.infoUser = infoUser;
  }
   
  /* Metodo per il login, se effettua i login setta anche i valori del User
   * @param user oggetto contenente i dati di login inseriti dall'utente e l'IP
   * @return esito operazione di login
   */
  public boolean login(User user){
	  boolean result = access.login(login);
	  if(result){	   
	  	infoUser.getInfo(user);
	  	checkMessages(user);
	  }
	  return result; 
  }
   
  public void checkMessages(User user){
  	infoUser.getMessages(user, mexUser.getMessages(user));
  }
  /* Metodo per segnalare al sistema il logout di un dipendente
   * @param user user del dipendente che ha effettuato il logout
   */
  public void logout(User user){
		access.logout(user);
  }  
}
