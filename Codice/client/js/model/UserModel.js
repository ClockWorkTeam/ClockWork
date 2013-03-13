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
  'backbone'
  ], function(_, Backbone){
    var UserModel = Backbone.Model.extend({
		
	  urlRoot: '/user',
		
	  defaults:{
		  username: '',
		  password: '',
		  name: '',
		  surname: ''
	  }
	  	  
    });
    return UserModel;
});
