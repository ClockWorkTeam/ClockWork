/**
 * Nome:ContactView.js
 * Package: View
 * Autore: Palmisano Maria Antonietta
 * Data: 2013/05/20
 * Versione: 1.0
 *
 * Modifiche:
* +--------+---------------+---------------------------------+
 * | Data   | Programmatore |     Modifiche                  | 
 * +--------+---------------+--------------------------------+
 * | 130713 |    BG         | + Metodo  createCallConference | 
 * +--------+---------------+--------------------------------+
 * | 130520 |    PMA        | + creazione documento          | 
 * -----------------------------------------------------------

 */

define([
 'jquery',
 'underscore',
 'backbone',
 'view/FunctionsView',
 'text!template/ContactTemplate.html',
 'model/UserModel'
], function($, _, Backbone, FunctionsView, ContactTemplate, UserModel){


  var ContactView = Backbone.View.extend({
    conference:'',
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
      this.conference=false;
      this.currentFunctions=null;
      this.listenTo(this.model, 'change', this.render);
      _.bindAll(this, 'view');
      var contactView=this;
      document.addEventListener('endConference',setConference,false);
      
      function setConference(event){
        
        if(event.detail.contact==contactView.model.toJSON().username){
          console.log("prova"+event.detail.contact);
          contactView.conference=false;
        }
      }
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
      console.log("conferenza?? " +this.conference);
      if(this.conference==false){
        this.currentFunctions.render();
        $('#main').prepend(this.currentFunctions.el);
      }
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
    },
    
    createCallConference : function(type,contact, sideView){
      /**
       * condizione messa per evitare di chiudere functionview non ancora create
       */
      
      if(!this.currentFunctions){
        this.currentFunctions = new FunctionsView({model: this.model, userModel: this.options.userModel, callback:sideView});
      }
      if(this.conference==false){
        this.conference=true;
        this.options.callback.closeOtherContacts(this.model.toJSON().username);
        this.currentFunctions.conference(false,contact);
        $('#main').prepend(this.currentFunctions.el);
      }else{
        this.currentFunctions.conference(null,null);
        }
    }
  });

  /**
   * si occupa di chiudere la vista
   */
  ContactView.prototype.close = function(){
    if(this.currentFunctions){
      //this.currentFunctions.unrender();
      this.currentFunctions.close();
    }
    this.conference=false;
  };

  return ContactView;
});
