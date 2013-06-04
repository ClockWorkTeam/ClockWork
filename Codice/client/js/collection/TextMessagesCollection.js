/*
 * Nome:TextMessagesCollection.js
 * Package: collection
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

      localStorage: new Storage('textmessages'),

      chat_session: function(username) {
        return this.where({contact: username});
      },
	
    });
  return new TextMessagesCollection();
});
