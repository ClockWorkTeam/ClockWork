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
    
    contact_view : [],
    
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
	
	viewContact: function(ContactModel,conta){
			this.contact_view.push(new ContactView({dom : "sidebar", model: ContactModel }));
			this.$("#contacts").append(this.contact_view[conta].render().el);
			conta++;
	},
		
	viewContacts: function(){
		var conta=0;	
		this.collection.each(this.viewContact,conta);	
	},
	
	destroyContacts: function(){
		var functions_view = new FunctionsView({From: ''});
		_.each(this.collection.record(), function(contact){contact.clear();});
		for(i=0;i<this.contact_view.length;i++)
		{
			this.contact_view[i].cancella();
			}
		this.contact_view=[];
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

