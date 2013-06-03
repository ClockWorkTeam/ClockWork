/*
 * Nome:CallCommunication.js
 * Package: communication
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
    
  var peerConnection = null;
    
  var recipient = null;
    
  var remotevid = null;
       
  var sourcevid = null;
   
  var onMessaggeListener = null;
    
  var readyToSend = null;
    
  var messageReceived = null;
    
  var candidates = null;

  return {
	
    //funzione che inoltra la richiesta di chiamata al server
    sendCall: function (typecall, contact, callView){
      var event=new CustomEvent('setOnCall',{
        detail:{
          type:true
        },
        bubbles:true,
        cancelable:true
      });
      document.dispatchEvent(event);
      recipient=contact;
      var credentials = { contact: recipient.toJSON().username , type:'call', calltype:typecall};
      Connection.send(JSON.stringify(credentials));
      //aggiunta del listener per la ricezione della risposta dell'utente chiamato
      Connection.addEventListener('message', onAnswer, false);
      //metodo per la gestione della risposta ricevuta dall'utente chiamato
      var call=this;
 
      function onAnswer(evt){
        var response = JSON.parse(evt.data);
        if(response.type==='answeredCall'){
          if(response.answer==='true'){
            var isCaller=true;
            call.startCall(isCaller, typecall, call, callView)	
          }else{
	    var event=new CustomEvent('setOnCall',{
              detail:{
                type:false
              },
              bubbles:true,
              cancelable:true
            });
            document.dispatchEvent(event);
            callView.endCall(false);
            
            if(response.answer==='false'){
	      alert('chiamata rifiutata');
            }else if(response.answer==='busy'){
              alert('utente occupato');    
	    }else if(response.answer==='error'){
	      alert('errore durante la chiamata');
	    }
	  }
          Connection.removeEventListener('message',onAnswer,false);
        }
      }
    },
    
    //funzione che invia al server la risposta dell'utente chiamato
    sendAnswer: function (typecall, contact, callView){
      recipient=contact;
      var credentials = { response: true, contact: recipient.toJSON().username, type:'answeredCall' };
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
        var event=new CustomEvent("setPeerConn",{
          detail:{
            peercon:peerConnection
          },
          bubbles:true,
          cancelable:true
        });
        document.dispatchEvent(event);
      }

      // Quando viene rimosso uno stream dal peerConnection si attiva l'evento (non funziona attualmente poichè removestream non è corretto)
      function onRemoteStreamRemoved(event) {
        console.log("Removed remote stream");
        peerConnection.removeStream(this.localStream);
        peerConnection.close();
      }

      var pcConfig = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
      try {
        console.log("Creating peer connection");
        peerConnection = new webkitRTCPeerConnection(pcConfig);
        peerConnection.onicecandidate = this.onIceCandidate;
      }catch (e) {
        console.log('Failed to create peerConnection, exception: ' + e.message);
      }
      peerConnection.addEventListener("addstream", onRemoteStreamAdded, false);
      peerConnection.addEventListener("oniceconnectionstatechange", onRemoteStreamRemoved, false)
    },

    // start the connection upon user request
    connect : function(started) {
      if (!started && localStream ) {	  
        this.createPeerConnection();	  
	peerConnection.addStream(localStream);
	console.log('Adding local stream...');
        peerConnection.createOffer(this.gotDescription);
      }else {
	alert('Local stream not running yet.');
      }
    },
    
    gotDescription : function(desc){
      peerConnection.setLocalDescription(desc);
      var response=JSON.stringify(desc);
      var credentials={description: response, contact: recipient.toJSON().username, type: 'offer'};
      Connection.send(JSON.stringify(credentials));
    },
    
    onIceCandidate: function(event) {
      if (event.candidate) {
        var candidate=JSON.stringify({
          type: 'candidate',
	  label: event.candidate.sdpMLineIndex,
	  id: event.candidate.sdpMid,
	  candidate: event.candidate.candidate
	});
	var candidate = JSON.stringify({cand: candidate, contact: recipient.toJSON().username, type: 'candidate'});
	candidates.push(candidate);
      }else {
	console.log('End of candidates.');
        readyToSend=true;
	if(messageReceived==true){
	  candidates.forEach(
            function(candidate){
              Connection.send(candidate);
              console.log('C->S: ' + candidate);
          });
	}
	var message = JSON.stringify({contact: recipient.toJSON().username, type: 'candidateready'});
        Connection.send(message);
      }
    },
    
    getPeerConnection: function(){
      return peerConnection;
    },

    //funzione che si occupa di inizializzare la chiamata
    startCall: function (isCaller, typecall, call, callView){
      console.log('sono su startCall');
      sourcevid = document.getElementById('sourcevid');
      remotevid = document.getElementById('remotevid');
      candidates=[];
      var started = false;
      var description=null;
      Connection.addEventListener('message', onMessage, false);
      
      function onMessage(evt){
        console.log('RECEIVED: '+evt.data);
        var response = JSON.parse(evt.data);
        if (response.type==='offer' && !isCaller){	
          started = true;
          if(typecall==='video'){				
            navigator.webkitGetUserMedia({video:true, audio:true},
            function(stream) {
              sourcevid.src = window.webkitURL.createObjectURL(stream);
              call.createPeerConnection();
              localStream=stream;
              peerConnection.addStream(localStream);
              peerConnection.setRemoteDescription(new RTCSessionDescription(response));
              peerConnection.createAnswer(call.gotDescription);
            });
          }
          
          if(typecall==='audio'){
            navigator.webkitGetUserMedia({video:false, audio:true},
            function(stream) {
              sourcevid.src = window.webkitURL.createObjectURL(stream);
              call.createPeerConnection();
              localStream=stream;
              peerConnection.addStream(localStream);
              peerConnection.setRemoteDescription(new RTCSessionDescription(response));
              peerConnection.createAnswer(call.gotDescription);
            });
          }           
        }
        
        if (response.type==='answer' && isCaller){
          started=true;
          peerConnection.setRemoteDescription(new RTCSessionDescription(response));
        }
        
        if (response.type ==='candidate' && started) {
          console.log('STARTED TRUE');
          console.log('Adding candidate...');
          var candidate = new RTCIceCandidate({sdpMLineIndex:response.label,
          candidate:response.candidate});
          peerConnection.addIceCandidate(candidate);
        }
        
        if (response.type ==='endcall') {
          if(peerConnection!=null){
            localStream.stop();
            peerConnection.removeStream(localStream);
            peerConnection.close();
          }
          var event=new CustomEvent('setOnCall',{
            detail:{
              type:false
            },
            bubbles:true,
            cancelable:true
          });
          document.dispatchEvent(event);
          Connection.removeEventListener('message',onMessage,false);
          console.log('end stream');
          callView.endCall(false);
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
      setTimeout(function(){
        sourcevid.play();
        remotevid.play();
      },1000);
    },
    
    endCall: function() {
      if(peerConnection != null){
        peerConnection.removeStream(localStream);
        peerConnection.close();
        localStream.stop();
      }
      
      peerConnection = null;
      var event=new CustomEvent("setOnCall",{
        detail:{
          type:false
        },
        bubbles:true,
        cancelable:true
      });
      document.dispatchEvent(event);
      var credentials={contact: recipient.toJSON().username , type : 'endcall'};
      Connection.send(JSON.stringify(credentials));
      Connection.removeEventListener('message', onMessaggeListener, false);
    }
  
  };
	
});
