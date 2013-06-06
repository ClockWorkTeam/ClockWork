/*
 * Nome:TextMessagesCollection.js
 * Package: collection
 * Autore: Furlan Valentino
 * Data: 2013/04/10
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+---------------------------+
 * |  Data  | Programmatore |       Modifiche           |
 * +--------+---------------+---------------------------+
 * | 130410 |       FV      | + creazione del documento |
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
