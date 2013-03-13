/*
 * Nome:untitled.js
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
 'model/ContactModel'
], function( _, Backbone, ContactModel){
  var ContactsCollection = Backbone.Collection.extend({

    model: ContactModel,

	url: '/contacts',
  
  record: function() {
      return this.filter(function(contact){ return contact.has('username'); });
    }, 
	
 });
  return new ContactsCollection();
});
