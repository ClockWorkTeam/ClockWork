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

define(function(){

	var NotificationCommunication = function(){};
	
	//funzione che si occupa di segnalare la presenza di chiamate in arrivo
	NotificationCommunication.prototype.receivecall (ipcall)
	{
	};
	
	//funzione che si occupa di segnalare la presenza di file ricevuti
	NotificationCommunication.prototype.receivecfile ()
	{
	};
	
	//funzione che si occupa di segnalare la presenza di videomessaggi
	NotificationCommunication.prototype.receiverecordmessage ()
	{
	};
});
