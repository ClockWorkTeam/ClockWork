/*
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
], function( _, Backbone, Storage, ContactModel){
  var ContactsCollection = Backbone.Collection.extend({

    model: ContactModel,

	//url: '/contacts',
	localStorage: new Storage('contacts'),
  
  record: function() {
      return this.filter(function(contact){ return contact.has('username'); });
    }, 
   
   /*Metodo che dato un'ip restituisce il primo username con tale ip*/
    getUsername:function(ip){
			return this.where({IP:ip})[0].toJSON().username;
		},
	
 });
  return new ContactsCollection();
});

