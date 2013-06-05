/**
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
 'communication/ContactsCommunication',
 'text!templates/SideTemplate.html',
 'collection/ContactsCollection'
], function($, _, Backbone, ContactView, FunctionsView, ContactsCommunication, SideTemplate, ContactsCollection){
  var SideView = Backbone.View.extend({
		
    el: $("#sidebar"),
    
    template: _.template(SideTemplate),
    
    collection: ContactsCollection,
    
    myModel : '',
    authenticationView:'',
 
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */    
    events:{
		'click button#callIP' : 'callIP',
		'click button#conference' : 'StartConference'
    },

    /**
     * funzione di inizializzazione dell'oggetto
     */
	
    initialize:function(){
			_.bindAll(this, 'render', 'unrender', 'viewContact');
			this.listenTo(this.collection, 'add', this.render);
			document.addEventListener('acceptCall',acceptCall,false);
			var sideBarView=this;
 			function acceptCall(event){
				sideBarView.setCall(event.detail.contact,event.detail.type);
			};	
			this.$el.html(this.template({logged: false}));
			this.childViews = [];
		},

    /**
     * si occupa di prelevare i contatti una volta fatto il login
     */

		getContacts:function(view){
			this.myModel=view.userModel;
			this.authenticationView=view;
			ContactsCommunication.fetchContacts(this.myModel.toJSON().username);
			this.$el.html(this.template({logged: true}));
		},

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
		
		render: function (){
			this.viewContact(this.collection.at(this.collection.length-1));
		},
    
    /**
     * funzione che si occupa di inizializzare e rendere visibile ogni contatto presente nella lista
     */
    
		viewContact: function(ContactModel){
			var contactView = new ContactView({dom : "sidebar", model: ContactModel, userModel: this.myModel, callback: this });
			this.childViews.push(contactView);
			this.$("#contacts").append(contactView.render().el);
			
		},
    
    /**
     * si occupa di disabilitare la vista quando si effettua il logout
     */
    
		unrender: function (){
			this.stopListening(this.collection, 'all', this.render);
			$(this.el).html(this.template({logged: false}));
			this.destroyContacts();
		},

    /**
     * si occupa di chiudere le viste di ogni contatto presente
     */

		destroyContacts: function(){
			_.each(this.childViews, function(view){view.close();});
			_.each(this.collection.record(), function(contact){contact.clear();});
		},
	
    /**
     * si occupa di effettuare chiamate IP
     */
    callIP:function(){
      _.each(this.childViews, function(view){view.close();});
      if(this.currentFunctions){
        this.currentFunctions.close();
      }
      this.currentFunctions = new FunctionsView({From: 'IP'});
      this.currentFunctions.render();
      $('#main').prepend(this.currentFunctions.el);
    },

    /**
     * si occupa di effettuare conferenze
     */
    StartConference: function(){
	  _.each(this.childViews, function(view){view.close();});
	  if(this.currentFunctions){
        this.currentFunctions.close();
      }
	  this.currentFunctions = new FunctionsView({From: 'Conf'});
	  this.currentFunctions.render();
	  $('#main').prepend(this.currentFunctions.el);
	  this.collection.each(this.listContacts);
	},
	
    /**
     * si occupa di gestire la lista dei contatti da selezionare per una videoconferenza
     */
    listContacts: function(ContactModel){
      var contactView = new ContactView({dom : '', model: ContactModel});
      this.$("#optionContacts").append(contactView.render().el);
    },
    /**
     * si occupa di chiudere viste inattese
     */
    closeOtherContacts: function(contact){
      if(contact && this.authenticationView.userDataView){
        this.authenticationView.userDataView.unrender();
        this.authenticationView.userDataView=undefined;
      }
      _.each(this.childViews, 
			function(view){
        if(view.currentFunctions){
          if(view.model.toJSON().username!=contact){
            if(view.currentFunctions.callView && view.currentFunctions.callView.calling){
              if(view.currentFunctions.chatView){
                view.currentFunctions.chatView.close();
                view.currentFunctions.chatView=undefined;
							}
						}else{
							view.currentFunctions.close();
							view.currentFunctions=undefined;
						}
					}
				}
			});
			if(this.currentFunctions){ //callIP o conference
				this.currentFunctions.close();
				this.currentFunctions=undefined;
			}
    },

    /** 
     * metodo invoca allo scopo di capire quale utente sta chiamando
     */

    setCall : function(contact,type){  
      _.each(this.childViews, 
      function(view){
        if(view.model.toJSON().username==contact){
          view.createCall(type);
        }
      });
    }
    
  });

  return SideView;
  
});

