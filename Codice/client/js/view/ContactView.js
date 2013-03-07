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
    
    events:{
		"click li.contact": "view"
	},
	
	functions_view: '',
	
	chat_view: '',
	
	initialize:function(){
		_.bindAll(this, 'render', 'view'); 
	},
	
  //rendo visibili i contatti:
  render: function(){
    this.$el.html(this.template({dom: this.options.dom, username: this.model.toJSON().username}));   
	return this;
  },
  
    // funzione che crea le viste di funzioni e di chat quando clicco su un contatto
	view : function(){
		alert(this.functions_view);
		
		if(this.functions_view == '')
		{
			this.functions_view = new FunctionsView({model: this.model});
		} else {
			this.functions_view.render();
		};
		
		alert(this.chat_view);
		
		if(this.chat_view == '')
		{
			this.chat_view = new ChatView({model: TextMessageModel});
		} else {
			this.chat_view.render();
		}
	}

}); 
  return ContactView;
});
