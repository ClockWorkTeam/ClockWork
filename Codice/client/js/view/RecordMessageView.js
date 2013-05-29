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
  
  var localStream=null;
  
  var RecordMessageView = Backbone.View.extend({

    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
     
    events:{
		'click button#startrecord' : 'startrecord',
		'click button#sendrecord' : 'sendrecord'
    },
	
    el : $('#content'),
	
    template : _.template(RecordMessageTemplate),
    
    /**
     * funzione di inizializzazione dell'oggetto
     */    
    initialize: function(){
	
      _.bindAll(this, 'render');
		
    },
        
    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(){
      $(this.el).html(this.template(this.model.toJSON()));
      $(this.el).append('<button id= "startrecord">Inizia registrazione</button>');
      navigator.webkitGetUserMedia({video:true, audio:true},
        function(stream) {
          var video = document.getElementById("live_video");
          video.src = window.webkitURL.createObjectURL(stream);
          localStream=stream;
          });
    },
 
    /**
     * funzione che si occupa di avviare la registrazione della chiamata
     */    
    startrecord : function(){
      $('#startrecord').remove()
      $(this.el).append('<button id= "sendrecord">Termina registrazione ed invia</button>');
		},
    
    /**
     * funzione che si occupa di interrompere la registrazione ed inviarla al server
     */   	
    sendrecord : function(){
      $('#sendrecord').remove()
      $(this.el).append('<button id= "startrecord">Inizia registrazione</button>');
		}
  
  });

  /**
   * si occupa di chiudere la vista
   */
  RecordMessageView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return RecordMessageView;

});

