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
define(function(){
	
	var AuthenticationCommunication = function(){};
	
	//metodo per controllare la correttezza delle credenziali inserite	
	AuthenticationCommunication.checkCredentials = function(user, pass) {
	  //funzione dummy - da implementare la connessione con il server
	  if ((!(user == ''))&&(!(pass == ''))) //se i campi username e password sono entrambi pieni
	    return {ans:true, nome: "pino", cognome:"gino"};						//restituisce vero
	};
	//si occupa di gestire la registrazione
	AuthenticationCommunication.signup = function(user, pass, name, surname) {
	 return true			   
	};
	
  return AuthenticationCommunication;
});
