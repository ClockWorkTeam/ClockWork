/*
 * Nome:ConactsView.js
 * Package: 
 * Autore:
 * Data:
 * Versione:
 * 
 * Modifiche:
 * +------+---------------+-----------+
 * | Data | Programmatore | Modifiche |
 * +------+---------------+-----------+
 * |      |               | Scrittura codice          |
 */

define([
 'jquery',
 'underscore',  
 'backbone',
 'view/ContactView',
 'view/FunctionsView',
 'view/ChatView',
 'text!templates/ContactsTemplate.html',
 'collection/ContactsCollection'
], function($, _, Backbone, ContactView, FunctionsView, ChatView, ContactsTemplate, ContactsCollection){
  var ContactsView = Backbone.View.extend({
	  
    el: $("#sidebar"),
    
    template: _.template(ContactsTemplate),
    
    collection: ContactsCollection,
    
    events:{
		'click button#callIP' : 'callIP',
		'click button#conference' : 'StartConference'
	},
	
    initialize:function(){
		_.bindAll(this, 'render', 'unrender', 'viewContact');
		
		//this.listenTo(this.collection, 'add', this.viewContacts);
		//this.listenTo(this.collection, 'change', this.viewContacts);
        //this.listenTo(this.collection, 'reset', this.viewContacts);
		//this.listenTo(this.collection, 'all', this.render);
		
		this.$el.html(this.template({logged: false}));

	},

	render: function (){
		$(this.el).html(this.template({logged: true}));
	    this.viewContacts();
	},
	
	unrender: function (){
		$(this.el).html(this.template({logged: false}));
		this.destroyContacts();
	},
	
	viewContact: function(ContactModel){
			var contact_view = new ContactView({dom : "sidebar", model: ContactModel });
			this.$("#contacts").append(contact_view.render().el);
	},
		
	viewContacts: function(){	
		this.collection.each(this.viewContact);	
	},
	
	destroyContacts: function(){
		var functions_view = new FunctionsView({From: ''});
		functions_view.remove();
		var chat_view = new ChatView();
		chat_view.remove();
		_.each(this.collection.record(), function(contact){contact.clear();});
	},
	
	callIP:function(){
		var functions_view = new FunctionsView({From: 'IP'});
	},
	
    StartConference: function(){
		var functions_view = new FunctionsView({From: 'Conf'});
		this.collection.fetch();
		this.collection.each(this.listContacts);
	},
	
	listContacts: function(ContactModel){
		var contact_view = new ContactView({dom : '', model: ContactModel});
		this.$("#optionContacts").append(contact_view.render().el);
	}
    
  });

  return ContactsView;
  
});

