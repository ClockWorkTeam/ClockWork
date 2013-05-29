/**
 * Nome: CallView.js
 * Package: View
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
 
define([
 'jquery',
 'underscore',  
 'backbone',
 'communication/CallCommunication',
 'text!templates/CallTemplate.html',
 'view/StatisticsView'
], function($, _, Backbone, CallCommunication, CallTemplate, StatisticsView){
  var statisticsView=null;
  
  var CallView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events:{
		'click button#endCall':'endCall',
    },
	
    el : $('#content'),
	

    template : _.template(CallTemplate),
        
    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      this.calling=false;
      _.bindAll(this, 'render');
      statisticsView = new StatisticsView();
    },
    
    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(isCaller,type, contact){
    /**
     * abilità gli eventi presenti nella vista
     */
      this.delegateEvents();
    /**
     * controllo se nel DOM esiste l'elemento content, se non esiste viene reinserito nel documento 
     */
      if(!document.getElementById('content')){
        $('#main').prepend(this.el);
      }
      $(this.el).html(this.template());
      if(!document.getElementById('statistics'))
        $('#main').insertBefore($('#statistics'), $('#chat'));
     // document.getElementById('chatTemplate').style.float='right';
     
     /** 
      * si controlla se l'attuale vista ha già una chiamata in corso
      * se si viene ripristinata la visualizzazione della chiamata
      * rendendo nuovamente visibile lo stream video ed audio e le statistiche
      * altrimenti significa che si sta instaurando una nuova chiamata
      * si invocano quindi metodi in base se si è il chiamante o il chiamato
      * della chiamata
      */ 
 
      if(this.calling){
        CallCommunication.recoverCall();
        this.statisticsView.render();
      }else{ 
        if(isCaller===false){
          CallCommunication.sendAnswer(type, contact, this);
        }else{
          CallCommunication.sendCall(type, contact, this);
        }
        this.calling=true;	
      }	
    },
  
    /**
     *  metodo per la chiusura della chiamata
     */
    endCall:function(isEnding){
      console.log("chiudo chiamata");
      /**
       *  controllo che si effettua per verificare chi ha deciso di concludere la chiamata
       */
      if(isEnding!=false)
        CallCommunication.endCall();
      this.close();
      this.options.FunctionView.closeViewCall();
      this.statisticsView.close();
    }
  
  });

  /**
   * si occupa di chiudere la vista
   */

  CallView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return CallView;

});
