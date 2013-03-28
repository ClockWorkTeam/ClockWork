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
  
	var AuthenticationCommunication = function(){};
	
	//metodo per controllare la correttezza delle credenziali inserite	
	AuthenticationCommunication.prototype.checkCredentials = function(user, pass, callBacks, view) {
    
    
    if(!callBacks){alert('attenzione!')};
    
    var credentials = {
        username: user,
        password: pass
      };

      Connection.send(JSON.stringify(credentials));

    
    Connection.onmessage = function(str){
      var response = JSON.parse(str.data);
      if(response.risposta == 'true'){
        callBacks.doLogin(user, pass, response, view);
      }
    }
	  //funzione dummy - da implementare la connessione con il server
	  //if ((!(user == ''))&&(!(pass == ''))) //se i campi username e password sono entrambi pieni
	  //return {ans: response.answer, nome: respone.name, cognome: response.surname};
	};
  
  /*
  function myIP() {
    if (window.XMLHttpRequest) 
   xmlhttp = new XMLHttpRequest();
    else 
   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");

    xmlhttp.open("GET","http://jsonip.appspot.com/",false);
    xmlhttp.send();

    hostipInfo = xmlhttp.responseText;
    obj = JSON.parse(hostipInfo);
    document.getElementById("IP").value=obj.ip;
    document.getElementById("ADDRESS").value=obj.address;
  }
  */
	
	//si occupa di gestire la registrazione
	AuthenticationCommunication.prototype.signup = function(user, pass, name, surname) {
	 return true			   
	};
	
  return AuthenticationCommunication;
});
