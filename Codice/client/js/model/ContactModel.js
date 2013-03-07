/*
 * Nome: ContactModel.js
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
  'backbone'
  ], function(_, Backbone){
    var ContactModel = Backbone.Model.extend({		
	  defaults: {
		  username: '',
		  name: '',
		  surname: '',
		  IP: '0.0.0.0'
	  },
	  
	clear: function() {
      this.destroy();
    }
	    
});
    return ContactModel;
});
