define([
 'jquery',
 'underscore',  
 'backbone',
 'view/CallView',
 'view/ChatView',
 'communication/NotificationCommunication',
 'text!templates/NotificationTemplate.html'
], function($, _, Backbone, CallView, ChatView, NotificationCommunication, NotificationTemplate){
  var NotificationView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#acceptCall':'accept',
		'click button#refuseCall':'refuse',
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(NotificationTemplate),
    
    
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      _.bindAll(this, 'render');    
  
      this.render();
    },
     
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
		if(document.getElementById('content'))
			$(this.el).html(this.template({Ip : this.options.CallerIp}));
		else{
			$('#main').prepend(this.el);
			$(this.el).html(this.template({Ip : this.options.CallerIp}));
		}
			
    },
      
    accept : function(){
		var call= new CallView();	
		var chat = new ChatView({ip:this.options.CallerIp});
		call.render(false, this.options.typeCall,this.options.CallerIp);
		},
    
    refuse : function(){
		var notification= new NotificationCommunication();
		notification.refuse();
		}
	});
  return NotificationView;

});
