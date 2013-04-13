/**
* Nome: JavaConnectionSQLite
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
import java.sql.*;


public class JavaConnectionSQLite {
   private Connection connection;
   private Statement statement;

/*Costruzione connessione al database
 * @parametro database: URI del database di riferimento
 */
   public JavaConnectionSQLite(){
      try{
         final String driver="org.sqlite.JDBC";
         Class.forName(driver);
         connection= DriverManager.getConnection("jdbc:sqlite:sqlite/myTalk.sqlite");
         statement = connection.createStatement();
      }
      catch(SQLException e){System.out.println("Impossibile creare la connessione al database ");}
      catch(ClassNotFoundException e){System.out.println("Impossibile creare la connessione al database");}
   }

/*Distruzione della classe JavaConnectionSQLite
 *cerca di rilasciare la connessione al database quando l'oggetto viene distrutto,
 *nel caso non ci riuscisse, lancia un errore.
 */
public void finalize(){
   try {
     statement.close();
     connection.close();
   }
   catch(SQLException e){System.out.println("Errore nella chiusura del database");}
 }  

  /**
   * Metodo che ritorna una tupla
   * 
   * @param tabella tabella da esaminare
   * @param colonne le colonne di cui interessano i valori (indicate con col1, col2...)
   * @param controlli criteri su cui effettuare la visita
   * @param extra contiene tutte le clausole aggiuntive per una query
   * @return rs insieme delle righe ottenute dal risultato della query, null se non esistono risultati
   * 
   */  

  public ResultSet select(String table, String column, String condition, String extra){
    String where="";
    ResultSet rs=null;
    if (condition!=""){
      where=" WHERE " +condition;
    }
    try{
    	rs = statement.executeQuery("SELECT "+ column+" FROM "+ table + where +" "+ extra+";");
    	rs.next();
    }
    catch(SQLException e){return null;}    
    return rs;
  }

  /**
   * Metodo che ritorna una tupla
   * 
   * @param query Stringa da eseguire sul database
   * @return booleano che rappresenta il successo o il fallimento dell'operazione
   * 
   */  
   public boolean executeUpdate(String query){
	try{
		statement.executeUpdate(query);
	}
	catch(SQLException e){return false;}
	return true;
 }

}