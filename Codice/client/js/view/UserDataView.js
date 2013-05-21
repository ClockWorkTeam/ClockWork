/*
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
//definizione delle dipendenze
define([
  'jquery',
  'underscore',  
  'backbone',
  'text!templates/UserDataTemplate.html',
  'communication/UserDataCommunication'
], function($, _, Backbone, UserDataTemplate, UserDataCommunication){
  var UserDataView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
	  events: {
      'click button#submitChange': 'checkPassword',
      'click button#reset': 'render',
      'click button#denyChange': 'unrender' 
		},
		
	 el: '#main',
		
    //template per il rendering di questa vista 
    userDataTemplate: _.template(UserDataTemplate),
    
        //funzione di inizializzazione della vista
    initialize: function(){
	    //rendo visibile l'oggetto di invocazione alla funzione render e connect
      _.bindAll(this, 'render', 'unrender');
      //genero la struttura della pagina
      this.render();
		},
		
		 //funzione che effettua la scrittura della struttura della pagina
    render: function() {
      $(this.el).html(this.userDataTemplate(this.model.toJSON()));
    },
		
		unrender:function(){
			this.close();
      $(this.el).html('');
			$('body').append(this.el);
		},

		checkPassword:function(){
			UserDataCommunication.checkPassword(this.model,this.$('#oldPassword').val(), this);
		},
		
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
	 UserDataView.prototype.close = function(){
    this.remove();
    this.unbind();
  };
	return UserDataView;
});
