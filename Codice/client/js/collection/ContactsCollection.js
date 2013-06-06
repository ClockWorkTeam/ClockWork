/*
/*
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

