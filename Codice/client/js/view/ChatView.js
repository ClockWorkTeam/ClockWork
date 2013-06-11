/**
 * Nome:ChatView.js
 * Package: View
 * Autore: Palmisano Maria Antonietta
 * Data: 2013/05/17
 * Versione: 1.0
 *
 * Modifiche:
* +--------+---------------+----------------------------+
 * | Data   | Programmatore |     Modifiche             |
 * +--------+---------------+---------------------------+
 * | 130519 |    PMA        | + metodo che lega il tasto|
 * |        |               |   invia al pulsante Enter |
 * |        |               |   della tastiera          |
 * +--------+---------------+---------------------------+
 * | 130517 |    PMA        | + creazione documento     |

 */

define([
 'jquery',
 'underscore',
 'backbone',
 'communication/ChatCommunication',
 'text!templates/ChatTemplate.html',
 'collection/TextMessagesCollection'
], function($, _, Backbone, ChatCommunication, ChatTemplate, TextMessagesCollection){
  var ChatView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events:{
      'click button#Send':'send',
      'keyup #compose textarea':'pressEnter',
    },
    /**
     * si occupa di legare il tasto di invia messaggio al pulsante Invio della tastiera
     */
    pressEnter:function(event){
      if(event.keyCode == 13){
        var val=(this.el).getElementsByTagName("textarea")[0].value;
        (this.el).getElementsByTagName("textarea")[0].value=val.substring(0, val.length - 1);
        this.send();
      }
    },

    el : $('#chat'),

    template: _.template(ChatTemplate),

    collection: TextMessagesCollection,

    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      this.listenTo(this.collection, 'all', this.render);
      _.bindAll(this, 'render', 'send');
    },

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(){
      if(this.options.userModel!=''){
        $(this.el).html(this.template({ip: this.model.toJSON().IP}));
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
      }else if(TextMessageModel.toJSON().source=='notsent'){
        name.appendChild(document.createTextNode(this.options.userModel.toJSON().username+": "));
        node.setAttribute('class','notsent');
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

		/**
     * funzione che si occupa di rendere visibile un messaggio contenuto all'interno della collection
     */
    unrender:function(){
      _.each(this.collection.chat_session(this.model.toJSON().username), function(message){message.clear();});
      this.close();
    }

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
