/**
 * Nome:ChatCommunication.js
 * Package: communication
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
 
/**
 * classe che si occupa di gestire la chat
 */
define(['connection', 'collection/ContactsCollection', 'collection/TextMessagesCollection'], function(Connection, ContactsCollection,TextMessagesCollection){

  /**
   * ascoltatore di messaggi testuali in ingresso
   */
  Connection.addEventListener("message", onReceived, false);
  function onReceived(str){
    var response = JSON.parse(str.data);
    if (response.type === 'sendText'){
      TextMessagesCollection.add({contact:response.username, message:response.message ,source:'received'});
      var currentUnread = ContactsCollection.where({username: response.username})[0].get("unread");
      if (currentUnread > -1){
        ContactsCollection.where({username: response.username})[0].set({unread: currentUnread + 1});
      }
    }else if(response.type === 'notDelivered'){
      alert('Messaggio per '+response.username+' non è stato consegnato');
      var existing = TextMessagesCollection.find(function(mex){return (mex.get('contact') === response['username'] && mex.get('message')===response['message']);});
      existing.set('source', 'notsent');
    }
  };

  return {
    /**
     * funzione per inviare il messaggio
     */
    send:function(contact, message){
      var chatMessage = { type:'sendText', username: contact, message: message};
      Connection.send(JSON.stringify(chatMessage));
    }  
  };
	
});
