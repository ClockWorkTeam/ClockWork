/**
* Nome: TutorialsDaoSQL
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

import java.sql.ResultSet;
import java.sql.SQLException;
import server.shared.Tutorials;

public class TutorialsDaoSQL {
	 private JavaConnectionSQLite connection;
	 private Tutorials tutorials;
	 
	 public TutorialsDaoSQL(JavaConnectionSQLite server){
		 this.connection=server;
		 ResultSet rs =connection.select("TutorialDataSQL", "count(*) as total", "", "");
		 try {
			this.tutorials=new Tutorials(rs.getInt("total"));
		} catch (SQLException e) {
			this.tutorials=new Tutorials(10);
		}
		 getTutorialsFromDB();
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
