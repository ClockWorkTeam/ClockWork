define([
 'jquery',
 'underscore',  
 'backbone',
 'view/CallView',
 'communication/NotificationCommunication',
 'text!templates/NotificationTemplate.html'
], function($, _, Backbone, CallView, NotificationCommunication, NotificationTemplate){
  var NotificationView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#acceptCall':'accept',
		'click button#refuseCall':'refuse',
    },
	
    el : $('#content'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(NotificationTemplate),
    
    CallerIp : '',
    
    typeCall : '',
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(ipCaller, typecall){
      _.bindAll(this, 'render');    
      CallerIp=ipCaller;
      typeCall=typecall;
      this.render();
    },
     
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
 
        $(this.el).html(this.template({Ip : CallerIp}));
    },
      
    accept : function(){
		var call= new CallView({ isCaller : false, ip: CallerIp , type : typecall});	
		call.render();
		},
    
    refuse : function(){
		var notification= new NotificationCommunication();
		notification.refuse();
		}
	});
  return NotificationView;

});
