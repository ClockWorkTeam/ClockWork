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
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(CallTemplate),
        
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
	
      _.bindAll(this, 'render');
    },
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(isCaller,type, iptoCall){
		$(this.el).html(this.template());
		if(isCaller===false){
			var callcommunication=new CallCommunication();
			callcommunication.sendAnswer(type, iptoCall);
			}
		else{
			var callcommunication=new CallCommunication();
			callcommunication.sendCall(iptoCall,type);
			}
		
    },
    
  });

  CallView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return CallView;

});
