/*
 * Nome:CallCommunication.js
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
 
//classe che si occupa di gestire l'avvio della comunicazione tra due utenti
define(function(){
	
	var CallCommunication = function(){};
	
	//funzione che si occupa di mandare l'ip da chiamare al server e restituire se accettata o meno
	CallCommunication.prototype.sendCall = function (iptocall)
	{
		 //var connection = new WebSocket('ws://127.0.0.1:8787');
  
		//messaggio di conferma di connessione sulla console
		var credentials = { ip: iptocall};
		connection.send(JSON.stringify(credentials));
	};
	
	//funzione che si occupa di inviare una risposta all'utente che ha efettuato la chiamata
	CallCommunication.prototype.sendAnswer = function (answer)
	{
		var credentials = { response: answer};
		connection.send(JSON.stringify(credentials));
	};
	
	//funzione che si occupa di inizializzare la chiamata
	CallCommunication.prototype.startCall = function (ipCandidate, isCaller, typecall)
	{
		var configuration=null;
		var pc = new RTCPeerConnection(configuration);
		
		pc.onicecandidate = function (evt) {
			signalingChannel.send(JSON.stringify({ "candidate": evt.candidate }));
		};
		
		pc.onaddstream = function (evt) {
			remoteView.getElementById('remotelive_video');
			remoteView.src = URL.createObjectURL(evt.stream);
		};
		
		if(this.options.type=='video')
		{			
			
			navigator.webkitGetUserMedia({video:true, audio:true},
			function(stream) {
				video = document.getElementById("live_video");
				video.src = window.webkitURL.createObjectURL(stream);
				pc.addStream(stream);
				if (isCaller)
					pc.createOffer(gotDescription);
				else
				{
					pc.createAnswer(gotDescription);
					}

				function gotDescription(desc) {
					pc.setLocalDescription(desc);
					signalingChannel.send(JSON.stringify({ "sdp": desc }));
					}
				});
			}
			
		if(this.options.type=='audio')
		{
			navigator.webkitGetUserMedia({video:false, audio:true},
			function(stream) {
				video = document.getElementById("live_video");
				video.src = window.webkitURL.createObjectURL(stream);
				pc.addStream(stream);
				if (isCaller)
					pc.createOffer(gotDescription);
				else
				{
					pc.createAnswer(gotDescription);
					}

				function gotDescription(desc) {
					pc.setLocalDescription(desc);
					signalingChannel.send(JSON.stringify({ "sdp": desc }));
					}
				});
			}
		signalingChannel.onmessage = function (msg) { 
			var signal = JSON.parse(msg.data); 
			if (signal.sdp) { 
				pc.setRemoteDescription( 
				new RTCSessionDescription(signal.sdp), s, e); 
				} 
			else{ 
				pc.addIceCandidate( 
				new RTCIceCandidate(signal.candidate)); 
				} 
			}; 
		
	};
return CallCommunication;	
});
