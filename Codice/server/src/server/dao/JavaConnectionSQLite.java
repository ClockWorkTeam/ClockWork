/**
* Nome: JavaConnectionSQLite
* Package: server.dao
* Autore: Gavagnin Jessica
* Data: 2013/04/16
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+--------------------------+
* | Data    | Programmatore |         Modifiche        |
* +---------+---------------+--------------------------+
* |     |            | + trasformata in Singleton   |
* +---------+---------------+--------------------------+
* | 130416  |     GJ        | + finalize               |
* |         |               | + executeUpdate          |
* |         |               | + select                 |
* |         |               | + JavaConnectionSQLite   |
* |         |               | + creazione documento	   |
* |         |               |                          |
* +---------+---------------+--------------------------+
*
*/

package server.dao;
import java.sql.*;


public class JavaConnectionSQLite {
  private Connection connection;
  private Statement statement;
  private static JavaConnectionSQLite javaConnectionSQLite=null;

  /**Costruzione connessione al database
   * @parametro database: URI del database di riferimento
   */
  private JavaConnectionSQLite(){
    try{
      final String driver="org.sqlite.JDBC";
      Class.forName(driver);
      connection= DriverManager.getConnection("jdbc:sqlite:sqlite/myTalk.sqlite");
      statement = connection.createStatement();
    }
    catch(Exception e){System.out.println("Impossibile creare la connessione al database ");}
  }
  
  public static JavaConnectionSQLite getInstance(){
	  if(javaConnectionSQLite==null){
		  javaConnectionSQLite= new JavaConnectionSQLite();
	  }
	  return javaConnectionSQLite;
  }

  /**Distruzione della classe JavaConnectionSQLite
   * cerca di rilasciare la connessione al database quando l'oggetto viene distrutto,
   * nel caso non ci riuscisse, lancia un errore.
   */
  public void finalize(){
  	try {
  	  statement.close();
      connection.close();
      javaConnectionSQLite=null;
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