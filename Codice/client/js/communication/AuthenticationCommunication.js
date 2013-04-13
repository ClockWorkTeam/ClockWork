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
		 type: "Login",
        username: user,
        password: pass
      };

      Connection.send(JSON.stringify(credentials));
      
		Connection.onmessage = function(str){
			var response = JSON.parse(str.data);
			if(response.risposta == "true"){
				callBacks.doLogin(user, pass, response, view);
			}else if(response.risposta == "false"){
				alert("Login e username errate");
			}

		}
	},
    signup: function(user, pass, name, surname, callBacks, view) {
		var credentials = {
				type: "SignUp",
				username: user,
				password: pass,
				name: name,
				surname: surname
		};  
		Connection.send(JSON.stringify(credentials));
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
	},
	logout:function(user){
		var credentials = {
				type: "Logout",
				username: user
		};  
		Connection.send(JSON.stringify(credentials));	
		Connection.onmessage = function(str){
			var response = JSON.parse(str.data);
			if(response.risposta == "true"){
				alert("Logout effettuato");
			}else if(response.risposta == "false"){
				alert("Logout fallito");
			}

		}
	}
 };
});
