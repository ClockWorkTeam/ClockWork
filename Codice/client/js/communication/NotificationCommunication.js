/*
 * Nome:AuthenticationCommunication.js
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
//classe che comunica con il server per ricezione di notifiche di chiamata o ricezione di messaggi

define(['connection',
		'view/NotificationView'],function(Connection, NotificationView){


	return {
		listenNotification : function(){
			//funzione che si occupa di segnalare la presenza di chiamate in arrivo
			//Precondizione la chiamata arriva solo all'ip che si vuole contattare non a tutte le persone presenti nel server presenta l'ip chiamante e il tipo di chiamata
			var Notification=this;
      var notificationView=null;
      Connection.addEventListener("message", onNotification, false);
			function onNotification(str){
        
				var response = JSON.parse(str.data);
				if (response.type === 'call'){
					notificationView= new NotificationView({CallerIp: response.ip, typeCall: response.typecall, NotificationCommunication:Notification});
				}
        if (response.type === 'endcall'){
          notificationView.close();
				}
			};
		},
		refuse : function(iptocall){
			var credentials = {
				ip: iptocall,
				type:"refusecall"
				};
			Connection.send(JSON.stringify(credentials));
		}
	};
	
});
