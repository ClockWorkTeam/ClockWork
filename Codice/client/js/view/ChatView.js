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
 'communication/ChatCommunication',
 'text!templates/ChatTemplate.html',
 'collection/TextMessagesCollection'
], function($, _, Backbone,ChatCommunication, ChatTemplate, TextMessagesCollection){
	var ChatView = Backbone.View.extend({
    events:{
	  'click button#Send':'send'
		},
	
    el : $("#chat"),

    ChatTemplate: _.template(ChatTemplate),
  
    collection: TextMessagesCollection,
  
		initialize: function(){
			
			this.listenTo(this.collection, 'all', this.render);
			_.bindAll(this, 'render', 'putMessages', 'putMessage');
			
			
		},
  
		render: function() {	
			if(this.options.userModel!=''){
				$(this.el).html(this.ChatTemplate({ip: this.model.toJSON().IP}));
				this.putMessages();
				}
		},
  
		putMessages:function(){  
			var messages=this.collection.chat_session(this.model.toJSON().username);
			for(var i=0; i<messages.length; i++){
					this.putMessage(messages[i]);
			}
		},
  
		putMessage:function(TextMessageModel){
			
			var node=document.createElement("LI");
			var name=document.createElement("H3");
			if(TextMessageModel.toJSON().source=='sent'){
						name.appendChild(document.createTextNode(this.options.userModel.toJSON().username+": "));
						node.setAttribute('class','sent');
			}else{
						name.appendChild(document.createTextNode(this.model.toJSON().username+": "));
						node.setAttribute('class','received');				
			}
			var message=document.createTextNode(TextMessageModel.toJSON().message);
			node.appendChild(name);
			node.appendChild(message);
			(this.el).getElementsByTagName("UL")[0].appendChild(node);
		},
  
		//invia un messaggio
		send:function(){
						ChatCommunication.send(this.model.toJSON().IP, this.$("#message").val());
			this.collection.add({contact:this.model.toJSON().username, message:this.$("#message").val(), source:'sent'});

			//this.render();
		},
/*		delivered:function(from, message){

			//this.render();
		}
*/ 
 });
 
   ChatView.prototype.close = function(){
    this.remove();
    this.unbind();
  };


 return ChatView;
});


