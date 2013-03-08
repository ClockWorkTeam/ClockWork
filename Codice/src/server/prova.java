package server;
import java.sql.*;
import server.dao.*;
import server.shared.*;

public class prova {
	private Connection connection;
	private Statement statement;
	private UserDataDaoSQL user;
   public prova(){
	      try{
	         final String driver="org.sqlite.JDBC";
	         Class.forName(driver);
	         connection= DriverManager.getConnection("jdbc:sqlite:sqlite/myTalk.sqlite");
	         statement = connection.createStatement();
	      }
	      catch(SQLException e){System.out.println("Impossibile creare la connessione al database ");}
	      catch(ClassNotFoundException e){System.out.println("Impossibile creare la connessione al database");}
//	      user= new UserDataDaoSQL(connection);
	   }

   public boolean registra(){
	   boolean ris = user.setUser(new User("Leo","par2409","Pardis","Zohouri","0.02.02.01"));
	   return ris;
   }

  public static void main(String[]arg){
		prova tmp= new prova();
		System.out.println(tmp.registra());
  }
}
