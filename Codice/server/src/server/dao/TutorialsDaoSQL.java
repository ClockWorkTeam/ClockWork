/**
* Nome: TutorialsDaoSQL
* Package: server.dao
* Autore: Gavagnin Jessica
* Data: 2013/04/03
* Versione: 1.0
*
* Modifiche:
* +---------+---------------+-----------------------+
* | Data    | Programmatore |         Modifiche     |
* +---------+---------------+-----------------------+
* |   |             | + trasformata classe in Singleton         |
* +---------+---------------+-----------------------+
* |  130403 |      JG       | + getTutorial         |
* |         |               | + getTutorialFromDB   |
* |         |               | + TutorialDaoSQL      |
* |         |               | + creazione documento |
* +---------+---------------+-----------------------+
*
*/

package server.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import server.shared.Tutorials;

public class TutorialsDaoSQL {
  private JavaConnectionSQLite connection;
  private Tutorials tutorials;
  private static TutorialsDaoSQL tutorialsDaoSQL=null;
  
  private TutorialsDaoSQL(){
	this.connection=JavaConnectionSQLite.getInstance();
	ResultSet rs =connection.select("TutorialDataSQL", "count(*) as total", "", "");
	try {
	  this.tutorials=new Tutorials(rs.getInt("total"));
	} catch (SQLException e) {
	  this.tutorials=new Tutorials(10);
	}
	getTutorialsFromDB();
  }
  public static TutorialsDaoSQL getInstance(){
	if(tutorialsDaoSQL==null){
	  tutorialsDaoSQL= new TutorialsDaoSQL();
	}
	return tutorialsDaoSQL;
  }

  private void getTutorialsFromDB(){
	ResultSet rs =connection.select("TutorialDataSQL", "*", "", "");
	if(rs!=null){
	  String url, title;
	  try{
		do{
		  url = rs.getString("url");
		  title = rs.getString("title");
		  tutorials.insert(title, url);
		}while(rs.next());
	  }catch(SQLException e){}
	}
  }

  public Tutorials getTutorials(){
	return tutorials;
  }
}
