/**
 * Nome:UserDataView.js
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
  'text!templates/UserDataTemplate.html',
  'communication/UserDataCommunication'
], function($, _, Backbone, UserDataTemplate, UserDataCommunication){
  var UserDataView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
	  events: {
      'click button#submitChange': 'checkPassword',
      'click button#reset': 'render',
      'click button#denyChange': 'unrender' 
		},
		
    el: '#main',
		
    template: _.template(UserDataTemplate),

    /**
     * funzione di inizializzazione dell'oggetto
     */
         
    initialize: function(){
	    //rendo visibile l'oggetto di invocazione alla funzione render e connect
      _.bindAll(this, 'render', 'unrender');
      //genero la struttura della pagina
      this.render();
		},
		
    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
    },

    /**
     * funzione che si occupa di rimuovere la struttura della vista dalla pagina
     */		
		unrender:function(){
			this.close();
      $(this.el).html('');
			$('body').append(this.el);
		},

    /**
     * funzione che si occupa di verificare se abbiamo inserito correttamente 
     */
		checkPassword:function(){
			UserDataCommunication.checkPassword(this.model,this.$('#oldPassword').val(), this);
		},
		
    /**
     * funzione che si occupa di accettare i nuovi dati e di inviarli per essere processati
     */        
		callBacks: function(){
      return {
        changeData: function(model, view){
					if($('#password').val()=== $('#password2').val()){
						UserDataCommunication.changeData(model,$('#name').val(),$('#surname').val(), $('#password').val(), view);
					}else{
						alert('le due password inserite non coincidono');
					}
        }
       };
    },

	});
  /**
   * si occupa di chiudere la vista
   */  
  UserDataView.prototype.close = function(){
    this.remove();
    this.unbind();
  };
  
	return UserDataView;
});
