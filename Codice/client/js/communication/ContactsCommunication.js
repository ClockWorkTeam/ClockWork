/*
 * Nome: ContactsCommunication.js
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
//classe che comunica con il server per i dati che riguardano il ricavare la lista dei contatti
define(function(){
	
	var ContactCommunication = function(view){
	
	//metodo per ricevere i contatti
	ContactCommunication.prototype.fetchContacts = function() {
	  		var connection = new WebSocket('ws://127.0.0.1:8787');
  
		//messaggio di conferma di connessione sulla console
		connection.onopen = function(){
			console.log('Connection open!');
			connection.send("getContacts"+JSON.stringify(view.UserModel));
		};
    
		connection.onmessage = function(str){
			var response = JSON.parse(str.data);
			for(var i=0; i<response.size; i++){
//				this.addContact(response.(username+i), response.(name+i), response.(surname+i), response.(IP+i));
			}

		}

/*		this.dummyContacts('pino1');
		this.dummyContacts('pino2');
		this.dummyContacts('pino3');
		this.dummyContacts('pino4');
		this.dummyContacts('pino5');
*/	  					   
	};
	
	ContactCommunication.prototype.addContact = function(user, nome, cognome, ip) {
		view.collection.create(
		{username: user, 
		name: nome, 
		surname: cognome, 
		IP: ip});
	};
	
  };
  return ContactCommunication;
});
