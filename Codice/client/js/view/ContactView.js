/**
 * Nome:ContactView.js
 * Package: View
 * Autore: Palmisano Maria Antonietta
 * Data: 2013/05/20
 * Versione: 1.0
 *
 * Modifiche:
* +--------+---------------+-----------------------+
 * | Data   | Programmatore |     Modifiche         |
 * +--------+---------------+-----------------------+
 * | 130520 |    PMA        | + creazione documento |

 */

define([
 'jquery',
 'underscore',
 'backbone',
 'view/FunctionsView',
 'text!templates/ContactTemplate.html',
 'model/UserModel'
], function($, _, Backbone, FunctionsView, ContactTemplate, UserModel){


  var ContactView = Backbone.View.extend({
    template: _.template(ContactTemplate),
		tagName: 'li',
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events: {
      'click span.contact': 'view'
    },
    
    currentFunctions:'',
    
    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      this.currentFunctions=null;
      this.listenTo(this.model, 'change', this.render);
      _.bindAll(this, 'view');
    },

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(){
      this.$el.html(this.template({dom: this.options.dom, username: this.model.toJSON().username, ip: this.model.toJSON().IP, unread: this.model.toJSON().unread }));
      return this;
    },

    /**
     * funzione che si occupa di creare la function view dell'utente selezionato
     */
    view : function(){
      /**
       * condizione messa per evitare di chiudere functionview non ancora create
       */
      this.options.callback.closeOtherContacts(this.model.toJSON().username);
      if(!this.currentFunctions)
        this.currentFunctions = new FunctionsView({model: this.model, userModel: this.options.userModel});
      this.currentFunctions.render();
      $('#main').prepend(this.currentFunctions.el);
    },

    /**
     * funzione che si occupa di creare la function view nel caso si decida di accettare la chiamata in ingresso
     */
    createCall : function(type){
      /**
       * condizione messa per evitare di chiudere functionview non ancora create
       */
      if(!this.currentFunctions){
        this.currentFunctions = new FunctionsView({model: this.model, userModel: this.options.userModel});
      }else{
        this.currentFunctions.render();
      }
      this.options.callback.closeOtherContacts(this.model.toJSON().username);
      if(type=="video"){
        this.currentFunctions.videocall(false);
      }else{
        this.currentFunctions.audiocall(false);
      }
      $('#main').prepend(this.currentFunctions.el);
    }
  });

  /**
   * si occupa di chiudere la vista
   */
  ContactView.prototype.close = function(){
    if(this.currentFunctions){
      this.currentFunctions.unrender();
    }
  };

  return ContactView;
});
