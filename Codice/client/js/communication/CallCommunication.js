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
	
	var CallCommunication = function(){};
	
	//funzione che si occupa di mandare l'ip da chiamare al server e restituire se accettata o meno
	CallCommunication.prototype.sendCall = function (iptocall, typecall)
	{
		//messaggio di conferma di connessione sulla console
		var credentials = { ip: iptocall , type:'call', calltype:typecall};
		Connection.send(JSON.stringify(credentials));
    this.receiveAnswer(typecall, iptocall, this);
	};
	
	//funzione che si occupa di inviare una risposta all'utente che ha efettuato la chiamata
	CallCommunication.prototype.sendAnswer = function (typecall, iptoCall)
	{
		var credentials = { response: true, ip:iptoCall, type:'answeredcall' };
		Connection.send(JSON.stringify(credentials));
		alert(typecall);
		this.startCall(iptoCall, false, typecall);
	};
  
  CallCommunication.prototype.receiveAnswer = function (typecall, iptocall, call)
	{
		
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
	};
	
	//funzione che si occupa di inizializzare la chiamata
	CallCommunication.prototype.startCall = function (iptocall, isCaller, typecall)
	{
    var sourcevid = document.getElementById('sourcevid');
    var remotevid = document.getElementById('remotevid');
    var localStream = null;
    var peerConn = null;
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
    logg("Remove remote stream");
    remotevid.src = "";
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
      if( isCaller){
      logg('Adding local stream...');
      started = true;
      peerConn.createOffer(gotDescription);
      isCaller=true;
		}
    } else {
      alert("Local stream not running yet.");
    }
    }
    
    // accept connection request
    Connection.addEventListener("message", onMessage, false);
    function onMessage(evt) {
    var msg = JSON.parse(evt.data);
    logg("RECEIVED: "+evt.data);
    alert(msg.type);
    if (msg.type==='offer' && !isCaller)
    {
      createPeerConnection();
      peerConn.addStream(localStream);
      peerConn.setRemoteDescription(new RTCSessionDescription(msg));
      peerConn.createAnswer(gotDescription);
    started = true;
      }
    if (msg.type==='answer' && isCaller)
    {
      peerConn.setRemoteDescription(new RTCSessionDescription(msg));
      }
    if (msg.type === 'candidate' && started) {
      var candidate = new RTCIceCandidate({sdpMLineIndex:msg.label,
                         candidate:msg.candidate});
      peerConn.addIceCandidate(candidate);
    }
    if (!started && msg==='connect') {
      createPeerConnection();
      logg('Adding local stream...');
      
      peerConn.addStream(localStream);
      started = true;
    }
    // Message returned from other side
    logg('Processing signaling message...');
    }
    
    function gotDescription(desc) {
		
        peerConn.setLocalDescription(desc);
        alert(iptocall);
        var credentials={description: desc, ip:iptocall, type:'offer'};
        Connection.send(JSON.stringify(credentials));
      }
    
    function onIceCandidate(event) {
    if (event.candidate) {
      sendMessage({type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate});
    } else {
      console.log("End of candidates.");
    }
    }
    
    function sendMessage(message) {
    var msgString = JSON.stringify(message);
    console.log('C->S: ' + msgString);
    Connection.send(msgString);
    }
		
		if(typecall=='video')
		{			
			
			navigator.webkitGetUserMedia({video:true, audio:true},
			function(stream) {
				sourcevid.src = window.webkitURL.createObjectURL(stream);
				localStream=stream;
				connect();
				peerConn.addStream(stream);
        
				});
			
			}
			
		if(typecall=='audio')
		{
			navigator.webkitGetUserMedia({video:false, audio:true},
			function(stream) {
				sourcevid.src = window.webkitURL.createObjectURL(stream);
				localStream=stream;
				connect();
				peerConn.addStream(stream);
        
				});
				
			}
	};
return CallCommunication;	
});
