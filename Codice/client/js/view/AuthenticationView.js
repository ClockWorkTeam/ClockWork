/**
 * Nome:AuthenticationView.js
 * Package: View
 * Autore: Valentino Furlan
 * Data: 2013/05/18
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+-----------------------+
 * | Data   | Programmatore |     Modifiche         |
 * +--------+---------------+-----------------------+
 * | 130518 |    PMA        | + funzione che tenta  |
 * |        |               |   login               |
 * |        |               | + funzione che tenta  |
 * |        |               |   logout              |
 * +--------+---------------+-----------------------+
 * | 130518 |    FV         | + creazione documento |

 */
define([
  'jquery',
  'underscore',
  'backbone',
  'view/SideView',
  'view/UserDataView',
  'text!template/AuthenticationTemplate.html',
  'communication/AuthenticationCommunication',
  'model/UserModel'
], function($, _, Backbone, SideView, UserDataView, authenticationTemplate, AuthenticationCommunication, UserModel){

  var AuthenticationView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events: {
      'keyup input#password:last-of-type':'pressEnter',
      'keyup input#password2':'pressEnter',
      'keyup input#name':'pressEnter',
      'keyup input#surname':'pressEnter',
      'click button#login': 'connect',
      'click button#logout': 'disconnect',
      'click button#signup': 'viewSignup',
      'click button#sign': 'signup',
      'click button#deny': 'deny',
      'click button#edit': 'editProfile'
    },
    /**
     * richiama il metodo connect nel caso si sia sulla password durante la fase di login
     */
    pressEnter:function(event){
      if(event.keyCode == 13){
				if(event.target.id==='password'){
					this.connect();
				}else if((event.target.id==='password2')||(event.target.id==='name')||(event.target.id==='surname')){
					this.signup();
				}
      }
    },
    el: $('#authentication'),
		userDataView: undefined,
		userModel:null,

    template: _.template(authenticationTemplate),

    contactsView:'',

    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      _.bindAll(this, 'render', 'connect', 'disconnect');
      this.render();
      this.contactsView = new SideView();
    },

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function() {
      $(this.el).html(this.template({authenticated: false, signup: false}));
    },

    callBacks: function(){
      return {
        doLogin: function(user, pass, answer, view){
          /**
           * se i dati inseriti sono corretti li inserisco nel modello
           */
          view.userModel = new UserModel({
            username: user,
            password: pass,
            name: answer.name,
            surname: answer.surname
          });
          $(view.el).html(view.template({authenticated: true, name: view.userModel.toJSON().username}));
          view.contactsView.getContacts(view);
        }
      };
    },

    /**
     * funzione che tenta il login
     */
    connect: function(){
      var user = this.$("#user").val();
      var pass = this.$("#password").val();
      AuthenticationCommunication.checkCredentials(user, pass, this.callBacks(), this);
    },

    /**
     * funzione che si occupa di chiudere la sessione con il server
     */
    disconnect: function(){
      AuthenticationCommunication.logout();
      $(this.el).html(this.template({authenticated: false, signup: false}));
      this.contactsView.unrender();
      if(this.userDataView){
        this.userDataView.unrender();
        this.userDataView=undefined;
      }
    },

    /**
     * visualizzo il form di registrazione
     */
    viewSignup: function(){
      $(this.el).html(this.template({authenticated: false, signup: true}));
    },

    /**
     * tento di effettuare la registrazione
     */
    signup: function(){
      /**
      * recupero le informazioni inserite dall'utente
      */
      var user = this.$("#user").val();
      var pass = this.$("#password").val();
      var pass2 = this.$("#password2").val();
      var name = this.$("#name").val();
      var surname = this.$("#surname").val();
      /**
       * se tutti i campi sono stai riempiti
       */
      if(user != '' && pass != ''){
				/**
         * controllo username valida
         */
				if(user.match(/[^\w]/)){
          	alert('Username può contenere solo lettere, numeri e underscore');
        }else{
					/**
					 * controllo se la password e la sua conferma corrispondono
					 */
					if(pass == pass2){
						//var authentication_communication = new AuthenticationCommunication();
						/**
						 * invio la richiesta di registrazione al server
						 * se lo username non è già presente nel sistema procedo all'autenticazione
						 */
						AuthenticationCommunication.signup(user, pass, name, surname, this.callBacks(), this);
					}else{
						/**
						* errore nel caso la password e la sua conferma non corrispondano
						*/
						alert('Le password inserite non coincidono');
					}


				}
      }else{
         /**
          * errore nel caso in cui manchino dei campi obbligatori
          */
         alert('Non hai compilato tutti i campi obbligatori');
      }
    },

    /**
     * funzione per annullare la compilazione della registrazione
     */
    deny: function(){
      this.render();
    },

    editProfile: function(){
      this.contactsView.closeOtherContacts();
      if(this.userDataView){
        this.userDataView.unrender();
      }
      this.userDataView =new UserDataView({model: this.userModel});
    }
  });
  return AuthenticationView;
});


