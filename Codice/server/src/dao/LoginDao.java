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
   * @param username Username inserito dall'utente per accedere
   * @param password Password inserita dall'utente per accedere
   * @param IP della connessione del computer dell'utente
   * @return User che rappresenta l'utente corrispondente nel DB,se la login ha avuto successo, o null se i dati sono sbagliati
   */    
  public User login(String username, String password, String IP);

 /** Metodo che effettua il logout
   * 
   * @param user Oggetto User dell'utente che vuole disconnettersi
   * @return un boolean che indica se il logout e` avvenuto con successo o no
   */    
  public boolean logout(User user);

}