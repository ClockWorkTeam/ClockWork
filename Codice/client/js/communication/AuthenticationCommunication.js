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
				type: "login",
        username: user,
        password: pass
      };
      Connection.send(JSON.stringify(credentials));
      
			Connection.onmessage = function(str){
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
		
    signup: function(user, pass, name, surname, callBacks, view) {
			var credentials = {
				type: "signUp",
				username: user,
				password: pass,
				name: name,
				surname: surname
			};  
			Connection.send(JSON.stringify(credentials));
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
		
		logout:function(user){
			var credentials = {
				type: "logout",
				username: user
			};  
			Connection.send(JSON.stringify(credentials));	
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
