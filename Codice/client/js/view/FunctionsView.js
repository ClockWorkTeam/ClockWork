/*
 * Nome: FunctionsView.js
 * Package: 
 * Autore:
 * Data:
 * Versione:
 * 
 * Modifiche:
 * +------+---------------+-----------+
 * | Data | Programmatore | Modifiche |
 * +------+---------------+-----------+
 * |      |               |           |
 */
 
//definizione delle dipendenze
define([
 'jquery',
 'underscore',  
 'backbone',
 'view/CallView',
 'view/RecordMessageView',
  'view/ChatView',
 'text!templates/FunctionsTemplate.html'
], function($, _, Backbone, CallView, RecordMessageView,  ChatView, FunctionsTemplate){
  var FunctionsView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
      'click button#dataContact':'viewDataContact',
      'click button#sendVideoText':'sendVideoText',
      'click button#call':'audiocall',
      'click button#video':'videocall',	
      'click input#record' : 'record'
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(FunctionsTemplate),
    
    recordMessageView : '',
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      if(!this.options.From){
	this.listenTo(this.model, 'change', this.render);
      }
      _.bindAll(this, 'render');
    },
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
      if(this.callView){
	if(this.model.toJSON().IP==='0'){
	  this.forceClose();
        }else{
	  this.startChat();
	  this.callView.render(null,null, this.model);
        }
      }else{
        if(!this.options.From){
          $(this.el).html(this.template(this.model.toJSON()));
	  this.startChat();
        }else{
	  $(this.el).html(this.template({From: this.options.From}));
        }
      }
    },   
    
    unrender:function(){
      this.chatView.unrender();
      this.chatView=undefined;
      this.close();
    },

    startChat:function(){
      if(!this.chatView){
	this.chatView= new ChatView({model: this.model, userModel: this.options.userModel});
      }
      this.chatView.render();
      $('#main').append(this.chatView.el);
      this.model.set({unread: 0});
    },
    
    audiocall:function(isCaller){
      this.call(isCaller, 'audio');
    },
    
    videocall:function(isCaller){
      this.call(isCaller, 'video');
    },
		
    call:function(isCaller,type){
      //if(NotificationCommunication.getStatus() && isCaller!=false){
      //  alert("hai già una chiamata attiva");
      //}
      if(this.callView){
        this.forceClose();
      }
      this.startChat();
      this.callView=new CallView({FunctionView:this});
      if(isCaller==false){
        this.callView.render(false, type ,this.model);
      }else{
        this.callView.render(true,type,this.model);
      }
      $('#main').prepend(this.callView.el);
    },

    record : function(){
		
    },
		
    sendVideoText:function(){
      if(this.recordMessageView){				
        this.recordMessageView.close();
      }
      this.close();
      this.recordMessageView=new RecordMessageView({model : this.model});
      this.recordMessageView.render();
      $('#main').prepend(this.recordMessageView.el);
    },
    
    forceClose:function(){
      this.callView.endCall();
    },
    
    closeViewCall : function(){
      this.callView=undefined;
      if(typeof this.model == "undefined"){
        $(this.el).html(this.template({From: this.options.From}));
      }else{
        $('#main').prepend(this.el);
        $(this.el).html(this.template(this.model.toJSON()));
        this.startChat();
      }
    },
    
    viewDataContact:function(){
      alert('vedi dettaglio');
    }
  
  });

  FunctionsView.prototype.close = function(){
    if(this.chatView){
      this.chatView.close();
    }
    this.remove();
    this.unbind();
  };

  return FunctionsView;

});
