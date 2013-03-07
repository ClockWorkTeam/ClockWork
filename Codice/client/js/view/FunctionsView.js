/*
 * Nome: FunctionsView.js
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
 
//definizione delle dipendenze
define([
 'jquery',
 'underscore',  
 'backbone',
 'text!templates/FunctionTemplate.html',
], function($, _, Backbone, FunctionTemplate){
  var FunctionView = Backbone.View.extend({
 //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#startChat':'startChat',
		'click button#sendVideoText':'sendVideoText',
		'click button#call':'call',
		'click button#video':'video',	
		'click input#record' : 'record'
	},
	el : $("body"),
//indica in quale parte del DOM gestirà 
    template: _.template(FunctionTemplate),
    
//funzione di inizializzazione dell'oggetto
  initialize: function(){
    _.bindAll(this, 'render'); 
    this.render();
  },
//funzione che effettua la scrittura della struttura della pagina
  render: function(){
    if(typeof this.model == "undefined"){
		$("#content").html(this.template({From: this.options.From}));
	}else{
		$("#content").html(this.template(this.model.toJSON()));
	}
  },
    
  startChat: function(){},
  sendVideoText:function(){},
  call:function(){},
  video:function(){},
  record:function(){}
});
return FunctionView;
});
