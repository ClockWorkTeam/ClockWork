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
  'model/TextMessageModel'
  ], function(_, Backbone, TextMessageModel){
    var TextMessagesCollection = Backbone.Collection.extend({

		model: TextMessageModel,

    url: '/textmessages',
	  
		chat_session: function(recipient) {
		  return this.filter(function(contact){ return contact.where({username: recipient}); });
		},
	
    });
  return new TextMessagesCollection();
});
