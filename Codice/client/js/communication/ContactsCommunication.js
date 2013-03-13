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
	
	var ContactCommunication = function(collection){
	
	//metodo per ricevere i contatti
	ContactCommunication.prototype.fetchContacts = function() {
	  
		this.dummyContacts('pino1');
		this.dummyContacts('pino2');
		this.dummyContacts('pino3');
		this.dummyContacts('pino4');
		this.dummyContacts('pino5');
	  					   
	};
	
	ContactCommunication.prototype.dummyContacts = function(nome) {
		collection.create({username: nome, 
		name: 'Giacomo', 
		surname: 'Bain', 
		IP: nome});
	};
	
  };
  return ContactCommunication;
});
