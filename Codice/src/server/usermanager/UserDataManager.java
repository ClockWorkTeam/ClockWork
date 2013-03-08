/**
* Nome: UserDataManager
* Package: server.usermanager
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

package server.usermanager;
import server.dao.*;
import server.shared.*;

/**
 * Classe che si occupa di gestire i login nel sistema
 * 
 * @author 
 * @version 
 */

public class UserDataManager{

  private UserDataDao infoUser; 

  /* Costruttore con parametri della classe AuthenticationManager
   * @param access riferimento alla classe che implementa l'interfaccia DAOLogin
   */
  public UserDataManager(UserDataDao infoUser){
		this.infoUser = infoUser;
  }
   
  /* Metodo per il login, se effettua i login setta anche i valori del User
   * @param user oggetto contenente i dati di login inseriti dall'utente e l'IP
   * @return esito operazione di login
   */
  public boolean register(User user){
	  boolean ris=true;
	  if(infoUser.getInfo(user)==null){	   
	  	ris=infoUser.setUser(user);
	  }
	  return ris; 
  }

}