/**
 * Nome: ContactsCollection.js
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
 'model/ContactModel'
], function( _, Backbone, Storage, ContactModel){
  var ContactsCollection = Backbone.Collection.extend({

    model: ContactModel,

    localStorage: new Storage('contacts'),
  
    record: function() {
      return this.filter(function(contact){ return contact.has('username'); });
    }
    
  });
  return new ContactsCollection();
});

