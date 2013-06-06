/**
 * Nome:ContactsCommunication.js
 * Package: Communication
 * Autore: Ceseracciu Marco
 * Data: 2013/04/07
 * Versione: 1.0
 * 
 * Modifiche:
 * +---------+---------------+-------------------------------------+
 * | Data    | Programmatore |        Modifiche                    | 
 * +---------+---------------+-------------------------------------+
 * |13/04/09 |    CM         | # Modifiche allo scopo di capire    | 
 * |         |               |   che utenti sono online o meno     | 
 * +---------|---------------|-------------------------------------| 
 * |13/04/07 |    CM         | + Metodo fetchContacts              | 
 * |_________|_______________|_____________________________________| 
 */
 
define(['connection','collection/ContactsCollection'], function(Connection, contactsCollection){
  return {
    /**
     * si occupa di scorrere tutti i contatti del server e salvarli nella collection
     * se non presenti o aggiornare il loro stato
     */
    fetchContacts: function(username) {
      var request = {
        type: 'getContacts',
        username: username
      };
      Connection.send(JSON.stringify(request));
      /**
       * ascoltatore che si occupa di gestire e modificare la collection dei
       * contatti
       */
      Connection.onmessage = function(str){
        var response = JSON.parse(str.data);
        if(response.type==='getContacts'){
          for(var i=0; i<response.size; i++){
            var existing = contactsCollection.find(function(contact){return contact.get('username') === response['username'+i];});
            /**
             * se il contatto non esiste creo un nuovo modello da aggiungere nella collection
             * altrimenti lo aggiorno
             */
            if(!existing){
              contactsCollection.add({
                username: response['username'+i], 
                name: response['name'+i], 
                surname: response['surname'+i],  
                IP: response['IP'+i]
              });
            }else{
              existing.set('IP', response['IP'+i]);
            }
          }
        }
      }	  					   
    }
  };
});
