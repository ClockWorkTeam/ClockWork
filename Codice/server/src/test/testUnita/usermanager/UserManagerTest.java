/**
* Nome: UserManagerTest
* Package: server.usermanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-------------------------------------------+
* | Data    | Programmatore |         Modifiche       					|
* +---------+---------------+-------------------------------------------+
* |  130306 |     ZHP       | + creazione documento	  					|
* |  130712 |     VF        | + modificata inizializzazione dei test	|
* |         |               | + creato testSetPassword                  |
* |         |               | + creato testRemoveMessage               	|
* |         |               | + creato testGetMessage                   |
* |         |               | + creato testCreateMessage            	|
* |         |               | + creato testSetUserData              	|
* |         |               | + creato testGetUserData                  |
* |         |               | + creato testCheckPassword           		|
* +---------+---------------+-------------------------------------------+
*
*/ 
package test.testUnita.usermanager;

import static org.junit.Assert.*;
import org.junit.*;

public class UserManagerTest {
	
  UserManager userManager;
	
  @Before
  public void init() {
	userManager=new UserManager();
  }
	
  @Test
  public void testCheckPassword() {
	assertTrue("Operazione di controllo password fallita",userManager.checkPassword("true", "true"));
	assertFalse("Operazione di controllo password errata",userManager.checkPassword("false", "true"));
	assertFalse("Operazione di controllo password errata",userManager.checkPassword("true", "false"));
	assertFalse("Operazione di controllo password errata",userManager.checkPassword("false", "false"));
  }

  @Test
  public void testSetPassword() {
	try {
	  userManager.setPassword("false", "true");
	  assertTrue("Operazione di cambio password errata. Username errato",false);
	} catch (Exception e) {
	  assertTrue("Operazione di cambio password errata. Username errato",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Username errato"));
	}
	try {
	  assertFalse("Operazione di cambio password errata. Password errata", userManager.setPassword("true", "false"));
	} catch (Exception e) {
	  assertTrue("Operazione di cambio password errata. Password errata",false);
	}
	try {
	  assertTrue("Operazione di cambio password fallita", userManager.setPassword("true", "true"));
	} catch (Exception e) {
	  assertTrue("Operazione di cambio password fallita",false);
	}
  }

  @Test
  public void testSetUserData() {
	try {
	  userManager.setUserData("false", "newName","newSurname");
	  assertTrue("Operazione di cambio dati errata. Username errato",false);
	} catch (Exception e) {
	  assertTrue("Operazione di cambio dati errata. Username errato",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Username errato"));
	}
	try {		  
	  assertFalse("Operazione di cambio dati errata. Nome e cognome errati",userManager.setUserData("true", "false","false"));
	} catch (Exception e) {
	  assertTrue("Operazione di cambio dati errata.  Nome e cognome errati",false);
	}
	try {		  
	  assertFalse("Operazione di cambio dati errata. Nome errato",userManager.setUserData("true", "false","true"));
	} catch (Exception e) {
	  assertTrue("Operazione di cambio dati errata.  Nome errato",false);
	}
	try {		  
	  assertFalse("Operazione di cambio dati errata. cognome errato",userManager.setUserData("true", "true","false"));
	} catch (Exception e) {
	  assertTrue("Operazione di cambio dati errata.  cognome errato",false);
	}
	try {		  
	  assertTrue("Operazione di cambio dati fallita",userManager.setUserData("true", "true","true"));
	} catch (Exception e) {
	  assertTrue("Operazione di cambio dati fallita",false);
	}
  }
	
  @Test
  public void testGetUserData() {
    assertTrue("Operazione errata. Non dovrebbe esistere l'utente", userManager.getUserData("false")==null);
    assertTrue("Operazione fallita", userManager.getUserData("true")!=null);
    assertTrue("Operazione errata. Username non corrispondente", userManager.getUserData("true").getUsername().equals("true"));
  }
	
  @Test
  public void testCreateMessage() {
	try {
	  userManager.createMessage("false", "addressee", "path", "date");
	  assertTrue("Operazione di aggiunta messaggio errata",false);
	} catch (Exception e) {
	  assertTrue("Operazione di aggiunta messaggio errata",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Errore nella registrazione del messaggio"));
	}
	
	try {
	  assertTrue("Operazione di aggiunta messaggio errata. Destinatario non in linea",userManager.createMessage("true", "disconnected", "path", "date")==null);
	} catch (Exception e) {
	  assertTrue("Operazione di aggiunta messaggio errata",false);
	}
	try {
	  assertTrue("Operazione di aggiunta messaggio errata. Destinatario in linea",userManager.createMessage("true", "true", "path", "date")!=null);
	} catch (Exception e) {
	  assertTrue("Operazione di aggiunta messaggio errata",false);
	}	
  }
	
  @Test
  public void testGetMessages() {
	assertTrue("Operazione di reperimento messaggi errata",userManager.getMessages("vuoto").size()==0);
    assertTrue("Operazione di reperimento messaggi errata",userManager.getMessages("uno").size()==1);
    assertTrue("Operazione di reperimento messaggi errata",userManager.getMessages("username").size()==2);
  }
	
  @Test
  public void testRemoveMessage(){
	assertTrue("Operazione di rimozione messaggio errata.",userManager.removeMessage("true", "addressee", "path", "date"));
	assertFalse("Operazione di rimozione messaggio errata.",userManager.removeMessage("false", "addressee", "path", "date"));
  }

}
