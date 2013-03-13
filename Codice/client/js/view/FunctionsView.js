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
 'text!templates/FunctionsTemplate.html',
], function($, _, Backbone, FunctionsTemplate){
  var FunctionsView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#startChat':'startChat',
		'click button#sendVideoText':'sendVideoText',
		'click button#call':'audiocall',
		'click button#video':'videocall',	
		'click input#record' : 'record'
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template: _.template(FunctionsTemplate),
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      _.bindAll(this, 'render');
    },
    
    current_user: '',
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
     
      if(typeof this.model == "undefined"){
        $(this.el).html(this.template({From: this.options.From}));
      } else {
        current_user=this.model.toJSON().username;
        $(this.el).html(this.template(this.model.toJSON()));
      }
    },
      
    startChat: function(){},
    
    sendVideoText:function(){},
    
    audiocall:function(){
      //if(current_user==this.model.toJSON().username){
        alert(this.model.toJSON().IP);
      //}  
    },
    
    videocall:function(){
      if(current_user==this.model.toJSON().username){
        alert(this.model.toJSON().IP);
      }
    },
    
    record : function(){}
  });

  FunctionsView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return FunctionsView;

});
