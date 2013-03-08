/**
* Nome: LoginDao
* Package: server.dao
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

package server.dao;
import server.shared.*;
/**
 * Interfaccia che contiene i prototipi dei metodi per gestire il login
 * 
 */

public interface LoginDao{
 /**
   * Metodo che prova il login
   * @param l Oggetto Login da cui si prendono le informazioni
   * @return un boolean che indica se il login e` avvenuto con successo o no
   */    
  public boolean login(User user);

 /** Metodo che effettua il logout
   * 
   * @param l Oggetto Login da cui si prendono le informazioni
   * @return un boolean che indica se il logout e` avvenuto con successo o no
   */    
  public boolean logout(User user);

}