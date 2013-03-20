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
 'text!templates/RecordMessageTemplate.html',
], function($, _, Backbone, RecordMessageTemplate){
  var RecordMessageView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#startrecord' : 'startrecord',
		'click button#sendrecord' : 'sendrecord'
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(RecordMessageTemplate),
    
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
	
      _.bindAll(this, 'render');
		
    },
    
    localstream : '',
    
    //funzione che effettua la scrittura della struttura della pagina
	render: function(){
		alert(this.model.toJSON().username);
		$(this.el).html(this.template(this.model.toJSON()));
		$(this.el).append('<button id= "startrecord">Inizia registrazione</button>');
		navigator.webkitGetUserMedia({video:true, audio:true},
			function(stream) {
				video = document.getElementById("live_video");
				video.src = window.webkitURL.createObjectURL(stream);
				localstream=stream;
				});
		alert(navigator.webkitGetUserMedia.duration);
	},
    
    startrecord : function(){
		alert(localstream);
		localstream.stop();
		$('#startrecord').remove()
		$(this.el).append('<button id= "sendrecord">Termina registrazione ed invia</button>');
		},
	
	sendrecord : function()
    {
		$('#sendrecord').remove()
		$(this.el).append('<button id= "startrecord">Inizia registrazione</button>');
		}
  });

  RecordMessageView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return RecordMessageView;

});

