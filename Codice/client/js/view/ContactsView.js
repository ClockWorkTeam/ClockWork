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
		
		this.childViews = [];
		
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
			this.childViews.push(contact_view);
	},
		
	viewContacts: function(){	
		this.collection.each(this.viewContact);	
	},
	
	destroyContacts: function(){
		
		/*
		var functions_view = new FunctionsView();		
		functions_view.close();
		$('#main').append(this.functions_view.el);
		var chat_view = new ChatView();
		chat_view.close();
		$('#main').append(this.chat_view.el);
		*/
		
		_.each(this.childViews, function(view){view.close();});

		_.each(this.collection.record(), function(contact){contact.clear();});
	},
	
	callIP:function(){
      _.each(this.childViews, function(view){view.close();});
	  if(this.currentFunctions){
        this.currentFunctions.close();
      }
      this.currentFunctions = new FunctionsView({From: 'IP'});
      this.currentFunctions.render();
      $('#main').append(this.currentFunctions.el);
	},
	
    StartConference: function(){
	  _.each(this.childViews, function(view){view.close();});
	  if(this.currentFunctions){
        this.currentFunctions.close();
      }
	  this.currentFunctions = new FunctionsView({From: 'Conf'});
	  this.currentFunctions.render();
	  $('#main').append(this.currentFunctions.el);
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

