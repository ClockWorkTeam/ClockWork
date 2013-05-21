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
 'text!templates/FunctionsTemplate.html'
], function($, _, Backbone, CallView, RecordMessageView, FunctionsTemplate){
  var FunctionsView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#sendVideoText':'sendVideoText',
		'click button#call':'audiocall',
		'click button#video':'videocall',	
		'click input#record' : 'record'
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(FunctionsTemplate),
    
    callView : '',
    
    recordMessageView : '',
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      callView='';
      _.bindAll(this, 'render');
    },
    
    current_user: '',
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
      if(this.callView){
        this.callView.render();
      }
      else{
        if(typeof this.model == "undefined"){
          $(this.el).html(this.template({From: this.options.From}));
        } else {
          $(this.el).html(this.template(this.model.toJSON()));
        }
      }
    },   
    
    sendVideoText:function(){
		if(this.recordMessageView)
		{	
			
			this.recordMessageView.close;
			}
		this.close;
		this.recordMessageView=new RecordMessageView({model : this.model});
		this.recordMessageView.render();
		$('#main').prepend(this.recordMessageView.el);
		},
    
    audiocall:function(isCaller){
      if(this.callView)
      {	
        this.callView.close;
      }
      this.close;
      this.callView=new CallView({FunctionView:this});
      if(isCaller==false){
        this.callView.render(false, 'audio',this.model.toJSON().IP);
      }
      else{
        this.callView.render(true,'audio',this.model.toJSON().IP);
      }
      $('#main').prepend(this.callView.el);
    },
    
    videocall:function(isCaller){
      if(this.callView)
      {	
        this.callView.close;
      }
      this.close;
      this.callView=new CallView({FunctionView:this});
      if(isCaller==false){
        this.callView.render(false, 'video',this.model.toJSON().IP);
      }
      else{
        this.callView.render(true,'video',this.model.toJSON().IP);
      }
      $('#main').prepend(this.callView.el);
    },
    
    record : function(){
		
		},
    
    closeview : function(){
      console.log("prova");
      //this.close();
      this.callView='';
      if(typeof this.model == "undefined"){
        $(this.el).html(this.template({From: this.options.From}));
      }else {
        this.delegateEvents();
        $('#main').prepend(this.el);
        $(this.el).html(this.template(this.model.toJSON()));
      }
		}
  });

  FunctionsView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return FunctionsView;

});
