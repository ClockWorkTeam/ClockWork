/*
 * Nome:ChatView.js
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
 'text!templates/ChatTemplate.html',
 'collection/TextMessagesCollection'
], function($, _, Backbone, ChatTemplate, TextMessagesCollection){
 var ChatView = Backbone.View.extend({
//si occupa di legare gli eventi ad oggetti del DOM
 events:{
		'click button#Send':'send'
	},
	
//indica in quale parte del DOM gestirà 
  el : $("#chat"),
  
  ChatTemplate: _.template(ChatTemplate),
  
  collection: TextMessagesCollection,
  
//funzione di inizializzazione dell'oggetto
  initialize: function(){
    _.bindAll(this, 'render', 'putMessages', 'putMessage'); 
    this.render();
  },
  
//funzione che effettua la scrittura della struttura della pagina
  render: function() {
	 this.collection.fetch();
	  this.putMessages();
    $(this.el).html(this.ChatTemplate({end: true}))
    
  },
  
  putMessages:function(){
		this.collection.each(this.putMessage);
  },
  
  putMessage:function(TextMessageModel){
	  //if(TextMessageModel.toJSON().recipient == this.model.toJSON().username)
	  //alert(TextMessageModel.toJSON().messages);
	  //$(this.el).append(this.ChatTemplate({end: false, messages:TextMessageModel.toJSON().messages}));
  },
  send:function(){
	  //this.collection.add({recipient:this.model.toJSON().username, messages:this.$("#message").val()})
	  //this.render();
  }
//funzione che si occupa della connessione col server
  
  
 });

 return ChatView;
});


