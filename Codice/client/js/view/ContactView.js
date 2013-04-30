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
 'model/TextMessageModel'
], function($, _, Backbone, ContactTemplate, FunctionsView, ChatView, TextMessageModel){
  var ContactView = Backbone.View.extend({
    template: _.template(ContactTemplate),
    
    events: {
		'click li.contact': 'view'
    },

    initialize: function(){
      _.bindAll(this, 'render', 'view' , 'remove');
      this.currentFunctions = new FunctionsView({model: this.model});
    },
	
    //rendo visibili i contatti:
    render: function(){
      this.$el.html(this.template({dom: this.options.dom, username: this.model.toJSON().username, ip: this.model.toJSON().IP}));   
    return this;
    },
  
    // funzione che crea le viste di funzioni e di chat quando clicco su un contatto
    view : function(){
      if(this.currentFunctions){
        this.currentFunctions.close();
      }
      this.currentFunctions = new FunctionsView({model: this.model});
      this.currentFunctions.render();
      $('#main').append(this.currentFunctions.el);
      
      if(this.currentChat){
        this.currentChat.close();
      }
      this.currentChat = new ChatView({model: TextMessageModel, ip: this.model.toJSON().IP});
      this.currentChat.render();
      $('#main').append(this.currentChat.el);
    }
	
  }); 

  ContactView.prototype.close = function(){
    if(this.currentFunctions)
      this.currentFunctions.close();
    if(this.currentChat)
      this.currentChat.close();
  };

  return ContactView;
});
