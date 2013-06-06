/**
 * Nome:AuthenticationCommunication.js
 * Package: Communication
 * Autore: Ceseracciu Marco
 * Data: 2013/04/05
 * Versione: 1.0
 * 
 * Modifiche:
 * +---------+---------------+---------------------------+
 * | Data    | Programmatore | Modifiche                 | 
 * +---------+---------------+---------------------------+
 * |13/04/06 |    ZHP        | + Modifiche metodo logout | 
 * +---------+---------------+---------------------------+
 * |13/04/05 |    PMA        | + Metodo  signup          |                                 | 
 * +---------+---------------+---------------------------+
 * |13/04/05 |    CM         | + Creazione documento     | 
 * |         |               | + Metodo checkCredentials | 
 * |         |               | + Metodo logout           | 
 * |_________|_______________|___________________________| 
 */
 
/**
 * classe che comunica con il server per i dati che riguardano il login
 */
define(['connection'], function(Connection){
  return {	
    /**
     * metodo per controllare la correttezza delle credenziali inserite	
     */
    checkCredentials: function(user, pass, callBacks, view) {
      var credentials = {
        type: "login",
        username: user,
        password: pass
      };
      Connection.send(JSON.stringify(credentials));
      /**
       * ascoltatore di eventi da parte del server che si occupa di verificare
       * che le credenziali inserite siano corrette o meno
       */
      Connection.onmessage = function(str){
        alert('onmessage');
        var response = JSON.parse(str.data);
        if(response.type==="login"){				
          if(response.answer === "true"){
            callBacks.doLogin(user, pass, response, view);
          }else if(response.answer === "false"){
            alert("Login e username errate");
          }
        }
      }
    },
    
    /**
     * metodo per effettuare la registrazione
     */		
    signup: function(user, pass, name, surname, callBacks, view) {
      var credentials = {
        type: "signUp",
        username: user,
        password: pass,
        name: name,
        surname: surname
      };  
      Connection.send(JSON.stringify(credentials));
      /**
       * ascoltatore di eventi da parte del server che si occupa di verificare
       * che l'username inserito sia univoco o meno
       */
      Connection.onmessage = function(str){
        var response = JSON.parse(str.data);
        if(response.type==="signUp"){
          if(response.answer === "true"){
            response.name=name;
            response.surname=surname;
            callBacks.doLogin(user, pass, response, view);
          }else{ 
          alert("Username non disponibile");
          }
        }
      }
    },

    /**
     * metodo per effettuare il logout
     */			
    logout:function(user){
      var message = {
        type: "logout",
        username: user
      };  
      Connection.send(JSON.stringify(message));	
      Connection.onmessage = function(str){
        var response = JSON.parse(str.data);
        if(response.type==="logout"){
          if(response.answer == "false"){
            alert("Logout fallito");
          }
        }
      }
    }
  };
});
