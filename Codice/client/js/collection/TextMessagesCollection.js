/*
 * Nome:UserModel.js
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

define([
  'underscore',
  'backbone',
  'storage', 
  'model/TextMessageModel'
  ], function(_, Backbone, Store, TextMessageModel){
    var TextMessagesCollection = Backbone.Collection.extend({

		model: TextMessageModel,
		//PER ORA LO METTO NEL LOCAL STORAGE SOTTO IL NAMESPACE MyTalk
		//sessionStorage: new Store("MyTalk")
		localStorage: new Store("MyTalk"),
	  
		chat_session: function(recipient) {
		  return this.filter(function(contact){ return contact.where({username: recipient}); });
		},
	
    });
  return new TextMessagesCollection();
});
