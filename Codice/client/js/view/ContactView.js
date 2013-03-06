/*
 * Nome:untitled.js
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
		"click li.contact" : "view"
	},
	var this.TextMessageModel=new TextMessageModel();
//Per ora rendo sempre visibili dei contatti:
  render: function(){
    this.$el.html(this.template({dom: this.options.dom, username: this.model.toJSON().username}));   
	return this;
  },
// Su temp
	view : function(){
		var fview= new FunctionsView({model: this.model});
		
		var chat=new ChatView({model: this.TextMessageModel});
	}

}); 
  return ContactView;
});
