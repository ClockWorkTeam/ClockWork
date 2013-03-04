/*
* Nome: {nome del file}
* Package: {package di appartenenza}
* Autore: {autore del file}
* Data: {data di creazione del file}
* Versione: {versione del file}
*
* Modifiche:
* +---------+---------------+------------------+
* | Data    | Programmatore | Modifiche        |
* +---------+---------------+------------------+
* |  130304 |      JG       | - [label]metodo1 |
* |         |               | - [label]metodo2 |
* |         |               | - ....           |
* +---------+---------------+------------------+
*
*/


package org.server;
import java.sql.*;


public class ConnessioneJavaSQLite {
   private Connection conn;
   private Statement connettore;

/*Costruzione connessione al database*/
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
}

/*Distruzione della classe ConnessioneJavaSQLite*/
public void finalize(){
   try {
     connettore.close();
     conn.close();
   }
   catch(SQLException e){System.out.println("Errore nella chiusura del database");}
 }  