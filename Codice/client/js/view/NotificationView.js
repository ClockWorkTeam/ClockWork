define([
 'jquery',
 'underscore',  
 'backbone',
 'view/CallView',
 'view/ChatView',
 'text!templates/NotificationTemplate.html'
], function($, _, Backbone, CallView, ChatView, NotificationTemplate){
  var NotificationView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#acceptCall':'accept',
		'click button#refuseCall':'refused',
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(NotificationTemplate),
    
    
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      _.bindAll(this, 'render');    
      _.bindAll(this, 'refused');    
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
      console.log("accettato");
		//var call= new CallView();	
		//var chat = new ChatView({ip:this.options.CallerIp});
    //this.close();
		//call.render(false, this.options.typeCall,this.options.CallerIp);
      var event=new CustomEvent("acceptCall",{
        detail:{
          type:this.options.typeCall,
          ip:this.options.CallerIp
        },
        bubbles:true,
        cancelable:true
        });
      document.dispatchEvent(event);
		},
    
    refused : function(){
      this.options.NotificationCommunication.refuse(this.options.CallerIp);
      this.close();
		}
    
      }); 

   NotificationView.prototype.close = function(){
    this.remove();
    this.unbind();
  }
  
  return NotificationView;

});
