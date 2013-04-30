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

    //indico il template da utilizzare
    ChatTemplate: _.template(ChatTemplate),
  
    //imposto la collezione per generare la chat
    collection: TextMessagesCollection,
  
//funzione di inizializzazione dell'oggetto
  initialize: function(){
	//lega l'oggetto di invocazione alle funzioni render, putMessages e putMessage
    _.bindAll(this, 'render', 'putMessages', 'putMessage');
    //visualizza la struttura della chat
    this.render();
  },
  
//funzione che effettua la scrittura della struttura della pagina - da cambiare
  render: function() {
	 //visualizza i messaggi
	 this.putMessages();
	 //aggiorna il template
     $(this.el).html(this.ChatTemplate({messages: '', ip: this.options.ip}))
    
  },
  
  //visualizza i messaggi - da cambiare
  putMessages:function(){  
	this.collection.each(this.putMessage);
	//$(this.el).html(this.ChatTemplate({messages: this.collection.chat_session(this.model.get('recipient'))}))
  },
  
  //visualizza il singolo messaggio - da cambiare
  putMessage:function(TextMessageModel){
	  //if(TextMessageModel.toJSON().recipient == this.model.toJSON().username)
	  //alert(TextMessageModel.toJSON().messages);
	  //$(this.el).append(this.ChatTemplate({end: false, messages:TextMessageModel.toJSON().messages}));
  },
  
  //invia un messaggio
  send:function(){
	  this.collection.add({recipient:this.model.toJSON().username, messages:this.$("#message").val()})
	  this.render();
  }
  
 });
 
   ChatView.prototype.close = function(){
    this.remove();
    this.unbind();
  };


 return ChatView;
});


