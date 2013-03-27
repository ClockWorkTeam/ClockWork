/*
 * Nome:AuthenticationCommunication.js
 * Package: 
 * Autore:
 * Data:
 * Versione:
 * 
 * Modifiche:
 * +------+---------------+-----------+
 * | Data | Programmatore | Modifiche |
 * +------+---------------+-----------+
 * |      |               |           |
 */
//classe che comunica con il server per i dati che riguardano il login
define(['connection'], function(Connection){
  
	return {
	
    //metodo per controllare la correttezza delle credenziali inserite	
    checkCredentials: function(user, pass, callBacks, view) {

      var credentials = {
        username: user,
        password: pass
      };

      Connection.send(JSON.stringify(credentials));
      
      Connection.onmessage = function(str){
        var response = JSON.parse(str.data);
        if(response.risposta == 'true')
          callBacks.doLogin(user, pass, response, view);
      }
    },
    
    //si occupa di gestire la registrazione
    signup: function(user, pass, name, surname) {
     return true			   
    }
	
  };
});
