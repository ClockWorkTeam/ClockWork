
  var localStream = null;
    
  var remoteStream = null;
    
  var peerConnection = null;
    
  var recipient = null;
    
  var remotevid = { src: null };
       
  var sourcevid = null;
   
  var onMessaggeListener = null;
    
  var readyToSend = null;
    
  var messageReceived = null;
    
  var candidates = null;
  
  var Connection = window.Connection;

/**
 * classe che si occupa di gestire l'avvio della comunicazione tra due utenti
 */
var CallCommunication = {
	
	
    /**
     * funzione che inoltra la richiesta di chiamata ad un unico utente al server e attende una risposta
     */
    sendCall: function (typecall, contact, callView){
      /**
       * imposto che sto chiamando e sono quindi occupato
       */
      var event=new CustomEvent('setOnCall',{
        detail:{
          type:true
        },
        bubbles:true,
        cancelable:true
      });
      document.dispatchEvent(event);
      recipient=contact;
      var message = { type:'call', contact: recipient.toJSON().username, callType:typecall};
      Connection.send(JSON.stringify(message));
      /**
       * aggiunta del listener per la ricezione della risposta dell'utente chiamato
       */
      Connection.addEventListener('message', onAnswer, false);
      /**
       * viene impostata questa variabile per poter tener traccia della funzione stessa
       */
      var call=this;
      
      /**
       * metodo per la gestione della risposta ricevuta dall'utente chiamato
       */
      function onAnswer(evt){
        var response = JSON.parse(evt.data);
        if(response.type==='answeredCall'){
          /**
           * controllo la risposta del chiamato, se positiva avvio la chiamata
           * altrimenti imposto nuovamente la disponibilità a ricevere la chiamata
           * e chiudo la vista
           */
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
            
            alert(response.error);
          }
          Connection.removeEventListener('message',onAnswer,false);
        }
      }
    },
    /**
     * funzione che inoltra la richiesta di chiamata al server a più utenti e attende una risposta
     */
    sendCallConference: function (typecall, contact, callView){
      /**
       * imposto che sto chiamando e sono quindi occupato
       */
      remotevid=[];
      peerConnection=[];
      var event=new CustomEvent('setOnCall',{
        detail:{
          type:true
        },
        bubbles:true,
        cancelable:true
      });
      document.dispatchEvent(event);
      recipient=contact;
      Connection.addEventListener('message', onAnswer, false);
      var message;
      for(var i=0;i<recipient.length;i++){
        console.log(recipient[i]);
        message= {type:'callConference', contact: recipient[i] ,  callType:typecall};
        Connection.send(JSON.stringify(message));
      }
      /**
       * aggiunta del listener per la ricezione della risposta dell'utente chiamato
       */
      
      /**
       * viene impostata questa variabile per poter tener traccia della funzione stessa
       */
      var call=this;
      
      /**
       * metodo per la gestione della risposta ricevuta dall'utente chiamato
       */
      var answerReceived=0;
      var confirmReceived=0;
      function onAnswer(evt){
        var response = JSON.parse(evt.data);
        if(response.type==='answeredCallConference'){
          /**
           * controllo la risposta del chiamato, se positiva avvio la chiamata
           * altrimenti imposto nuovamente la disponibilità a ricevere la chiamata
           * e chiudo la vista
           */
          answerReceived++;
          if(response.answer==='true'){
            confirmReceived++;
            callView.addVideoConference("jack2")
            if(confirmReceived==1){
              var isCaller=true;
              call.startCallConference(isCaller, typecall, call, callView,response.user)
            }else{
              call.addCallConference(isCaller,typecall,call,callView,response.user);
            }
          }else{
            if(answerReceived==recipient.length && confirmReceived==0){
              var event=new CustomEvent('setOnCall',{
                detail:{
                  type:false
                },
                bubbles:true,
                cancelable:true
              });
              document.dispatchEvent(event);
              callView.endCall(false);
            }
            alert(response.error);
        /*  if(response.answer==='false'){
              alert('chiamata a '+ response.user +'rifiutata');
            }else if(response.answer==='busy'){
              alert('utente '+ response.user +' occupato');    
            }else if(response.answer==='error'){
              alert('errore durante la chiamata con '+ response.user);
            }
            */
          }
          if(answerReceived==recipient.length){
            Connection.removeEventListener('message',onAnswer,false);
          }
        }
      }
    },
    
    /**
     * funzione che invia al server la risposta dell'utente chiamato
     */
    sendAnswer: function (typecall, contact, callView){
      recipient=contact;
      var message = {type:'answeredCall', contact: recipient.toJSON().username};
      Connection.send(JSON.stringify(message));
      this.startCall(false, typecall, this, callView);
    },
    
    /**
     * funzione che invia al server la risposta dell'utente chiamato e avvia la videoconferenza con più utenti
     */
    sendAnswerConference: function (typecall, contact, callView){
      recipient=[];
      recipient.push(contact);
      remotevid=[];
      peerConnection=[];
      callView.addVideoConference("jack2");
      console.log(recipient);
      var message = {type:'answeredCallConference', contact: contact};
      Connection.send(JSON.stringify(message));
      this.startCallConference(false, typecall, this, callView,contact);
    },
    
    /**
     * crea la peerconnection
     */
    createPeerConnection : function() {
      /**
       * ascoltatore che capisce quando viene inserito all'interno di una peerconnection uno stream da un utente remoto
       */
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

      /**
       * ascoltatore che capisce quando viene rimosso all'interno di una peerconnection 
       * uno stream da un utente remoto (attualmente non implementato da
       * webrtc)
       */
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

    /**
     * l'utente che ha iniziato la chiamata instaura la connessione inviando 
     * l'offerta e creando il proprio peerconnection
     */
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
    
    createPeerConnectionConference : function() {
      /**
       * ascoltatore che capisce quando viene inserito all'interno di una peerconnection uno stream da un utente remoto
       */
      function onRemoteStreamAdded(event) {
        console.log("Added remote stream");
        remotevid[lastPeerConnection].src = window.webkitURL.createObjectURL(event.stream);
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

      /**
       * ascoltatore che capisce quando viene rimosso all'interno di una peerconnection 
       * uno stream da un utente remoto (attualmente non implementato da
       * webrtc)
       */
      function onRemoteStreamRemoved(event) {
        console.log("Removed remote stream");
        peerConnection[lastPeerConnection].removeStream(this.localStream);
        peerConnection[lastPeerConnection].close();
      }

      var pcConfig = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
      try {
        console.log("Creating peer connection");
        peerConnection.push(new webkitRTCPeerConnection(pcConfig));
        console.log("PeerConnection usati "+peerConnection.length);
        peerConnection[lastPeerConnection].onicecandidate = this.onIceCandidate;
      }catch (e) {
        console.log('Failed to create peerConnection, exception: ' + e.message);
      }
      peerConnection[lastPeerConnection].addEventListener("addstream", onRemoteStreamAdded, false);
      peerConnection[lastPeerConnection].addEventListener("oniceconnectionstatechange", onRemoteStreamRemoved, false)
    },
    
    connectConference : function(started) {
      if (!started && localStream ) {	  
        this.createPeerConnectionConference();	  
        peerConnection[lastPeerConnection].addStream(localStream);
        console.log('Adding local stream...');
        peerConnection[lastPeerConnection].createOffer(this.gotDescription);
      }else {
        alert('Local stream not running yet.');
      }
    },
    
    /**
     * funziona che si occupa di settare il sdp locale della peerconnection e di inviarlo
     * all'altro utente
     */
    gotDescription : function(desc){
      console.log(lastPeerConnection);
      if(lastPeerConnection==null){
        peerConnection.setLocalDescription(desc);
        var response=JSON.stringify(desc);
        var credentials={type: 'offer', description: response, contact: recipient.toJSON().username};
      }else{
        peerConnection[lastPeerConnection].setLocalDescription(desc);  
        var response=JSON.stringify(desc);
        var credentials={type: 'offer', description: response, contact: recipient[lastPeerConnection]};
      }
      Connection.send(JSON.stringify(credentials));
    },

    /**
     * funziona che si occupa di salvare gli icecandidate e di inviarli all'altro utente
     * solo nel qualcaso l'utente con cui si instaura la chiamata sia pronto a ricevere altrimenti
     * vengono salvati per poi inviarli successivamente
     */    
    onIceCandidate: function(event) {
      if (event.candidate){
        var candidate=JSON.stringify({
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        });
        if(lastPeerConnection==null){
          var message = JSON.stringify({type: 'candidate', candidate: candidate, contact: recipient.toJSON().username});
        }else{
          var message = JSON.stringify({type: 'candidate', candidate: candidate, contact: recipient[lastPeerConnection]});
        }
        candidates.push(message);
      }else{
        console.log('End of candidates.');
        readyToSend=true;
        /**
         * controllo se l'utente remoto è pronto a ricevere messaggi
         */
        if(messageReceived==true){
          candidates.forEach(
            function(candidate){
              Connection.send(candidate);
              console.log('C->S: ' + candidate);
            }
          );
        }
        if(lastPeerConnection==null){
          var message = JSON.stringify({type: 'candidateReady', contact: recipient.toJSON().username});
        }else{
          var message = JSON.stringify({type: 'candidateReady', contact: recipient[lastPeerConnection]});
        }
        Connection.send(message);
      }
    },

    /**
     * funzione che si occupa di inizializzare la chiamata
     */
    startCall: function (isCaller, typecall, call, callView){
      console.log('sono su startCall');
      sourcevid = document.getElementById('sourcevid');
      remotevid = document.getElementById('remotevid');
      candidates=[];
      var started = false;
      var description=null;
      Connection.addEventListener('message', onMessage, false);
      /**
       * listener che si occupa di riceve i vari messaggi dal server e in base al tipo
       * effettuare determinate azioni
       */
      function onMessage(evt){
        console.log('RECEIVED: '+evt.data);
        var response = JSON.parse(evt.data);
        /**
         * una volta che il chiamante invia la su offerta (cioè il suo sdp) viene richiesta 
         * la creazione dello stream del chiamato che potrà essere video
         * o solo audio, inoltre imposto nella peerconnection lo sdp del remoto
         */
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
        
        /**
         * una volta ricevuta la risposta (sdp del chiamato) imposto 
         * imposto nella peerconnection lo sdp del remoto
         */
        if (response.type==='answer' && isCaller){
          started=true;
          peerConnection.setRemoteDescription(new RTCSessionDescription(response));
        }
        
        /**
         * si occupa di impostare i candidati all'interno della peerconnection
         */
        if (response.type ==='candidate' && started) {
          console.log('STARTED TRUE');
          console.log('Adding candidate...');
          var candidate = new RTCIceCandidate({sdpMLineIndex:response.label,
          candidate:response.candidate});
          peerConnection.addIceCandidate(candidate);
        }
        
        /**
         * si occupa di gestire la chiusura chiamata una volta ricevutone il segnale
         * dall'altro utente
         */
        if (response.type ==='endCall') {
          if(peerConnection!=null){
            localStream.stop();
            peerConnection.removeStream(localStream);
            peerConnection.close();
          }
          /**
           * reimposto nuovamente la mia disponibilità per la disponibilità di chiamata in 
           * ingresso
           */
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
        
        /**
         * riconosce il fatto che l'utente remoto è pronto a ricevere candidati
         */ 
        if (response.type ==='candidateReady') {
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
      
      /** 
       * se sono il chiamante inizializzo lo stream video
       */ 
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
    
    
    
    startCallConference: function (isCaller, typecall, call, callView,contact){
      lastPeerConnection=-1;
      sourcevid = document.getElementById('sourcevid');
      remotevid.push(document.getElementById("jack2"));
      candidates=[];
      
      var started = false;
      var description=null;
      Connection.addEventListener('message', onMessage, false);
      /**
       * listener che si occupa di riceve i vari messaggi dal server e in base al tipo
       * effettuare determinate azioni
       */
      function onMessage(evt){
        console.log('RECEIVED: '+evt.data);
        var response = JSON.parse(evt.data);
        /**
         * una volta che il chiamante invia la su offerta (cioè il suo sdp) viene richiesta 
         * la creazione dello stream del chiamato che potrà essere video
         * o solo audio, inoltre imposto nella peerconnection lo sdp del remoto
         */
        if (response.type==='offer' && !isCaller){
          lastPeerConnection++;	
          started = true;
          if(typecall==='video'){				
            navigator.webkitGetUserMedia({video:true, audio:true},
            function(stream) {
              sourcevid.src = window.webkitURL.createObjectURL(stream);
              call.createPeerConnectionConference();
              localStream=stream;
              console.log(peerConnection[0]);
              peerConnection[lastPeerConnection].addStream(localStream);
              peerConnection[lastPeerConnection].setRemoteDescription(new RTCSessionDescription(response));
              peerConnection[lastPeerConnection].createAnswer(call.gotDescription);
            });
          }       
        }
        
        /**
         * una volta ricevuta la risposta (sdp del chiamato) imposto 
         * imposto nella peerconnection lo sdp del remoto
         */
        if (response.type==='answer' && isCaller){
          started=true;
          peerConnection[lastPeerConnection].setRemoteDescription(new RTCSessionDescription(response));
        }
        
        /**
         * si occupa di impostare i candidati all'interno della peerconnection
         */
        if (response.type ==='candidate' && started) {
          console.log('STARTED TRUE');
          console.log('Adding candidate...');
          var candidate = new RTCIceCandidate({sdpMLineIndex:response.label,
          candidate:response.candidate});
          peerConnection[lastPeerConnection].addIceCandidate(candidate);
        }
        
        /**
         * si occupa di gestire la chiusura chiamata una volta ricevutone il segnale
         * dall'altro utente
         */
        if (response.type ==='endCall') {
          if(peerConnection!=null){
            localStream.stop();
            peerConnection.removeStream(localStream);
            peerConnection.close();
          }
          /**
           * reimposto nuovamente la mia disponibilità per la disponibilità di chiamata in 
           * ingresso
           */
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
        
        /**
         * riconosce il fatto che l'utente remoto è pronto a ricevere candidati
         */ 
        if (response.type ==='candidateReady') {
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
      
      /** 
       * se sono il chiamante inizializzo lo stream video
       */ 
      if(isCaller && typecall=='video'){
        lastPeerConnection++;
        navigator.webkitGetUserMedia({video:true, audio:true},
        function(stream) {
          sourcevid.src = window.webkitURL.createObjectURL(stream);
          localStream=stream;		
          call.connectConference(started);
        });
         console.log(peerConnection[0]);
      }
      onMessaggeListener=onMessage;
    },
    
    /**
     * ripristino la visione dello stream video ed audio o solo audio nel
     * caso durante la chiamata abbia selezionato un altro utente
     */
    recoverCall: function () {
      sourcevid = document.getElementById('sourcevid');
      remotevid = document.getElementById('remotevid');
      sourcevid.src = window.webkitURL.createObjectURL(localStream);
      remotevid.src = window.webkitURL.createObjectURL(remoteStream);
      /**
       * è stato impostato un delay poichè non avveniva istantaneamente il ripristino del
       * video
       */
      setTimeout(function(){
        sourcevid.play();
        remotevid.play();
      },1000);
    },
    
    /**
     * si occupa di chiudere la chiamata in corso se si è premuto il tasto
     * termina chiamata dal callView
     */
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
      var message={type : 'endCall', contact: recipient.toJSON().username};
      Connection.send(JSON.stringify(message));
      Connection.removeEventListener('message', onMessaggeListener, false);
    }
  
};
