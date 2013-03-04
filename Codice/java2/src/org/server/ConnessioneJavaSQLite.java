/*
* Nome: ConnessioneJavaSQLite
* Package: org.server
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


package org.server;
import java.sql.*;


public class ConnessioneJavaSQLite {
   private Connection conn;
   private Statement connettore;

/*Costruzione connessione al database
 * @parametro database: URI del database di riferimento
 */
   public ConnessioneJavaSQLite (String database){
      try{
         final String driver="org.sqlite.JDBC";
         Class.forName(driver);
         conn= DriverManager.getConnection("jdbc:sqlite:mytalk.sqlite");
         connettore = conn.createStatement();
      }
      catch(SQLException e){System.out.println("Impossibile creare la connessione al database: "+database);}
      catch(ClassNotFoundException e){System.out.println("Impossibile creare la connessione al database: "+database);}
   }

/*Distruzione della classe ConnessioneJavaSQLite
 *cerca di rilasciare la connessione al database quando l'oggetto viene distrutto,
 *nel caso non ci riuscisse, lancia un errore.
 */
public void finalize(){
   try {
     connettore.close();
     conn.close();
   }
   catch(SQLException e){System.out.println("Errore nella chiusura del database");}
 }  

}