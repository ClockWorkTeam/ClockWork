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

define(function(){
	//classe che comunica con il server per i dati che riguardano il login
	var AuthenticationCommunication = function(){
	
	//metodo per controllare la correttezza delle credenziali inserite	
	AuthenticationCommunication.prototype.checkCredentials = function(user, pass) {
	  //funzione dummy - da implementare la connessione con il server
	  if ((!(user == ''))&&(!(pass == ''))) //se i campi username e password sono entrambi pieni
	    return {ans:true, nome: "pino", cognome:"gino"};						//restituisce vero
		
		
	  					   
	};
	AuthenticationCommunication.prototype.signup = function(user, pass,name,surname) {
	 return true
		
		
	  					   
	};
  }
  return AuthenticationCommunication;
});
