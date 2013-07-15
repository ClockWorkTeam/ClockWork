/**
 * Nome: ContactsCollection.js
 * Package: collection
 * Autore: Furlan Valentino
 * Data: 2013/04/12
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+------------------------------+
 * |  Data  | Programmatore |           Modifiche          |
 * +--------+---------------+------------------------------+
 * | 130412 |      FV       | + creazione documento        |
 */

define([
 'underscore',
 'backbone',
 'storage',
 'model/RecordMessageModel'
], function( _, Backbone, Storage, RecordMessageModel){
  var RecordMessagesCollection = Backbone.Collection.extend({

    model: RecordMessageModel,

    localStorage: new Storage('recordMessages'),

    record: function(username) {
        return this.where({sender: username});
    }

  });
  return new ContactsCollection();
});

