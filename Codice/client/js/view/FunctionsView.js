/**
 * Nome: FunctionsView.js
 * Package: view
 * Autore: Furlan Valentino
 * Data: 2013/05/20
 * Versione:1.0
 *
 * Modifiche:
 * +--------+---------------+-------------------------+
 * | Data   | Programmatore |     Modifiche           |
 * +--------+---------------+-------------------------+
 * | 130710 |    BG         | + creazione metodo      | 
 * |        |               |   conference            | 
 * +--------+---------------+-------------------------+
 * | 130523 |    FV         | + metodo che inizializza| 
 * |        |               |   la chat               | 
 * +--------+---------------+-------------------------+ 
 * | 130520 |    FV         | + creazione documento   | 

 */

//definizione delle dipendenze
define([
 'jquery',
 'underscore',
 'backbone',
 'view/CallView',
 'view/RecordMessageView',
  'view/ChatView',
 'text!template/FunctionsTemplate.html'
], function($, _, Backbone, CallView, RecordMessageView,  ChatView, FunctionsTemplate){

  var FunctionsView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events:{
      'click button#dataContact':'viewDataContact',
      'click button#sendVideoText':'sendVideoText',
      'click button#call':'audiocall',
      'click button#video':'videocall',
      'click input#record' : 'record',
      'click button#startConference' : 'conference',
    },

    el : $('#content'),
    
    callView:'',
    
    recordMessageView:'',

    template : _.template(FunctionsTemplate),

    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      this.callView=null;
      if(!this.options.From){
        this.listenTo(this.model, 'change', this.render);
      }
      _.bindAll(this, 'render');
    },
    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(){
      
    /**
     * se si è già in chiamata con la persona selezionata si carica direttamente la vista della
     * CallView senza caricare quella della FunctionView altrimenti si andrà a generare quest'ultima
     */
      if(this.callView){
        if(this.model.toJSON().IP==='0'){
          this.forceClose();
        }else{
          this.startChat();
          this.callView.render(null,null, this.model.toJSON().username);
        }
      }else{
        /**
         * controllo atto a verificare se si sta eseguendo una FunctionView di un utente presente nella lista utenti
         * o dall'inserimento di un indirizzo IP
         */
        if(!this.options.From){
          $(this.el).html(this.template(this.model.toJSON()));
          this.startChat();
        }else{
          $(this.el).html(this.template({From: this.options.From}));
        }
      }
    },

    /**
     * funzione atta a rimuovere la vista e le sue sottoviste
     */
    unrender:function(){
      this.chatView.unrender();
      this.chatView=undefined;
      this.close();
    },
    /**
     * inizializza la chat
     */
    startChat:function(){
      if(!this.chatView){
        this.chatView= new ChatView({model: this.model, userModel: this.options.userModel});
      }
      this.chatView.render();
      $('#main').append(this.chatView.el);
      this.model.set({unread: 0});
    },

    /**
     * nel caso si decida di effettuare una audio chiamata
     */
    audiocall:function(isCaller){
      this.call(isCaller, 'audio');
    },

    /**
     * nel caso si decida di effettuare una videochiamata chiamata
     */
    videocall:function(isCaller){
      this.call(isCaller, 'video');
    },

    /**
     * si occupa di gestire la vista della chiamata nel caso se ne effettui una o si accetti quella in ingresso
     */
    call:function(isCaller,type){
      //if(NotificationCommunication.getStatus() && isCaller!=false){
      //  alert("hai già una chiamata attiva");
      //}

      if(this.callView){
        this.forceClose();
      }
    	if(!this.options.From){
        this.startChat();
      }
      this.callView=new CallView({FunctionsView:this});
      if(isCaller==false){
				if(!this.options.From){
					this.callView.render(false, type ,this.model.toJSON().username);
				}else if(this.options.From=='IP'){
					this.callView.render(false, type ,this.$("#ip").val());
				}
      }else{
				if(!this.options.From){
					this.callView.render(true,type,this.model.toJSON().username);
				}else if(this.options.From=='IP'){
					this.callView.render(true, type ,"/"+this.$("#ip").val());
				}
      }
      $('#main').prepend(this.callView.el);
    },

    /**
     * funzione che si occupa di registrare in locale la chiamata che si andrà ad effettuare
     */

    record : function(){

    },

    /**
     * si occupa di gestire il messaggio da registrare
     */
    sendVideoText:function(){
      if(this.recordMessageView){
        this.recordMessageView.close();
      }
      this.close();
      this.recordMessageView=new RecordMessageView({model : this.model});
      this.recordMessageView.render();
      $('#main').prepend(this.recordMessageView.el);
    },

    /**
     * forza la chiusura della chiamata
     */
    forceClose:function(){
      this.callView.endCall();
    },

    /**
     * funzione che si occupa di ripristinare la vista una volta che la chiamata audio o audio e video
     * venga terminata
     */
    closeViewCall : function(){
      this.delegateEvents();
      this.callView=undefined;
      if(this.options.callback){
        this.options.callback.closeConference();
      }
      if(typeof this.model == "undefined"){
        $(this.el).html(this.template({From: this.options.From}));
      }else{
        $('#main').prepend(this.el);
        $(this.el).html(this.template(this.model.toJSON()));
        this.startChat();
      }
    },

    /**
     * funziona per visualizzare i dettagli dell'utente selezionato
     */
    viewDataContact:function(){
      alert('vedi dettaglio');
    },
    
    conference : function(isCaller,contact){
      if(this.options.callback){
        this.options.callback.setConference();
      }
      console.log(this.callView);
      if(!this.callView){
        var contatti=[];
        for(var i=0;i<document.getElementsByTagName('input').length;i++){
          if(document.getElementsByTagName('input')[i].type=='checkbox' && document.getElementsByTagName('input')[i].checked){
            contatti.push(document.getElementsByTagName('input')[i].name);
          }
        }
        if(this.callView){
          this.forceClose();
        }
        this.callView=new CallView({FunctionsView:this});
        if(isCaller==false){
          this.callView.conference(false, 'video',contact);
        }else{
          this.callView.conference(true,'video',contatti);
        }
        $('#main').prepend(this.callView.el);
      }else{
        console.log('ripristino la conferenza');
        this.callView.conference(null,null,null);
      }
    }

  });


  /**
   * si occupa di chiudere la vista
   */
  FunctionsView.prototype.close = function(){
    if(this.chatView){
      this.chatView.close();
    }
    if(this.callView){
      this.callView.close();
    }
    this.remove();
    this.unbind();
  };

  return FunctionsView;

});
