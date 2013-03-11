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
		'click button#call':'audiocall',
		'click button#video':'videocall',	
		'click input#record' : 'record'
	},
	
	el : $('#content'),
	
//indica in quale parte del DOM gestirà 
    template: _.template(FunctionTemplate),
    
//funzione di inizializzazione dell'oggetto
  initialize: function(){
    _.bindAll(this, 'render','cancella');
    this.render();
  },
  current_user:'',
//funzione che effettua la scrittura della struttura della pagina
  render: function(){
	 
    if(typeof this.model == "undefined"){
		$(this.el).html(this.template({From: this.options.From}));
	}else{
		current_user=this.model.toJSON().username;
		$(this.el).html(this.template(this.model.toJSON()));
	}
  },
    
  startChat: function(){},
  
  sendVideoText:function(){},
  
  audiocall:function(){},
  
  videocall:function(){
	alert(current_user+'username');
//	if((!(this.model))&&(!(typeof this.model == "undefined"))  )
//	alert(this.model.toJSON().username+'model');
	if((!(typeof this.model == "undefined")) && current_user==this.model.toJSON().username)
	{
		alert(this.model.toJSON().IP);
	}
  },
  
  record : function(){},
  
  cancella : function(){
	  current_user='';
	  this.model.toJSON().username='';
	  this.videocall();
	  
	//  this.unbind();
	  }
});
return FunctionView;
});
