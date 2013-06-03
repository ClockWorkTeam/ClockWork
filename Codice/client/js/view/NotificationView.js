define([
 'jquery',
 'underscore',  
 'backbone',
 'text!templates/NotificationTemplate.html'
], function($, _, Backbone, NotificationTemplate){
  var timeout = null;
  var NotificationView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#acceptCall':'accept',
		'click button#refuseCall':'refuse',
    },
	
    el : $('#main'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(NotificationTemplate),
    
    
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      _.bindAll(this, 'render');    
      _.bindAll(this, 'refuse');
      var timeout=true;
      this.render();
    },
     
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
			$(this.el).html(this.template({username : this.options.caller}));
			var notificationView=this;
			setTimeout(function(){notificationView.timeoutCall()},5000);	
    },
      
    unrender:function(){
			this.close();
      $(this.el).html('');
			$('body').append(this.el);			
		},
		
    accept : function(){
      timeout=false;
      this.unrender();
      var event=new CustomEvent('acceptCall',{
        detail:{
          type:this.options.typeCall,
          contact:this.options.caller
        },
        bubbles:true,
        cancelable:true
        });
      document.dispatchEvent(event);
      
		},
    
    timeoutCall : function(){
      if(timeout==true)
        this.refuse();
    },
    
    refuse : function(){
      this.options.NotificationCommunication.refuse(this.options.caller);
      this.unrender();
 		}
    
      }); 

   NotificationView.prototype.close = function(){
    console.log('notification close');
    this.remove();
    this.unbind();
  }
  
  return NotificationView;

});
