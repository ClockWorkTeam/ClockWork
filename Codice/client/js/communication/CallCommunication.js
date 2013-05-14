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
  
  var localStream = null;
    
  var remoteStream = null;
    
  var peerConn = null;
    
  var recipient = null;
    
  var remotevid = null;
       
  var sourcevid = null;
   
  var onMessaggeListener = null;
    
  var readyToSend = null;
    
  var messageReceived = null;
    
  var candidates = null;

  
  
  return {
	
    //funzione che inoltra la richiesta di chiamata al server
    sendCall: function (recipi, typecall, callView){
      recipient=recipi;
      var credentials = { ip: recipient , type:'call', calltype:typecall};
      Connection.send(JSON.stringify(credentials));
      //aggiunta del listener per la ricezione della risposta dell'utente chiamato
      Connection.addEventListener("message", onAnswer, false);
      //metodo per la gestione della risposta ricevuta dall'utente chiamato
      var call=this;
      function onAnswer(evt){
         
        var response = JSON.parse(evt.data);
        
        if(response.type==='answeredCall'){
          
          if(response.answer==='true'){
            var isCaller=true;
            call.startCall(isCaller, typecall, call, callView)	
          }else if(response.answer==='false'){
            callView.close();
          }  
          Connection.removeEventListener("message",onAnswer,false);
        }
      }
    },
    
    //funzione che invia al server la risposta dell'utente chiamato
    sendAnswer: function (typecall, recipi, callView){
      recipient=recipi;
      var credentials = { response: true, ip:recipient, type:'answeredCall' };
      Connection.send(JSON.stringify(credentials));
      this.startCall(false, typecall, this, callView);
    },
    
    //stream audio/video locale
    
    
    
    createPeerConnection : function() {
      // Quando viene inserito uno stream nel peerConnection si attiva l'evento che visualizza lo stream dell'altro utente
      function onRemoteStreamAdded(event) {
      console.log("Added remote stream");
      remotevid.src = window.webkitURL.createObjectURL(event.stream);
      remoteStream=event.stream;
      }

      // Quando viene rimosso uno stream dal peerConnection si attiva l'evento (non funziona attualmente poichè removestream non è corretto)
      function onRemoteStreamRemoved(event) {
        console.log("Removed remote stream");
        peerConn.removeStream(this.localStream);
        peerConn.close();
      }

      var pcConfig = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
      try {
        console.log("Creating peer connection");
        peerConn = new webkitRTCPeerConnection(pcConfig);
        peerConn.onicecandidate = this.onIceCandidate;
      } catch (e) {
        console.log("Failed to create peerConnection, exception: " + e.message);
      }
      
      peerConn.addEventListener("addstream", onRemoteStreamAdded, false);
      peerConn.addEventListener("oniceconnectionstatechange", onRemoteStreamRemoved, false)
    },

    // start the connection upon user request
		connect : function(started) {
			if (!started && localStream ) {	  
				this.createPeerConnection();	  
				peerConn.addStream(localStream);
				console.log('Adding local stream...');
        
				peerConn.createOffer(this.gotDescription);
			} else {
				alert("Local stream not running yet.");
			}
		},
    
		gotDescription : function(desc){
			peerConn.setLocalDescription(desc);
			var response=JSON.stringify(desc);
			var credentials={description: response, ip: recipient, type: 'offer'};
			Connection.send(JSON.stringify(credentials));
		},
    
		onIceCandidate: function(event) {
			if (event.candidate) {
			  var candidate=JSON.stringify({type: 'candidate',
			  label: event.candidate.sdpMLineIndex,
			  id: event.candidate.sdpMid,
			  candidate: event.candidate.candidate});
			  var candidate = JSON.stringify({cand: candidate, ip: recipient, type: 'candidate'});
			  candidates.push(candidate);
			} else {
				console.log("End of candidates.");
        readyToSend=true;
				if(messageReceived==true){
					candidates.forEach(
            function(candidate){
              Connection.send(candidate);
              console.log('C->S: ' + candidate);
            });
				}
          console.log("candidate ti invierò");
					var message = JSON.stringify({ip: recipient, type: 'candidateready'});
          Connection.send(message);
			}
		},

    //funzione che si occupa di inizializzare la chiamata
    startCall: function (isCaller, typecall, call, callView){
      console.log("sono su startCall");
      sourcevid = document.getElementById('sourcevid');
      remotevid = document.getElementById('remotevid');
      candidates=[];
      var started = false;
      var description=null;
      Connection.addEventListener("message", onMessage, false);
      
      function onMessage(evt){
        console.log("RECEIVED: "+evt.data);
        var response = JSON.parse(evt.data);
        if (response.type==='offer' && !isCaller){	
          started = true;
          if(typecall==='video'){				
            navigator.webkitGetUserMedia({video:true, audio:true},
            function(stream) {
              sourcevid.src = window.webkitURL.createObjectURL(stream);
              call.createPeerConnection();
              localStream=stream;
              peerConn.addStream(localStream);
              peerConn.setRemoteDescription(new RTCSessionDescription(response));
              peerConn.createAnswer(call.gotDescription);
            });
          }
          
          if(typecall==='audio'){
            navigator.webkitGetUserMedia({video:false, audio:true},
            function(stream) {
              sourcevid.src = window.webkitURL.createObjectURL(stream);
              call.createPeerConnection();
              localStream=stream;
              peerConn.addStream(localStream);
              peerConn.setRemoteDescription(new RTCSessionDescription(response));
              peerConn.createAnswer(call.gotDescription);
            });
          }           
        }
        
        if (response.type==='answer' && isCaller){
          started=true;
          peerConn.setRemoteDescription(new RTCSessionDescription(response));
        }
        
        if (response.type ==='candidate' && started) {
          console.log("STARTED TRUE");
          console.log('Adding candidate...');
          var candidate = new RTCIceCandidate({sdpMLineIndex:response.label,
          candidate:response.candidate});
          peerConn.addIceCandidate(candidate);
        }
        
        if (response.type ==='endcall') {
          peerConn.removeStream(call.localStream);
          peerConn.close();
          Connection.removeEventListener("message",onMessage,false);
          console.log("end stream");
          callView.close();
        }
        
        if (response.type ==='candidateready') {
          messageReceived=true;
          console.log("pronto ad inviare");
          if(readyToSend){
            candidates.forEach(
            function(candidate){
              Connection.send(candidate);
              console.log('C->S: ' + candidate);
            });
          }
        }
        console.log('Processing signaling message...');
      }
      
      if(isCaller && typecall=='video'){
        navigator.webkitGetUserMedia({video:true, audio:true},
        function(stream) {
          sourcevid.src = window.webkitURL.createObjectURL(stream);
          localStream=stream;		
          call.connect(started);
        });
      }
        
      if(isCaller && typecall=='audio'){
        navigator.webkitGetUserMedia({video:false, audio:true},
        function(stream) {
          sourcevid.src = window.webkitURL.createObjectURL(stream);
          localStream=stream;	
          call.connect(started);
        });
      }
      onMessaggeListener=onMessage;
    },
    
    recoverCall: function () {
      sourcevid = document.getElementById('sourcevid');
      remotevid = document.getElementById('remotevid');
      sourcevid.src = window.webkitURL.createObjectURL(localStream);
      remotevid.src = window.webkitURL.createObjectURL(remoteStream);
      sourcevid.play();
      remotevid.play();
    },
    
    endCall: function() {
      if(peerConn){
        peerConn.removeStream(localStream);
        peerConn.close();
      }
      var credentials={ip : recipient , type : 'endcall'};
      Connection.send(JSON.stringify(credentials));
      Connection.removeEventListener("message", onMessaggeListener, false);
    }
  
  };
	
});
