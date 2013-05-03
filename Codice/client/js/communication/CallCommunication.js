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

  //metodo per la gestione della risposta ricevuta dall'utente chiamato
  function onAnswer(evt){
    var response = JSON.parse(evt.data);
    if(response.type==='answeredCall'){
      var isCaller=true;
      if(response.answer==='true'){
        call.startCall(iptocall, isCaller, typecall, call, callView)
        Connection.removeEventListener("message",onAnswer,false);
      }
    }
  };

  return {
	
    //funzione che inoltra la richiesta di chiamata al server
    sendCall: function (iptocall, typecall, callView){
      var credentials = { ip: iptocall , type:'call', calltype:typecall};
      Connection.send(JSON.stringify(credentials));
      //aggiunta del listener per la ricezione della risposta dell'utente chiamato
      Connection.addEventListener("message", onAnswer, false);
    },
    
    //funzione che invia al server la risposta dell'utente chiamato
    sendAnswer: function (typecall, iptoCall, callView){
      var credentials = { response: true, ip:iptoCall, type:'answeredCall' };
      Connection.send(JSON.stringify(credentials));
      this.startCall(iptoCall, false, typecall, this, callView);
    },
    
    //stream audio/video locale
    localStream:'',
    
    peerConn:'',
    
    iptoend:'',
    
    remotevid:'',
  
    createPeerConnection : function() {
      // Quando viene inserito uno stream nel peerconnection si attiva l'evento che visualizza lo stream dell'altro utente
      function onRemoteStreamAdded(event) {
      console.log("Added remote stream");
      remotevid.src = window.webkitURL.createObjectURL(event.stream);
      }

      // uando viene rimosso uno stream ndal peerconnection si attiva l'evento (non funziona attualmente poichè removestream non è corretto)
      function onRemoteStreamRemoved(event) {
        console.log("Removed remote stream");
        peerConn.removeStream(localstream);
        peerConn.close();
      }

      var pcConfig = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};
      try {
        console.log("Creating peer connection");
        peerConn = new webkitRTCPeerConnection(pcConfig);
        peerConn.onicecandidate = this.onIceCandidate;
      } catch (e) {
        console.log("Failed to create PeerConnection, exception: " + e.message);
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
			var credentials={description : response, ip : iptoend, type : 'offer'};
			Connection.send(JSON.stringify(credentials));
		},
    
		onIceCandidate: function(event) {
			setTimeout(function(){
				if (event.candidate) {
				  var candidate=JSON.stringify({type : 'candidate',
				  label: event.candidate.sdpMLineIndex,
				  id: event.candidate.sdpMid,
				  candidate: event.candidate.candidate});
				  var credentials={cand : candidate, ip: iptoend, type : 'candidate'};
				  var response = JSON.stringify(credentials);
				  console.log('C->S: ' + response);
				  Connection.send(response);
				} else {
				  console.log("End of candidates.");
				}
			}, 5000);
		},

    //funzione che si occupa di inizializzare la chiamata
    startCall: function (iptocall, isCaller, typecall, call, callView){
      var sourcevid = document.getElementById('sourcevid');
      remotevid = document.getElementById('remotevid');
      localStream = null;
      peerConn = null;
      iptoend=iptocall;
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
          peerConn.removeStream(localStream);
          peerConn.close();
          Connection.removeEventListener("message",onMessage,false);
          console.log("end stream");
          callView.close();
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
    },
	
    endCall: function() {
      peerConn.removeStream(localStream);
        peerConn.close();
        var credentials={ip : iptoend,type : 'endcall'};
      Connection.send(JSON.stringify(credentials));
      //Connection.removeEventListener("message", onMessage, false);
    }
  
  };
	
});
