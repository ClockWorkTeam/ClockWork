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
define(['connection'], function(Connection){

  return {
	
	//funzione che si occupa di mandare l'ip da chiamare al server e restituire se accettata o meno
	sendCall: function (iptocall, typecall){
		//messaggio di conferma di connessione sulla console
		var credentials = { ip: iptocall , type:'call', calltype:typecall};
		Connection.send(JSON.stringify(credentials));
		this.receiveAnswer(typecall, iptocall, this);
	},
	
	//funzione che si occupa di inviare una risposta all'utente che ha efettuato la chiamata
	sendAnswer: function (typecall, iptoCall){
		var credentials = { response: true, ip:iptoCall, type:'answeredcall' };
		Connection.send(JSON.stringify(credentials));
		this.startCall(iptoCall, false, typecall);
	},
  
	receiveAnswer: function (typecall, iptocall, call){
		Connection.addEventListener("message", onAnswer, false);
		function onAnswer(evt){
			var answer = JSON.parse(evt.data);
			if(answer.type==='answeredCall'){
				var isCaller=true;
				if(answer.response==='true'){
					call.startCall(iptocall, isCaller,typecall)
				}
			}
		}
	},
	var localStream;
	var peerConn;
	//funzione che si occupa di inizializzare la chiamata
	startCall: function (iptocall, isCaller, typecall){
		var sourcevid = document.getElementById('sourcevid');
		var remotevid = document.getElementById('remotevid');
		localStream = null;
		peerConn = null;
		var started = false;
		var description=null;
		var logg = function(s) { console.log(s); };
		// when PeerConn is created, send setup data to peer via WebSocket
		function onSignal(message) {
		  logg("Sending setup signal");
		  Connection.send(message);
		}

		// when remote adds a stream, hand it on to the local video element
		function onRemoteStreamAdded(event) {
			logg("Added remote stream");
			remotevid.src = window.webkitURL.createObjectURL(event.stream);
		}

		// when remote removes a stream, remove it from the local video element
		function onRemoteStreamRemoved(event) {
			peerConn.removeStream(localstream);
			peerConn.close();
		}

		function createPeerConnection() {
			var pcConfig = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
			try {
				logg("Creating peer connection");
				peerConn = new webkitRTCPeerConnection(pcConfig);
				peerConn.onicecandidate = onIceCandidate;
			} catch (e) {
				console.log("Failed to create PeerConnection, exception: " + e.message);
			}
			peerConn.addEventListener("addstream", onRemoteStreamAdded, false);
			peerConn.addEventListener("removestream", onRemoteStreamRemoved, false)
		}
		

    // start the connection upon user request
		function connect() {
			if (!started && localStream ) {	  
				createPeerConnection();	  
				started = true;
				peerConn.addStream(localStream);
				logg('Adding local stream...');
				peerConn.createOffer(gotDescription);
			} else {
				alert("Local stream not running yet.");
			}
		}
		
    // accept connection request
		Connection.addEventListener("message", onMessage, false);
		function onMessage(evt) {
			logg("RECEIVED: "+evt.data);
				
			var msg = JSON.parse(evt.data);
			if (msg.type==='offer' && !isCaller)
			{	
                
                started = true;
				if(typecall==='video')
				{				
					navigator.webkitGetUserMedia({video:true, audio:true},
					function(stream) {
						sourcevid.src = window.webkitURL.createObjectURL(stream);
						createPeerConnection();
						localStream=stream;	
						
						peerConn.addStream(localStream);
						peerConn.setRemoteDescription(new RTCSessionDescription(msg));
						peerConn.createAnswer(gotDescription);
						
					});
				
				}
				if(typecall==='audio')
				{
					navigator.webkitGetUserMedia({video:false, audio:true},
					function(stream) {
						sourcevid.src = window.webkitURL.createObjectURL(stream);
						createPeerConnection();
						localStream=stream;
						
						peerConn.addStream(localStream);
						peerConn.setRemoteDescription(new RTCSessionDescription(msg));
						peerConn.createAnswer(gotDescription);
						
					});
				}           
			}
			if (msg.type==='answer' && isCaller)
			{
				peerConn.setRemoteDescription(new RTCSessionDescription(msg));
			}
			if (msg.type ==='candidate' && started) {
				
				logg("STARTED TRUE");
										logg('Adding candidate...');
				var candidate = new RTCIceCandidate({sdpMLineIndex:msg.label,
                candidate:msg.candidate});
				peerConn.addIceCandidate(candidate);
			}
				
				
			
    // Message returned from other side
			logg('Processing signaling message...');
		}
    
		function gotDescription(desc) {
		
			peerConn.setLocalDescription(desc);
			
			var descrip=JSON.stringify(desc);
			var credentials={description : descrip, ip : iptocall, type : 'offer'};
			Connection.send(JSON.stringify(credentials));
		}
    
		function onIceCandidate(event) {
			setTimeout(function(){
				if (event.candidate) {
				  var candidate=JSON.stringify({type : 'candidate',
				  label: event.candidate.sdpMLineIndex,
				  id: event.candidate.sdpMid,
				  candidate: event.candidate.candidate});
				  var credentials={cand : candidate, ip: iptocall, type : 'candidate'};
						sendMessage(credentials);

				} else {
				  console.log("End of candidates.");
				}
			}, 5000);
		}
    
		function sendMessage(message) {
			var msgString = JSON.stringify(message);
			console.log('C->S: ' + msgString);
			Connection.send(msgString);
		}
		
		if(isCaller && typecall=='video')
		{			
			
			navigator.webkitGetUserMedia({video:true, audio:true},
			function(stream) {
				sourcevid.src = window.webkitURL.createObjectURL(stream);
				localStream=stream;		
				connect(stream);
        
			});
			
		}
			
		if(isCaller && typecall=='audio')
		{
			navigator.webkitGetUserMedia({video:false, audio:true},
			function(stream) {
				sourcevid.src = window.webkitURL.createObjectURL(stream);
				localStream=stream;	
				connect();
			});
				
		}
	},
	
	endCall: function() {
    peerConn.removeStream(localstream);
    peerConn.close();
	}
  
  };
	
});
