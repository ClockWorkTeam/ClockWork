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
	AuthenticationCommunication.prototype.checkCredentials = function(user, pass) {
	  var connection = new WebSocket('ws://127.0.0.1:8787');
    
    //messaggio di conferma di connessione sulla console
    connection.onopen = function(){
      console.log('Connection open!');
    }
    
	  var credentials = {
      username: user,
      password: pass
    };

	  connection.send(JSON.stringify(credentials));
    
    var response = null;
    connection.onmessage = function(str){
      var response = JSON.parse(str.data);
    }
	  //funzione dummy - da implementare la connessione con il server
	  //if ((!(user == ''))&&(!(pass == ''))) //se i campi username e password sono entrambi pieni
	  return {ans: true, nome: 'pippo', cognome: 'baudo'};
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
