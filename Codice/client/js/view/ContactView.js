/*
 * Nome:ContactView.js
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

define([
 'jquery',
 'underscore',  
 'backbone',
 'text!templates/ContactTemplate.html',
 'view/FunctionsView',
 'view/ChatView',
 'model/UserModel'
], function($, _, Backbone, ContactTemplate, FunctionsView, ChatView, UserModel){
  
  var currentFunctions=null;
  
  var ContactView = Backbone.View.extend({
    template: _.template(ContactTemplate),
    
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    
    events: {
		'click li.contact': 'view'
    },

    /**
     * funzione di inizializzazione dell'oggetto
     */
     
    initialize: function(){
		  this.listenTo(this.model, 'change', this.render);
      _.bindAll(this, 'render', 'view' , 'remove');
      currentFunctions = null;
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
      if(!this.currentFunctions){
        currentFunctions = new FunctionsView({model: this.model});
      }
      currentFunctions.render();
      this.options.callback.disableContact();
      currentFunctions.delegateEvents();
      $('#main').prepend(this.currentFunctions.el);
      chat.close();
      chat= new ChatView({model: this.model, userModel: this.options.userModel});
      chat.render();
      $('#main').append(chat.el);
      this.model.set({unread: -1});
    },
    
    /**
     * funzione che si occupa di creare la function view nel caso si decida di accettare la chiamata in ingresso
     */
    
    createCall : function(type){
      currentFunctions = new FunctionsView({model: this.model});
      this.options.callback.disableContact();
      currentFunctions.delegateEvents();
      if(type=="video"){
        currentFunctions.videocall(false);
      }
      else{
        currentFunctions.audiocall(false);
      }
      if(!document.getElementById('content')){
        $('#main').prepend("#content");
      }
      $('#main').prepend(this.currentFunctions.el);
      
      chat.close();
      chat= new ChatView({model: this.model, userModel: this.options.userModel});
      chat.render();
      $('#main').append(chat.el);
    }
	
  }); 

  /**
   * si occupa di chiudere la vista
   */
   
  ContactView.prototype.close = function(){
    if(currentFunctions)
      currentFunctions.close();
    chat.close();
  };

  return ContactView;
});
