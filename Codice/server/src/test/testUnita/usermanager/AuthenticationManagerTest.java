/**
* Nome: AuthenticationManagerTest
* Package: server.usermanager
* Autore: Zohouri Haghian Pardis
* Data: 2013/03/06
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-------------------------------------------+
* | Data    | Programmatore |         Modifiche       					|
* +---------+---------------+-------------------------------------------+
* |  130306 |     ZHP       | + creazione documento	   					|
* |  130713 |     VF        | + modificata inizializzazione dei test	|
* |         |               | + creato testCreateUser                   |
* |         |               | + creato testRemoveUser               	|
* |         |               | + creato testLogin  		                |
* |         |               | + creato testLogout  			          	|
* |         |               | + creato testGetAllContacts	          	|
* |         |               |                          					|
* +---------+---------------+-------------------------------------------+
*
*/ 
package test.testUnita.usermanager;

import static org.junit.Assert.*;
import org.junit.*;

public class AuthenticationManagerTest {
  private AuthenticationManager authenticationManager;
	
  @Before
  public void init() {
	authenticationManager=new AuthenticationManager();
  }

  @Test
  public void testLogin() {
	try{
	  authenticationManager.login("false", "password", "10.01.01.01");
	  assertTrue("Operazione di login errata. Utente inesistente",false);
	}catch(Exception e){
	  assertTrue("Operazione di login errata. Utente inesistente",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Username errato"));	  
	}
	try{
	  authenticationManager.login("true", "false", "10.01.01.01");
	  assertTrue("Operazione di login errata. Password errata",false);
	}catch(Exception e){
	  assertTrue("Operazione di login errata. Password errata",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Password errata"));	  
	}
	try{
	  assertTrue("Operazione di login fallita",authenticationManager.login("true", "true", "10.01.01.01")!=null);
	}catch(Exception e){
		 assertTrue("Operazione di login fallita",false);
	}
  }

  @Test
  public void testLogout() {
	assertTrue("Operazione di logout errata. utente inesistente",authenticationManager.logout("false")==null);
	assertTrue("Operazione di logout errata. utente già disconnesso",authenticationManager.logout("disconnected")!=null);
	assertTrue("Operazione di logout fallita",authenticationManager.logout("true")!=null);
  }

  @Test
  public void testCreateUser() {
	try{
	  authenticationManager.createUser("true", "password", "name","surname", "10.01.01.01");
	  assertTrue("Operazione di registrazione errata. Utente già esistente",false);
	}catch(Exception e){
	  assertTrue("Operazione di registrazione errata. Utente già esistente",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Username già presente"));	  
	}
	try{
	  authenticationManager.createUser("false", "password", "name","surname", "10.01.01.01");
	  assertTrue("Operazione di registrazione errata",false);
	}catch(Exception e){
	  assertTrue("Operazione di registrazione errata",true);
	  assertTrue("Messaggio di errore sbagliato", e.getMessage().equals("Errore nell'inserimento dell'utente nel database"));	  
	}
	try{
	  assertTrue("Operazione di registrazione errata",authenticationManager.createUser("false", "true", "name","surname", "10.01.01.01")!=null);
	}catch(Exception e){
	  assertTrue("Operazione di registrazione errata",false);
	}
  }
	
  @Test
  public void testRemoveUser() {
	assertTrue("Operazione di rimozzione utente fallita", authenticationManager.removeUser("false"));
	assertTrue("Operazione di rimozzione utente fallita", authenticationManager.removeUser("true"));
	assertFalse("Operazione di rimozzione utente fallita", authenticationManager.removeUser("error"));
  }

}
