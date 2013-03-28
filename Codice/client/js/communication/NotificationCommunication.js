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
			
	//funzione che si occupa di segnalare la presenza di chiamate in arrivo
	//Precondizione la chiamata arriva solo all'ip che si vuole contattare non a tutte le persone presenti nel server presenta l'ip chiamante e il tipo di chiamata
	Connection.addEventListener("message", onNotification, false);
	function onNotification(str){
		var response = JSON.parse(str.data);
		alert('è arrivato un messaggio' + response);
		if (response.type === 'call'){
			var notificationView= new NotificationView(response.ip, response.typecall);
		}
	};

	return {
	
	refuse: function()
	{
		var credentials = {
			response: false,
			};
		connection.send(JSON.stringify(credentials));
	}
};
	
});
