/**
* Nome: Launcher
* Package: server
* Autore: Zohouri Haghian Pardis
* Data: 2013/04/20
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |  130420 |     ZHP       | + getServer              |
* |         |               | + getTutorials           |
* |         |               | + getUserManager         |
* |         |               | + Launcher               |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package server;

import server.dao.*;
import server.shared.*;
import server.usermanager.*;

public class Launcher {
  private TutorialsDaoSQL tutorialsDao;
  private static AuthenticationManager authenticationManager=new AuthenticationManager();
  private static UserManager userManager= new UserManager();
  private static Launcher launcher=null;

  /**costruttore della classe
   * inizializza i riferimenti alle classi uniche del server
   */
  private Launcher(){
	tutorialsDao= TutorialsDaoSQL.getInstance();
	authenticationManager= new AuthenticationManager();
	userManager= new UserManager();
  }

  /**Metodo che resituisce il riferimento alla classe server.usermanager.UserManager
   * @return riferimento alla classe UserManager
   */
  public UserManager getUserManager(){
	return userManager;
  }

  /**Metodo che resituisce il riferimento alla classe server.usermanager.AutheticationManager
   * @return riferimento alla classe AutheticationManager
   */
  public AuthenticationManager getAuthenticationManager(){
	return authenticationManager;
  }

  /**Metodo che resituisce il riferimento alla classe server.shared.Tutorials
   * @return lista tutorials presenti nel server
   */
  public Tutorials getTutorials(){
	return tutorialsDao.getTutorials();
  }

  /**Metodo per inizializzare la classe stessa un'unica volta
   */
  public static Launcher getInstance(){
	if(launcher==null){
		launcher=new Launcher();
	}
	return launcher;
  }

}