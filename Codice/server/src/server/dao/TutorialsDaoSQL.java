package server.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import server.shared.Tutorials;

public class TutorialsDaoSQL {
	 private JavaConnectionSQLite connection;
	 private Tutorials tutorials;
	 
	 public TutorialsDaoSQL(JavaConnectionSQLite server){
		 this.connection=server;
		 ResultSet rs =connection.select("TutorialDataSQL", "count(*)", "", "");
		 try {
			this.tutorials=new Tutorials(rs.getInt("COUNT(*)"));
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
					while(rs.next()){
						url = rs.getString("url");
						title = rs.getString("title");
				        tutorials.insert(title, url);
					}
				}catch(SQLException e){}
			}  
	 }
	 public Tutorials getTutorials(){
		 return tutorials;
	 }
}
