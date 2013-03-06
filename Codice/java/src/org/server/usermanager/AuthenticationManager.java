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
  
  /* Costruttore con parametri della classe AuthenticationManager
   * @param access riferimento alla classe che implementa l'interfaccia DAOLogin
   */
  public AuthenticationManager(DAOLogin access){
		this.access = access;
  }
   
  /* Metodo per il login, se effettua i login setta anche i valori del User
   * @param user oggetto contenente i dati di login inseriti dall'utente e l'IP
   * @return esito operazione di login
   */
  public boolean login(User user){
	  boolean result = access.login(login);
	  if(result){	   
	  	user.getInfo();
	  	checkMessages(user);
	  }
	  return result; 
  }
   
  /* Metodo per segnalare al sistema il logout di un dipendente
   * @param user user del dipendente che ha effettuato il logout
   */
  public void logout(User user){
		access.logout(user);
  }  
}
