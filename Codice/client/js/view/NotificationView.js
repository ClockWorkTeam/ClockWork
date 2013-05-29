define([
 'jquery',
 'underscore',  
 'backbone',
 'view/CallView',
 'view/ChatView',
 'text!templates/NotificationTemplate.html'
], function($, _, Backbone, CallView, ChatView, NotificationTemplate){
  
  var timeout = null;
  
  var NotificationView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#acceptCall':'accept',
		'click button#refuseCall':'refuse',
    },
    
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */	
    el : $('#content'),
	
    template : _.template(NotificationTemplate),
    
    /**
     * funzione di inizializzazione dell'oggetto
     */
     
    initialize: function(){
      _.bindAll(this, 'render','refuse');    
      timeout=true;
      this.render();
    },
     
    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(){
      if(!document.getElementById('content')){
        $('#main').prepend(this.el);
      }
      $(this.el).html(this.template({Ip : this.options.CallerIp}));
      var notificationView=this;
      setTimeout(function(){notificationView.timeoutCall()},5000);	
    },

    /**
     * funzione che si occupa di istanziare una chiamata nel qualcaso venga accettata
     */
    accept : function(){
      this.timeout=false;
      this.close();
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


    /**
     * funzione che si occupa di rifiutare una chiamata automaticamente 
     * nel qualcaso non si risponda entro un limite di tempo
     */
    timeoutCall : function(){
      if(this.timeout==true)
        this.refuse();
    },

    /**
     * funzione che si occupa di segnalare il rifiuto di una chiamata in ingresso
     */
    refuse : function(){
      this.options.NotificationCommunication.refuse(this.options.CallerIp);
      this.close();
		}
    
      }); 
  
  /**
   * si occupa di chiudere la vista
   */
   
   NotificationView.prototype.close = function(){
    console.log("notification close");
    this.remove();
    this.unbind();
  }
  
  return NotificationView;

});
