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
 'text!templates/CallTemplate.html',
 'view/StatisticsView'
], function($, _, Backbone, CallCommunication, CallTemplate, StatisticsView){
  var CallView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#endCall':'endCall',
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(CallTemplate),
        
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      this.calling=false;
      _.bindAll(this, 'render');
      this.statisticsView = new StatisticsView();
    },
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(isCaller,type, contact){
      if(document.getElementById('content')){
        $(this.el).html(this.template(contact.toJSON()));
      }else{
        $('#main').prepend(this.el);
        $(this.el).html(this.template(contact.toJSON()));
      }

      if(!document.getElementById('statistics'))
        $('#main').insertBefore($('#statistics'), $('#chat'));

      if(this.calling){
        CallCommunication.recoverCall();
        this.statisticsView.render();
      }else{ 
        if(isCaller===false){
          CallCommunication.sendAnswer(type, contact, this);
          this.calling=true;
        }else{
        CallCommunication.sendCall(type, contact, this);
        this.calling=true;
        }	
      }	
    },
  
    endCall:function(isEnding){
      if(isEnding!=false)
        CallCommunication.endCall();
      this.close();
      this.options.FunctionView.closeViewCall();
      this.statisticsView.close();
    }
  
  });

  CallView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return CallView;

});
