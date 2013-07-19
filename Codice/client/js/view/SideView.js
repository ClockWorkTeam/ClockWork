/**
 * Nome:ConactsView.js
 * Package: View
 * Autore: Palmisano Maria Antonietta
 * Data: 2013/05/12
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+---------------------------+
 * | Data   | Programmatore |     Modifiche             | 
 * +--------+---------------+---------------------------+
 * | 130712 |    BG         | + Medoto setCallConference| 
 * |        |               | # Aggiunto in initialize  | 
 * |        |               |   il listener             | 
 * |        |               |   acceptCallConference    | 
 * +--------+---------------+---------------------------+
 * | 130710 |    BG         | + modifica  metodo        | 
 * |        |               |   StartConference         | 
 * +--------+---------------+---------------------------+
 * | 130524 |    FV         | + metodo che chiude le    | 
 * |        |               |   viste di ogni           | 
 * |        |               |   contatto presente       | 
 * +--------+---------------+---------------------------+
 * | 130512 |    PMA        | + creazione documento     | 
 * ------------------------------------------------------
 */
 
 
define([
 'jquery',
 'underscore',
 'backbone',
 'view/ContactView',
 'view/FunctionsView',
  'view/CallView',
 'communication/ContactsCommunication',
 'text!template/SideTemplate.html',
 'collection/ContactsCollection'
], function($, _, Backbone, ContactView, FunctionsView, CallView, ContactsCommunication, SideTemplate, ContactsCollection){
  var SideView = Backbone.View.extend({

    el: $('#sidebar'),

    template: _.template(SideTemplate),

    collection: ContactsCollection,

    myModel : '',
    authenticationView:'',
    conference:'',

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
      this.conference=false;
			_.bindAll(this, 'render', 'unrender', 'viewContact');
			this.listenTo(this.collection, 'add', this.render);
			document.addEventListener('acceptCall',acceptCall,false);
      document.addEventListener('acceptCallConference',acceptCallConference,false);
			var sideBarView=this;
 			function acceptCall(event){
				sideBarView.setCall(event.detail.contact,event.detail.type);
			};
      function acceptCallConference(event){
				sideBarView.setCallConference(event.detail.contact,event.detail.type);
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
			ContactsCommunication.fetchContacts();
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
     // this.closeConference();
     this.conference=false;
     
      if(this.currentFunctions){
        this.currentFunctions.close();
      }
			$(this.el).html(this.template({logged: false}));
			this.destroyContacts();
     // this.closeOtherContacts();
		},

    /**
     * si occupa di chiudere le viste di ogni contatto presente
     */

		destroyContacts: function(){
			_.each(this.childViews, function(view){view.close();});
			_.each(this.collection.record(), function(contact){contact.destroy();});
		},

    /**
     * si occupa di effettuare chiamate IP
     */
    callIP:function(){
      _.each(this.childViews, function(view){view.close();});
      if(!this.currentFunctions){
        this.currentFunctions = new FunctionsView({From: 'IP'});
      }
      this.currentFunctions.render();
      $('#main').prepend(this.currentFunctions.el);
    },

    /**
     * si occupa di effettuare conferenze
     */
    StartConference: function(){
      if(this.conference==true){
        this.currentFunctions.conference(null,null);
      }else{
        _.each(this.childViews, function(view){
          view.close();
        });
        if(!this.currentFunctions){
          this.currentFunctions = new FunctionsView({From: 'Conf', callback: this});
        }
        this.currentFunctions.render();
        $('#main').prepend(this.currentFunctions.el);
        this.collection.each(this.listContacts);
      }
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
      console.log('closeothercontact');
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
			if(this.currentFunctions && this.conference==false){ //callIP o conference
				this.currentFunctions.close();
				this.currentFunctions=undefined;
			}
    },

    /**
     * metodo invocato allo scopo di capire quale utente sta chiamando
     * e generare una chiamata con esso
     */

    setCall : function(contact,type){
      var trovato=false;
      var j=0;
      if(contact.charAt(0)=='/'){
        trovato=true;
      }
      if(trovato==false){
        _.each(this.childViews,
        function(view){
          
          if(view.model.toJSON().username==contact){
            view.createCall(type);
          }
        });
      }else{
        this.closeOtherContacts();
      
        this.currentFunctions = new FunctionsView({From: 'IP'});  
        this.currentFunctions.callView=new CallView({FunctionsView:this.currentFunctions});
    
        this.currentFunctions.callView.render(false, type ,contact);
        
        $('#main').prepend(this.currentFunctions.el);
        }
    },
    
    /**
     * metodo invocato allo scopo di capire quale utente sta chiamando
     * e generare una conferenza con esso
     */
    setCallConference : function(contact,type){
      this.conference=true;
      var sideView=this;
      _.each(this.childViews,
      function(view){
        if(view.model.toJSON().username==contact){
          view.createCallConference(type,contact,sideView);
          sideView.currentFunctions=view.currentFunctions;
        }
      });
    },
    
    setConference : function(){
      this.conference=true;
    },
    
    closeConference : function(){
      console.log("chiudo la conferenza");
      this.conference=false;
      this.closeOtherContacts();
    }

  });

  return SideView;

});

