/*
* Nome: UserTest
* Package: org.server.shared
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

package mytalk.server.shared;

import org.junit.*;
import static org.junit.Assert.*;

public class UserTest {
	User user

/*
* metodo che consente di creare on oggetto User ora con parametri
*/
 	private void initializationAllParameters(){
		String username="Test1";
		String  password="prova1";
 	    String name="Mario";
        String surname="Rossi";
	    String IP="147.162.84.235";
	    user=new User(username,password,name,surname,IP);
		}

/*
* metodo che consente di creare on oggetto User con tre parametri
*/
 	private void initializationTreeParameters(){
		String username="Test2";
		String  password="prova2";
	    String IP="147.162.84.235";
	    user=new User(username,password,IP);
		}

@Test
public void testCostructorAllParameters() {
    user.initialisationAllParameters();
    assertTrue("Lo username non è quello atteso", user.getUsername() == username);
    assertTrue("La password non è quello atteso", user.getPassword() == password);
    assertTrue("Il name non è quello atteso", user.getName() == name);
    assertTrue("Il surname non è quello atteso", user.getSurname() == surname);
    assertTrue("L'IP non è quello atteso", user.getIP() == IP);
  }

@Test
public void testCostructorTreeParameters() {
    user.initialisationTreeParameters();
    assertTrue("Lo username non è quello atteso", user.getUsername() == username);
    assertTrue("La password non è quello atteso", user.getPassword() == password);
    assertTrue("L'IP non è quello atteso", user.getIP() == IP);
  }
