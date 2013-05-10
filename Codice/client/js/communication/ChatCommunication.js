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
define(['connection','view/ChatView', 'collection/ContactsCollection'], function(Connection, ChatView, ContactsCollection){

  return {
/*		send:function(ip, message){
			var credentials = { type:'sendText', ip: ip, message: message};
      Connection.send(JSON.stringify(credentials));
		},
	
      Connection.addEventListener("message", onNotification, false);
			function onNotification(str){

				var
				 response = JSON.parse(str.data);
				if (response.type === 'sendText'){
					var from = ContactsCollection.getUsername(response.ip);
					ChatView.delivered(from, response.message);
				}
		}
*/
  
  };
	
});
