/**
 * Nome: CallView.js
 * Package: View
 * Autore: Palmisano Maria Antonietta
 * Data: 2013/05/17
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+-----------------------+
 * | Data   | Programmatore |     Modifiche         |
 * +--------+---------------+-----------------------+
 * | 130518 |    PMA        | + metodo che chiude la|
 * |        |               |   chiamata            |
 * +--------+---------------+-----------------------+
 * | 130517 |    PMA        | + creazione documento |

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

  var statisticsView=null;
  var calling=null;

  var CallView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events:{
      'click button#endCall':'endCall',
    },

    el : '#content',

    template : _.template(CallTemplate),

    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      calling=false;
      _.bindAll(this, 'render');
      statisticsView = new StatisticsView();
    },

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(isCaller,type, contact){
      /**
      * controllo se nel DOM esiste l'elemento content, se non esiste viene reinserito nel documento
      */
      if(!document.getElementById('content')){
        $('#main').prepend(this.el);
      }
      $(this.el).html(this.template({ username: contact.toJSON().username }));
      if(!document.getElementById('statistics'))
        $('#main').insertBefore($('#statistics'), $('#chat'));

     /**
      * si controlla se l'attuale vista ha già una chiamata in corso
      * se si viene ripristinata la visualizzazione della chiamata
      * rendendo nuovamente visibile lo stream video ed audio e le statistiche
      * altrimenti significa che si sta instaurando una nuova chiamata
      * si invocano quindi metodi in base se si è il chiamante o il chiamato
      * della chiamata
      */

      if(calling){
        CallCommunication.recoverCall();
        statisticsView.render();
      }else{
        if(isCaller===false){
          CallCommunication.sendAnswer(type, contact, this);
          calling=true;
        }else{
        CallCommunication.sendCall(type, contact, this);
        calling=true;
        }
      }
    },

    /**
     *  metodo per la chiusura della chiamata
     */
    endCall:function(isEnding){
      /**
       *  controllo che si effettua per verificare chi ha deciso di concludere la chiamata
       */
      if(isEnding!=false)
        CallCommunication.endCall();
      this.close();
      this.options.FunctionsView.closeViewCall();
      statisticsView.close();
    }

  });

  CallView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return CallView;

});
