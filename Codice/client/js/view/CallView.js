/*
 * Nome: CallView.js
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
 'text!templates/CallTemplate.html',
], function($, _, Backbone, CallTemplate){
  var CallView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
    },
	
    el : $('#call'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(CallTemplate),
    
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
	
      _.bindAll(this, 'render');
		
    },
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
		if(this.startcall())
		{
			if(this.options.type=='video')
			{	
				//alert('prova');
				$(this.el).html(this.template({video:'video'}));
				navigator.webkitGetUserMedia({video:true, audio:true},
				function(stream) {
					video = document.getElementById("live_video");
				video.src = window.webkitURL.createObjectURL(stream);
				});
				}
			if(this.options.type=='audio')
			{
				$(this.el).html(this.template({video:'audio'}));
				navigator.webkitGetUserMedia({video:false, audio:true},
				function(stream) {
					video = document.getElementById("live_video");
				video.src = window.webkitURL.createObjectURL(stream);
				});
				
				
				}
			}
		else
		{
			return false;
			}
    },
    
    startcall : function()
    {
		return true;
		}
  });

  CallView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return CallView;

});
