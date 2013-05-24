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
  var ContactView = Backbone.View.extend({
    template: _.template(ContactTemplate),
    
    events: {
		'click li.contact': 'view'
    },

    initialize: function(){
		  this.listenTo(this.model, 'change', this.render);
      _.bindAll(this, 'render', 'view' , 'remove');
      this.currentFunctions = null;
    },
	
    //rendo visibili i contatti:
    render: function(){
      this.$el.html(this.template({dom: this.options.dom, username: this.model.toJSON().username, ip: this.model.toJSON().IP, unread: this.model.toJSON().unread }));   
    return this;
    },
  
    // funzione che crea le viste di funzioni e di chat quando clicco su un contatto
    view : function(){
      //condizione messa per evitare di chiudere functionview non ancora create
      if(this.currentFunctions){
        this.currentFunctions.render();
      }
      else{
      this.currentFunctions = new FunctionsView({model: this.model});
      this.currentFunctions.render();
      }
       this.options.callback.disableContact();
      this.currentFunctions.delegateEvents();
      $('#main').append(this.currentFunctions.el);
      
      chat.close();
      chat= new ChatView({model: this.model, userModel: this.options.userModel});
      chat.render();
      $('#main').append(chat.el);
      this.model.set({unread: -1});
    },
    
    createCall : function(type){
     
      //condizione messa per evitare di chiudere functionview non ancora create
      if(this.currentFunctions){
        this.currentFunctions.render();
      }
      else{
      this.currentFunctions = new FunctionsView({model: this.model});
      }
      this.options.callback.disableContact();
      this.currentFunctions.delegateEvents();
      if(type=="video"){
        this.currentFunctions.videocall(false);
      }
      else{
        this.currentFunctions.audiocall(false);
      }
      $('#main').append(this.currentFunctions.el);
      
      chat.close();
      chat= new ChatView({model: this.model, userModel: this.options.userModel});
      chat.render();
      $('#main').append(chat.el);
    }
	
  }); 

  ContactView.prototype.close = function(){
    if(this.currentFunctions)
      this.currentFunctions.close();
    chat.close();
  };

  return ContactView;
});
