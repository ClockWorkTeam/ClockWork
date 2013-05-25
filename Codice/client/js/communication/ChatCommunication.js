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
				if(document.getElementById("chat")!=null && document.getElementById("sendMessage")!=null){
						TextMessagesCollection.add({contact:from, message:document.getElementById("chat").getElementsByTagName("textarea")[0].value ,source:'writing'});
				}
        TextMessagesCollection.add({contact:from, message:response.message ,source:'received'});
        var currentUnread = ContactsCollection.where({IP: response.ip})[0].get("unread");
        if (currentUnread > -1){
          ContactsCollection.where({IP: response.ip})[0].set({unread: currentUnread + 1});
        }
      }
  };

  return {
		send:function(ip, contact, message){
			var credentials = { type:'sendText', ip: ip, username: contact, message: message};
      Connection.send(JSON.stringify(credentials));
		}  
  };
	
});
