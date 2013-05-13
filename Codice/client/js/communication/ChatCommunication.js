/*
 * Nome:ChatCommunication.js
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
 
//classe che si occupa di gestire la chat
define(['connection', 'collection/ContactsCollection', 'collection/TextMessagesCollection'], function(Connection, ContactsCollection,TextMessagesCollection){

  Connection.addEventListener("message", onReceived, false);
  function onReceived(str){
      var response = JSON.parse(str.data);
      if (response.type === 'sendText'){
        var from = ContactsCollection.getUsername(response.ip);
        TextMessagesCollection.add({contact:from, message:response.message ,source:'received'});
        ContactsCollection.where({IP: response.ip}).set(unread: "1");			
      }
  };

  return {
		send:function(ip, message){
			var credentials = { type:'sendText', ip: ip, message: message};
      Connection.send(JSON.stringify(credentials));
		}  
  };
	
});
