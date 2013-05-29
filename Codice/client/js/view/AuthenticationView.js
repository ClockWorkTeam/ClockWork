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
  'communication/ContactsCommunication',
  'model/UserModel',
  'view/ContactsView'
], function($, _, Backbone, authenticationTemplate, AuthenticationCommunication, ContactsCommunication, UserModel, ContactsView){
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
    contacts_view: '',
    //template per il rendering di questa vista 
    authenticationTemplate: _.template(authenticationTemplate),
  
    //funzione di inizializzazione della vista
    initialize: function(){
	    //rendo visibile l'oggetto di invocazione alla funzione render e connect
      _.bindAll(this, 'render', 'connect', 'disconnect');
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

    callBacks: function(){
      return {
        doLogin: function(user, pass, answer, view){
          //se i dati inseriti sono corretti li inserisco nel modello
          view.UserModel = new UserModel({
            username: user,
            password: pass,
            name: answer.name,
            surname: answer.surname
          });
          //aggiorno il template
          $(view.el).html(view.authenticationTemplate({authenticated: true, name: view.UserModel.toJSON().username}));
          //recupero la lista contatti dal server e li metto nel local storage
          ContactsCommunication.fetchContacts(view);
          // visione dei contatti	

        }
      };
    },

    //funzione che tenta il login
    connect: function(){
      var aView = this;
	    //recupero lo username inserito
	    var user = this.$("#user").val();
	    //recupero la password inserita
	    var pass = this.$("#password").val();
	    //chiamo il metodo di comunicazione col server
	    AuthenticationCommunication.checkCredentials(user, pass, aView.callBacks(), this);
    },
	
    //funzione che si occupa di chiudere la sessione con il server
    disconnect: function(){
      AuthenticationCommunication.logout(this.UserModel.toJSON().username);
      //aggiorno il template
      $(this.el).html(this.authenticationTemplate({authenticated: false, signup: false}));
      //cancello la lista dei contatti
      this.contacts_view.unrender();
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
          //se lo username non è già presente nel sistema procedo all'autenticazione
          AuthenticationCommunication.signup(user, pass, name, surname, this.callBacks(), this);
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


