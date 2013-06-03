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
    var TextMessageModel = Backbone.Model.extend({
	
      defaults: {
        contact: '',
	message: '',
        source: '' //sent o received o notsent
      },
	    
    });
    return TextMessageModel;
});
