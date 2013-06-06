/**
 * Nome:TextMessageModel.js
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
      source: '' 
    },
    
  });
  return TextMessageModel;
});
