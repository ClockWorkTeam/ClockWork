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
 'communication/CallCommunication',
 'text!templates/CallTemplate.html'
], function($, _, Backbone, CallCommunication, CallTemplate){
  var CallView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#endCall':'endCall',
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(CallTemplate),
    
    calling:'',
        
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      this.calling=false;
      _.bindAll(this, 'render');
    },
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(isCaller,type, iptoCall){
		this.delegateEvents();
    if(document.getElementById('content')){
			$(this.el).html(this.template());
      console.log("sono su call");
    }
		else{
			$('#main').prepend(this.el);
      $(this.el).html(this.template());
		}
    //document.getElementById('chatTemplate').style.float='right';
    if(this.calling){
      CallCommunication.recoverCall();
      }

		if(isCaller===false && !this.calling){
			CallCommunication.sendAnswer(type, iptoCall, this);
      this.calling=true;
		}else{
			CallCommunication.sendCall(iptoCall, type, this);
      this.calling=true;
		}
		
    },
  
    endCall:function(){
      console.log("chiudo chiamata");
      document.getElementById('chatTemplate').style.float='none';
	  CallCommunication.endCall();
	  this.close();
	}
  
  });

  CallView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return CallView;

});
