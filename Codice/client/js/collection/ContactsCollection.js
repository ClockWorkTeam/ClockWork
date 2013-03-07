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
 'storage', 
 'model/ContactModel'
], function( _, Backbone, Store, ContactModel){
  var ContactsCollection = Backbone.Collection.extend({

    model: ContactModel,
 //PER ORA LO METTO NEL LOCAL STORAGE SOTTO IL NAMESPACE MyTalk
//	sessionStorage: new Store("MyTalk")
  localStorage: new Store("MyTalk", "session"), 
  
  record: function() {
      return this.filter(function(contact){ return contact.has('username'); });
    }, 
	
 });
  return new ContactsCollection();
});
