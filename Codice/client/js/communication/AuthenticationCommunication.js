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

      Connection.send("Login"+JSON.stringify(credentials));
      
		Connection.onmessage = function(str){
			var response = JSON.parse(str.data);
			if(response.risposta == "true"){
				callBacks.doLogin(user, pass, response, view);
			}else if(response.risposta == "false"){
				alert("Login e username errate");
			}

		}
	},
    signup: function(user, pass, name, surname) {
		var credentials = {
				username: user,
				password: pass,
				name: name,
				surname: surname
		};
			  
		Connection.send("SignUp"+JSON.stringify(credentials));
		Connection.onmessage = function(str){
			var response = JSON.parse(str.data);
			if(response.risposta == "true"){
				response.name=name;
				response.surname=surname;
				callBacks.doLogin(user, pass, response, view);
			}else if(response.risposta == "false"){ 
				alert("Username non disponibile");
			}
		}

	}
	
 };
});
