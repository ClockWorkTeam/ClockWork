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
 'text!templates/ChatTemplate.html'
], function($, _, Backbone, ChatTemplate,TextMessageModel){
 var ChatView = Backbone.View.extend({
//si occupa di legare gli eventi ad oggetti del DOM
 events:{
		'click button#Send':'send'
	},
//indica in quale parte del DOM gestirà 
  el : $("#chat"),
  ChatTemplate: _.template(ChatTemplate),
//funzione di inizializzazione dell'oggetto
  initialize: function(){
    _.bindAll(this, 'render'); 
    this.render();
  },
//funzione che effettua la scrittura della struttura della pagina
  render: function() {
    $(this.el).html(this.ChatTemplate({message: true, messages: this.model.toJSON().messages}))
    
  },
  
  send:function(){
	  this.model.set({messages:this.$("#message").val()});
	  this.render();
  }
//funzione che si occupa della connessione col server
  
  
 });

 return ChatView;
});


