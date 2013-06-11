/**
 * Nome: NotificationView.js
 * Package: View
 * Autore: Palmisano Maria Antonietta
 * Data: 2013/05/17
 * Versione: 1.0
 *
 * Modifiche:
* +--------+---------------+-----------------------+
 * | Data   | Programmatore |     Modifiche         |
 * +--------+---------------+-----------------------+
 * | 130518 |    FV         | + metodo che segnala  |
 * |        |               |   il rifiuto della    |
 * |        |               |   chiamata            |
 * +--------+---------------+-----------------------+
 * | 130517 |    PMA        | + creazione documento |

 */

define([
 'jquery',
 'underscore',
 'backbone',
 'text!template/NotificationTemplate.html'
], function($, _, Backbone, NotificationTemplate){
  var timeout = null;
  var NotificationView = Backbone.View.extend({


    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events:{
      'click button#acceptCall':'acceptCall',
      'click button#refuseCall':'refuseCall',
      'click button#viewMessage':'viewRecordMessage',
      'click button#ignoreMessage':'ignoreMessage',
      'click button#acceptFile':'acceptFile',
      'click button#refuseFile':'refuseFile'
    },

    el : $('#main'),

    //indica in quale parte del DOM gestirĂ
    template : _.template(NotificationTemplate),

    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      _.bindAll(this, 'render');
      _.bindAll(this, 'refuse');
      this.timeout=true;
      this.render();
    },

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(){
      $(this.el).html(this.template({username : this.options.caller}));
     
    },
    /**
     * funziona che si occupa di disabilitare la vista
     */
    unrender:function(){
      this.close();
      $(this.el).html('');
      $('body').append(this.el);
    },

    /**
     * funzione che si occupa di istanziare una chiamata nel qualcaso venga accettata
     */
    acceptCall : function(){
      this.timeout=false;
      this.unrender();
      var event=new CustomEvent('acceptCall',{
        detail:{
          type:this.options.typeCall,
          contact:this.options.caller
        },
        bubbles:true,
        cancelable:true
        });
      document.dispatchEvent(event);
    },

     /**
     * funzione che si occupa di rifiutare una chiamata automaticamente
     * nel qualcaso non si risponda entro un limite di tempo
     */
    timeoutCall : function(){
      if(this.timeout==true)
        this.refuse();
    },

     /**
     * funzione che si occupa di segnalare il rifiuto di una chiamata in ingresso
     */
    refuseCall : function(){
      this.options.NotificationCommunication.refuseCall(this.options.caller);
      this.unrender();
    }

  });
  /**
   * si occupa di chiudere la vista
   */
  NotificationView.prototype.close = function(){
    this.remove();
    this.unbind();
  }

  return NotificationView;

});
