/**
 * Nome:ChatView.js
 * Package: View
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
 'communication/ChatCommunication',
 'text!templates/ChatTemplate.html',
 'text!templates/ComposeTemplate.html',
 'collection/TextMessagesCollection'
], function($, _, Backbone,ChatCommunication, ChatTemplate, ComposeTemplate, TextMessagesCollection){
	var ChatView = Backbone.View.extend({
    events:{
	  'click button#Send':'send'
		},
	
    el : $("#chat"),

    template: _.template(ChatTemplate),
  
    collection: TextMessagesCollection,
    /**
     * funzione di inizializzazione dell'oggetto
     */
		initialize: function(){
			this.listenTo(this.collection, 'all', this.render);
			_.bindAll(this, 'render', 'putMessages', 'putMessage');
			if(this.options.userModel!='' && this.model.toJSON().IP!="0"){
			//	$(this.el)[0].childNodes[3].innerHTML=((_.template(ComposeTemplate))());
			}
		},
    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
		render: function() {	
			if(this.options.userModel!=''){
				//$(this.el)[0].childNodes[1].innerHTML=(this.ChatTemplate({ip: this.model.toJSON().IP}));
				this.putMessages();
			}
		},
    /**
     * funzione che si occupa di scorrere tutti i messaggi dell'utente selezionato e visualizzarli a video
     */
		putMessages:function(){  
			var messages=this.collection.chat_session(this.model.toJSON().username);
			for(var i=0; i<messages.length; i++){
					this.putMessage(messages[i]);
			}
		},
    
    /**
     * funzione che si occupa di visualizare un messaggio contenuto all'interno della collection
     */
		putMessage:function(TextMessageModel){
			var node=document.createElement("LI");
			var name=document.createElement("H3");
			if(TextMessageModel.toJSON().source=='sent'){
						name.appendChild(document.createTextNode(this.options.userModel.toJSON().username+": "));
						node.setAttribute('class','sent');
			}else if(TextMessageModel.toJSON().source=='received'){
						name.appendChild(document.createTextNode(this.model.toJSON().username+": "));
						node.setAttribute('class','received');				
			}
			var message=document.createTextNode(TextMessageModel.toJSON().message);
			node.appendChild(name);
			node.appendChild(message);
			(this.el).getElementsByTagName("UL")[0].appendChild(node);
		
		},
  
		/**
     * funzione che si occupa di rendere visibile un messaggio contenuto all'interno della collection
     */
		send:function(){
						ChatCommunication.send(this.model.toJSON().username, (this.el).getElementsByTagName("textarea")[0].value);
			this.collection.add({contact:this.model.toJSON().username, message:(this.el).getElementsByTagName("textarea")[0].value, source:'sent'});
			(this.el).getElementsByTagName("textarea")[0].value='';
		},

 });
 
  /**
   * si occupa di chiudere la vista della classe
   */
 
   ChatView.prototype.close = function(){
    this.remove();
    this.unbind();
  };


 return ChatView;
});


