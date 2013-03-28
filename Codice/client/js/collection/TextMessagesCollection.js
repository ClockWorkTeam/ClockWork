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
  ], function(_, Backbone, Storage, TextMessageModel){
    var TextMessagesCollection = Backbone.Collection.extend({

		model: TextMessageModel,

    //url: '/textmessages',
    	localStorage: new Storage('textmessages'),
	  
		chat_session: function(recipient) {
		  return this.filter(function(contact){ return contact.where({username: recipient}); });
		},
	
    });
  return new TextMessagesCollection();
});
