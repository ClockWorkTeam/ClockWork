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
	
	return {
		fetchContacts: function(view) {
			var request = {
				type: 'getContacts',
				username: view.UserModel.toJSON().username
			};
			Connection.send(JSON.stringify(request));
		  
			Connection.onmessage = function(str){
				var response = JSON.parse(str.data);
				if(response.type==='getContacts'){
					for(var i=0; i<response.size; i++){
						var existing = view.collection.find(function(contact){return contact.get('username') === response['username'+i];});
						if(!existing){
							view.collection.create(
								{username: response['username'+i], 
									name: response['name'+i], 
									surname: response['surname'+i],  
								IP: response['IP'+i]}
							);
						} else {
							existing.set('IP', response['IP'+i]);
						}
					}
				
				view.contacts_view.render();
				}
			}	  					   
		}
	
	};
});
