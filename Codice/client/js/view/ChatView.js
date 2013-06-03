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
], function($, _, Backbone, ChatCommunication, ChatTemplate, TextMessagesCollection){
	var ChatView = Backbone.View.extend({
    events:{
			'click button#Send':'send',
			'keyup #compose textarea':'pressEnter',
		},
	
	  pressEnter:function(event){
			if(event.keyCode == 13){
				var val=(this.el).getElementsByTagName("textarea")[0].value;
				(this.el).getElementsByTagName("textarea")[0].value=val.substring(0, val.length - 1);				
				this.send();
			}
		},
	
    el : $("#chat"),

    chatTemplate: _.template(ChatTemplate),
  
    collection: TextMessagesCollection,
  
		initialize: function(){
			this.listenTo(this.collection, 'all', this.render);
			_.bindAll(this, 'render', 'send');
		},
 
		render: function(){	
			if(this.options.userModel!=''){
				$(this.el).html(this.chatTemplate({ip: this.model.toJSON().IP}));
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
			}else if(TextMessageModel.toJSON().source=='received'){
						name.appendChild(document.createTextNode(this.model.toJSON().username+": "));
						node.setAttribute('class','received');				
			}else if(TextMessageModel.toJSON().source=='notsent'){
						name.appendChild(document.createTextNode(this.options.userModel.toJSON().username+": "));
						node.setAttribute('class','notsent');				
			}
			var message=document.createTextNode(TextMessageModel.toJSON().message);
			node.appendChild(name);
			node.appendChild(message);
			(this.el).getElementsByTagName("UL")[0].appendChild(node);
		
		},
  
		//invia un messaggio
		send:function(){
			ChatCommunication.send(this.model.toJSON().username, (this.el).getElementsByTagName("textarea")[0].value);
			this.collection.add({contact:this.model.toJSON().username, message:(this.el).getElementsByTagName("textarea")[0].value, source:'sent'});
			(this.el).getElementsByTagName("textarea")[0].value='';
		},
		
		unrender:function(){
			_.each(this.collection.chat_session(this.model.toJSON().username), function(message){message.clear();});
			this.close();
		}

 });
 
   ChatView.prototype.close = function(){
    this.remove();
    this.unbind();
  };


 return ChatView;
});


