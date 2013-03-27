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
define(['connection'], function(Connection){
	
	//var ContactCommunication = function(view){
	return {
    //metodo per ricevere i contatti
    fetchContacts: function(view) {

      var request = {
        type: 'getContacts',
        username: view.UserModel.username
      }

      Connection.send(JSON.stringify(request));
      
      Connection.onmessage = function(str){
        var response = JSON.parse(str.data);
        alert(response);
        for(var i=0; i<response.size; i++){
  				this.addContact(view, response['contact'+i].username, response['contact'+i].name, response['contact'+i].surname, response['contact'+i].IP);
        }

      }	  					   
    },
    
    addContact: function(view, user, nome, cognome, ip) {
      view.collection.create(
        {username: user, 
        name: nome, 
        surname: cognome, 
        IP: ip}
      );
    }
	
  };
});
