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
 'view/CallView',
 'text!templates/FunctionsTemplate.html'
], function($, _, Backbone, CallView, FunctionsTemplate){
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
    template : _.template(FunctionsTemplate),
    
    callView : '',
    
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
        currentuser=this.model.toJSON().username;
        $(this.el).html(this.template(this.model.toJSON()));
      }
    },
      
    startChat: function(){},
    
    sendVideoText:function(){},
    
    audiocall:function(){
		if(this.callView)
		{	
			this.callView.close;
			}
			alert('audio');
		this.callView=new CallView({type:'audio'});
		this.callView.render();
		$('#main').append(this.callView.el);
    },
    
    videocall:function(){
		if(this.callView)
		{	
			this.callView.close;
			}
		alert('video');
		this.callView=new CallView({type:'video'});
		this.callView.render();
		$('#main').append(this.callView.el);
    },
    
    record : function(){}
  });

  FunctionsView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return FunctionsView;

});
