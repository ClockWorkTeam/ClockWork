/*
 * Nome: StatisticsModel.js
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
    var StatisticsModel = Backbone.Model.extend({
		
	  defaults:{
		  send: '',
		  received: '',
		  duration: '',
		  latency: '',
      speed: ''
	  }
	  	  
    });
    return StatisticsModel;
});

