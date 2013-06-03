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
 'view/FunctionsView',
 'text!templates/ContactTemplate.html',
 'model/UserModel'
], function($, _, Backbone, FunctionsView, ContactTemplate, UserModel){
  var ContactView = Backbone.View.extend({
    template: _.template(ContactTemplate),
    
    events: {
		'click li.contact': 'view'
    },

    initialize: function(){
			this.listenTo(this.model, 'change', this.render);
      _.bindAll(this, 'view');
    },
	
    //rendo visibili i contatti:
    render: function(){
			console.log(this.model.toJSON().username);
      this.$el.html(this.template({dom: this.options.dom, username: this.model.toJSON().username, ip: this.model.toJSON().IP, unread: this.model.toJSON().unread }));
			return this;
    },
  
    // funzione che crea le viste di funzioni e di chat quando clicco su un contatto
    view : function(){
			this.options.callback.closeOtherContacts(this.model.toJSON().username);
      if(!this.currentFunctions)
					this.currentFunctions = new FunctionsView({model: this.model, userModel: this.options.userModel});
			this.currentFunctions.render();

			$('#main').prepend(this.currentFunctions.el);
    },
    
    createCall : function(type){
      //condizione messa per evitare di chiudere functionview non ancora create
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

  ContactView.prototype.close = function(){
    if(this.currentFunctions){
      this.currentFunctions.unrender();
		}
  };

  return ContactView;
});
