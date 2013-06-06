/**
 * Nome:UserDataView.js
 * Package: View
 * Autore: Palmisano Maria Antonietta
 * Data: 2013/05/10
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+-----------------------+
 * | Data   | Programmatore |     Modifiche         |
 * +--------+---------------+-----------------------+
 * | 130516 |    FV         | + pulsante reset      |
 * +--------+---------------+-----------------------+
 * | 130510 |    PMA        | + creazione documento |
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
      _.bindAll(this, 'render', 'unrender');
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
