/*
 * Nome:AuthenticationView.js
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
 
 //definizione delle dipendenze
define([
 'jquery',
 'underscore',  
 'backbone',
 'text!templates/AuthenticationTemplate.html',
 'communication/AuthenticationCommunication',
 'communication/ContactCommunication',
 'model/UserModel',
  'view/ContactsView',
], function($, _, Backbone, authenticationTemplate, AuthenticationCommunication, ContactsCommunication, UserModel, ContactsView){
 var AuthenticationView = Backbone.View.extend({
//si occupa di legare gli eventi ad oggetti del DOM
	 events: {
      'click button#login': 'connect',
      'click button#logout': 'disconnect',
      'click button#signup':'signup',
      'click button#sign':'sign',
      'click button#deny':'deny'
    },
//indica in quale parte del DOM gestirà 
  el: $("#authentication"),
  cview: "",
  authenticationTemplate: _.template(authenticationTemplate),
//funzione di inizializzazione dell'oggetto
  initialize: function(){
    _.bindAll(this, 'render'); 
    this.render();
    cview = new ContactsView();
  },
//funzione che effettua la scrittura della struttura della pagina
  render: function() {
    $(this.el).html(this.authenticationTemplate({authenticated: false, signup: false}))
    
  },
//funzione che si occupa della connessione col server
  connect: function(){
	  //esempio di come dovrebbe essere modificata la pagina dinamicamente
	  var user = this.$("#user").val();
	  var pass = this.$("#password").val();
	  var acomm = new AuthenticationCommunication();
	  var answer=acomm.checkCredentials(user, pass);
	  if(answer.ans)
	  {
		 this.UserModel=new UserModel({
			    username: user,
				password: pass,
				name: answer.name,
				surname: answer.surname
			});
	    $(this.el).html(this.authenticationTemplate({authenticated: true, name: this.UserModel.toJSON().username}));

	    var ccomm = new ContactsCommunication(this.collection);
	    ccomm.fetchContacts();

			this.collection.fetch();

// visione dei contatti	
			cview.render();
		}
			  //dobbiamo aggiungere la parte di interfacciamento con il server
	 },

		
 //funzione che si occupa di chiudere la sessione con il server
  disconnect: function(){
	  $(this.el).html(this.authenticationTemplate({authenticated: false, signup: false}))
	  cview.unrender();
  },
  
  signup: function(){
	  $(this.el).html(this.authenticationTemplate({authenticated: false, signup: true}));
  },
  
  sign: function(){
	  var user = this.$("#user").val();
	  var pass = this.$("#password").val();
	  var pass2 = this.$("#password2").val();
	  var name = this.$("#name").val();
	  var surname = this.$("#surname").val();
	  if(user!='' && pass!='' && name!='' && surname!=''){
		if(pass==pass2){
		
			var acomm = new AuthenticationCommunication();
			if(acomm.signup(user, pass, name, surname)){
				this.UserModel=new UserModel({
					username: user,
					password: pass,
					name: name,
					surname: surname
				});
				$(this.el).html(this.authenticationTemplate({authenticated: true, signup: false, name:user}));
				var ccomm = new ContactsCommunication(this.collection);
				ccomm.fetchContacts();

				this.collection.fetch();

// visione dei contatti	
				cview.render();
			}
			else
			{
				alert('username già presente');
				}
		}
		else{
		  alert('le password non coincidono');
		}
	}
	else{
		 alert('Mancano campi');
	}
  },
  
  deny: function(){
	  this.render();
  }    
  
 });

 return AuthenticationView;
});


