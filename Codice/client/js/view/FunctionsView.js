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
 'view/RecordMessageView',
 'communication/NotificationCommunication',
 'text!templates/FunctionsTemplate.html'
], function($, _, Backbone, CallView, RecordMessageView,NotificationCommunication, FunctionsTemplate){
  
  var callView=null;
    
  var recordMessageView=null;
  
  var FunctionsView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events:{
      'click button#sendVideoText':'sendVideoText',
      'click button#call':'audiocall',
      'click button#video':'videocall',	
      'click input#record' : 'record'
    },
	
    el : $('#content'),
	
    template : _.template(FunctionsTemplate),
    
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
    /**
     * se si è già in chiamata con la persona selezionata si carica direttamente la vista della 
     * CallView senza caricare quella della FunctionView altrimenti si andrà a generare quest'ultima
     */
      if(callView){
        callView.render();
      }
      else{
        /**
         * controllo atto a verificare se si sta eseguendo una FunctionView di un utente presente nella lista utenti
         * o dall'inserimento di un indirizzo IP
         */
        if(typeof this.model == "undefined"){
          $(this.el).html(this.template({From: this.options.From}));
        } else {
          $(this.el).html(this.template(this.model.toJSON()));
        }
      }
    },   
    
    /**
     * funzione che si occupa di generare il videomessaggio da inviare
     */
    
    sendVideoText:function(){
		if(recordMessageView)
		{				
			recordMessageView.close;
			}
		this.close();
		recordMessageView=new RecordMessageView({model : this.model});
		recordMessageView.render();
		$('#main').prepend(recordMessageView.el);
		},
    
    /**
     * funzione che si occupa di inizializzare la chiamata solo audio
     */
    
    audiocall:function(isCaller){
      if(NotificationCommunication.getStatus() && isCaller!=false){
        alert("hai già una chiamata attiva");
      }
      else{
        this.close;
        callView=new CallView({FunctionView:this});
        if(isCaller==false){
          callView.render(false, 'audio',this.model);
        }else{
          callView.render(true,'audio',this.model);
        }
        $('#main').prepend(callView.el);
      }
    },
    
    /**
     * funzione che si occupa di inizializzare la chiamata audio e video
     */    
    
    videocall:function(isCaller){
      if(NotificationCommunication.getStatus() && isCaller!=false){
        alert("hai già una chiamata attiva");
      }
      else{
        this.close;
        callView=new CallView({FunctionView:this});
        if(isCaller==false){
          callView.render(false, 'video',this.model);
        }
        else{
          callView.render(true,'video',this.model);
        }
        $('#main').prepend(callView.el);
      }
    },
    
    /**
     * funzione che si occupa di registrare in locale la chiamata che si andrà ad effettuare
     */ 
    
    record : function(){
		
		},
    
    /**
     * funzione che si occupa di ripristinare la vista una volta che la chiamata audio o audio e video
     * venga terminata
     */ 
    
    closeViewCall : function(){
      console.log("prova");
      callView.close();
      callView=null;
      if(typeof this.model == "undefined"){
        $(this.el).html(this.template({From: this.options.From}));
      }else {
        this.delegateEvents();
        $('#main').prepend(this.el);
        $(this.el).html(this.template(this.model.toJSON()));
      }
		}
  });

  /**
   * si occupa di chiudere la vista
   */

  FunctionsView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return FunctionsView;

});
