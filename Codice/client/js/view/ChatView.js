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
	//		_.bindAll(this, 'render', 'putMessages', 'putMessage');
		},
  
		render: function() {
			if(userModel!=''){
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
			if(TextMessageModel.toJSON().fromTo=='to'){
						name.appendChild(document.createTextNode(userModel.toJSON().username+": "));
						node.setAttribute('class','to');
			}else{
						name.appendChild(document.createTextNode(this.model.toJSON().username+": "));
						node.setAttribute('class','from');				
			}
			var message=document.createTextNode(TextMessageModel.toJSON().message);
			node.appendChild(name);
			node.appendChild(message);
			(this.el).getElementsByTagName("UL")[0].appendChild(node);
		},
  
		//invia un messaggio
		send:function(){
			this.collection.add({recipient:this.model.toJSON().username, message:this.$("#message").val(),fromTo:'to'});
		//	ChatCommunication.send(this.model.toJSON().IP, this.$("#message").val());
			this.render();
		},
		delivered:function(from, message){
			this.collection.add({recipient:from, message:message ,fromTo:'from'});			
			this.render();
		}
 
 });
 
   ChatView.prototype.close = function(){
    this.remove();
    this.unbind();
  };


 return ChatView;
});


