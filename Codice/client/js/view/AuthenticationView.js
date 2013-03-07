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
], function($, _, Backbone, authenticationTemplate, AuthenticationCommuncation, ContactsCommunication, UserModel, ContactsView){
 var AuthenticationView = Backbone.View.extend({
//si occupa di legare gli eventi ad oggetti del DOM
	 events: {
      'click button#login': 'connect',
      'click button#logout': 'disconnect',
      'click button#signup': 'view_signup',
      'click button#sign': 'signup',
      'click button#deny': 'deny'
    },
    
//indica quale parte del DOM gestirà 
  el: $("#authentication"),

//lega la lista dei contatti e i bottoni di chiamata IP e teleconferenza a questa vista  
  contacts_view: "",
 
//template per il rendering di questa vista 
  authenticationTemplate: _.template(authenticationTemplate),
  
//funzione di inizializzazione della vista
  initialize: function(){
	//rendo visibile l'oggetto di invocazione alla funzione render
    _.bindAll(this, 'render');
    //genero la struttura della pagina
    this.render();
    //creo la vista dei contatti
    this.contacts_view = new ContactsView();
  },
  
//funzione che effettua la scrittura della struttura della pagina
  render: function() {
	//applico il template all'elemento base (el)
    $(this.el).html(this.authenticationTemplate({authenticated: false, signup: false}))  
  },
  
//funzione che tenta il login
  connect: function(){
	  //recupero lo username inserito
	  var user = this.$("#user").val();
	  //recupero la password inserita
	  var pass = this.$("#password").val();
	  //chiamo il metodo di comunicazione col server
	  var authentication_communication = new AuthenticationCommunication();
	  var answer = authentication_communication.checkCredentials(user, pass);
	  //se i dati inseriti sono corretti li inserisco nel modello
	  if(answer.ans)
	  {
		 this.UserModel = new UserModel({
			    username: user,
				password: pass,
				name: answer.name,
				surname: answer.surname
			});
		  //aggiorno il template
		  $(this.el).html(this.authenticationTemplate({authenticated: true, name: this.UserModel.toJSON().username}));
		  //recupero la lista contatti dal server e li metto nel local storage
		  var contacts_communication = new ContactsCommunication(this.collection);
		  contacts_communication.fetchContacts();
		  //recupero i contatti dal local storage e li metto nella collection
		  this.collection.fetch();
		  // visione dei contatti	
		  contacts_view.render();
	  }
			  //dobbiamo aggiungere la parte di interfacciamento con il server
	 },

		
 //funzione che si occupa di chiudere la sessione con il server
  disconnect: function(){
	  //aggiorno il template
	  $(this.el).html(this.authenticationTemplate({authenticated: false, signup: false}))
	  //cancello la lista dei contatti
	  contacts_view.unrender();
  },
  
  //visualizzo il form di registrazione
  view_signup: function(){
	  $(this.el).html(this.authenticationTemplate({authenticated: false, signup: true}));
  },
  
  //tento di effettuare la registrazione
  signup: function(){
	  //recupero i valori inseriti dall'utente
	  var user = this.$("#user").val();
	  var pass = this.$("#password").val();
	  var pass2 = this.$("#password2").val();
	  var name = this.$("#name").val();
	  var surname = this.$("#surname").val();
	  //se tutti i campi sono stai riempiti
	  if(user != '' && pass != ''){
		//controllo se la password e la sua conferma corrispondono
		if(pass == pass2){
			//invio la richiesta di registrazione al server
			var authentication_communication = new AuthenticationCommunication();
			//se lo username non è già presente nel sistema procedo all'autenticazione
			if(authentication_communication.signup(user, pass, name, surname)){
				//inserisco i dati nel modell
				this.UserModel=new UserModel({
					username: user,
					password: pass,
					name: name,
					surname: surname
				});
				//aggiorno il template
				$(this.el).html(this.authenticationTemplate({authenticated: true, signup: false, name:user}));
				//recupero la lista contatti dal server e la salvo nel local storage
				var contacts_communication = new ContactsCommunication(this.collection);
				contacts_communication.fetchContacts();
				//genero la collezione dal local storage
				this.collection.fetch();
				//visualizzo i contatti	
				contacts_view.render();
			}
			else
			{
				//errore nel caso lo username inserito sia già presente nel sistema
				alert('Username non disponibile');
			}
		}
		else{
		  //errore nel caso la password e la sua conferma non corrispondano
		  alert('Le password inserite non coincidono');
		}
	}
	else{
		 //errore nel caso in cui manchino dei campi obbligatori
		 alert('Non hai compilato tutti i campi obbligatori');
	}
  },
  
  //funzione per annullare la compilazione della registrazione
  deny: function(){
	  this.render();
  }    
  
 });

 return AuthenticationView;
});


