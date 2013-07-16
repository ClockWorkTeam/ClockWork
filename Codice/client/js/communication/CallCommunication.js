/**
 * Nome:CallCommunication.js
 * Package: Communication
 * Autore: Zohouri Haghian Pardis
 * Data: 2013/04/09
 * Versione: 1.0
 * 
 * Modifiche:
 * +---------+---------------+------------------------------------------+
 * | Data    | Programmatore |        Modifiche                         |
 * +---------+---------------+------------------------------------------+ 
 * |130712   |    BG         | # Inserito controllo onIceCandidate      | 
 * |         |               |   allo scopo di verificare se è una      | 
 * |         |               |   videoconferenza o meno
 * +---------+---------------+------------------------------------------+
 * |13/07/11 |    BG         | + Medoto sendCallConference              | 
 * |         |               | + Medoto sendAnswerConference            | 
 * |         |               | + Medoto startCallConference             | 
 * |         |               | + Metodo addCallConference               | 
 * |         |               | + Metodo createPeerConnectionConference  | 
 * |         |               | # Modificato medoto gotDescription       | 
 * +---------+---------------+------------------------------------------+
 * |13/04/12 |    PMA        | + Medoto recoverCall                     | 
 * +---------+---------------+------------------------------------------+
 * |13/04/11 |    ZHP        | # Gestione migliorata di startCall       | 
 * |         |               |   per la chiusura chiamata               | 
 * |         |               | # Globalizzazione delle variabili        | 
 * |         |               |                                          | 
 * +---------+---------------+------------------------------------------+ 
 * |13/04/10 |    ZHP        | + Metodo endCall                         | 
 * +---------+---------------+------------------------------------------+
 * |13/04/10 |    CM         | # Completamente startcall                | 
 * |         |               |   possibilità di effettuare              | 
 * |         |               |   chiamate                               | 
 * +---------+---------------+------------------------------------------+
 * |13/04/09 |    ZHP        | + Metodo sendCall                        | 
 * |         |               | + Metodo sendAnswer                      | 
 * |         |               | + Bozza startCall                        | 
 * |_________|_______________|__________________________________________| 
 */
 
/**
 * classe che si occupa di gestire l'avvio della comunicazione tra due utenti
 */
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
  
  var lastPeerConnection=null;
  
  return {
	
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
      var message = { type:'call', contact: recipient, callType:typecall};
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
      lastPeerConnection=-1;
      var confirmedContact=[]; /**controlla chi ha accettato fino ad ora la conferenza*/
      candidates=[];
      readyToSend=[];
      messageReceived=[];
      remotevid=[];
      remoteStream=[];
      peerConnection=new Array();
      var event=new CustomEvent('setOnCall',{
        detail:{
          type:true
        },
        bubbles:true,
        cancelable:true
      });
      document.dispatchEvent(event);
      recipient=contact;
      
      var message;
      sourcevid = document.getElementById('sourcevid');
      navigator.webkitGetUserMedia({video:true, audio:true},
      function(stream) {
        sourcevid.src = window.webkitURL.createObjectURL(stream);
        localStream=stream;	
        Connection.addEventListener('message', onAnswer, false);
        for(var i=0;i<recipient.length;i++){
          console.log(recipient[i]);
          message= {type:'callConference', contact: recipient[i] ,  callType:typecall};
          Connection.send(JSON.stringify(message));
        }
      });

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
            confirmedContact.push(response.user);
            for(var i=0;i<confirmedContact.length-1;i++){
              console.log("Contattiamo " + confirmedContact[i]);
              message= {type:'addConferenceCaller', user: confirmedContact[i], contact: response.user, callType:typecall};
              Connection.send(JSON.stringify(message));
              message= {type:'addConferenceAnswer', user: response.user, contact: confirmedContact[i], callType:typecall};
              Connection.send(JSON.stringify(message));
            }
            console.log("Utente responsabile " +response.user);
            callView.addVideoConference(response.user)
            var isCaller=true;
            call.startCallConference(isCaller, typecall, call, callView,response.user)
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
      var message = {type:'answeredCall', contact: recipient};
      Connection.send(JSON.stringify(message));
      this.startCall(false, typecall, this, callView);
    },
    
    /**
     * funzione che invia al server la risposta dell'utente chiamato e avvia la videoconferenza con più utenti
     */
    sendAnswerConference: function (typecall, contact, callView){
      sourcevid = document.getElementById('sourcevid');
      lastPeerConnection=-1;
      candidates=[];
      readyToSend=[];
      messageReceived=[];
      recipient=[];
      recipient.push(contact);
      remotevid=[];
      remoteStream=[];
      peerConnection=new Array();
      callView.addVideoConference(contact);
      console.log(recipient);
      var call=this;
      
      navigator.webkitGetUserMedia({video:true, audio:true},
      function(stream) {
        sourcevid.src = window.webkitURL.createObjectURL(stream);
        localStream=stream;
        var message = {type:'answeredCallConference',contact: contact};
        Connection.send(JSON.stringify(message));
        call.startCallConference(false, typecall, call, callView,contact);
        Connection.addEventListener('message', onAddConference, false);
      });
      function onAddConference(evt){
        var response = JSON.parse(evt.data);
        
        if (response.type==='addConferenceCaller'){
          console.log("Un nuovo utente è arrivato" + response.user);
          callView.addVideoConference(response.user)
        }
        if (response.type==='addConferenceAnswer'){
          console.log("Un nuovo utente è arrivato" + response.user);
          callView.addVideoConference(response.user)
        }
      }
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
    
    createPeerConnectionConference : function(user) {
      /**
       * ascoltatore che capisce quando viene inserito all'interno di una peerconnection uno stream da un utente remoto
       */
      console.log("Utente in createPeerConnectionConference "+user);
      function onRemoteStreamAdded(event) {
        console.log("Added remote stream");
        if(remoteStream[user]==null){
          remotevid[user].src = window.webkitURL.createObjectURL(event.stream);
        }
        remoteStream[user]=event.stream;
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
        peerConnection[user].removeStream(this.localStream);
        peerConnection[user].close();
      }

      var pcConfig = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
      try {
        console.log("Creating peer connection");
        console.log(user);
        peerConnection[user]=new webkitRTCPeerConnection(pcConfig);
        candidates[user]=[];
        console.log("PeerConnection usati "+peerConnection.length);
        peerConnection[user].onicecandidate = function(event){
          if (event.candidate){
            var candidate=JSON.stringify({
              type: 'candidate',
              label: event.candidate.sdpMLineIndex,
              id: event.candidate.sdpMid,
              candidate: event.candidate.candidate
            });
            var message = JSON.stringify({type: 'candidate', candidate: candidate, contact: user});
            candidates[user].push(message);
          }else{
            console.log('End of candidates.');
              readyToSend[user]=true;
            /**
             * controllo se l'utente remoto è pronto a ricevere messaggi
             */
            if(messageReceived[user]==true){
              candidates[user].forEach(
                function(candidate){
                  Connection.send(candidate);
                  console.log('C->S: ' + candidate);
                }
              );
            }
            var message = JSON.stringify({type: 'candidateReady', contact: user});
            Connection.send(message);
          }
      
      };
    }
    catch (e) {
      console.log('Failed to create peerConnection, exception: ' + e.message);
    }
    peerConnection[user].addEventListener("addstream", onRemoteStreamAdded, false);
    peerConnection[user].addEventListener("oniceconnectionstatechange", onRemoteStreamRemoved, false)
    },
    
    connectConference : function(started,user) {
      if (!started && localStream ) {	  
        this.createPeerConnectionConference(user);	  
        peerConnection[user].addStream(localStream);
         console.log('Adding local stream...'+user);
        console.log('Adding local stream...');
        peerConnection[user].createOffer(function(desc){
          peerConnection[user].setLocalDescription(desc);  
          var response=JSON.stringify(desc);
          var credentials={type: 'sdp', description: response, contact: user};
          Connection.send(JSON.stringify(credentials));
        });
      }else {
        alert('Local stream not running yet.');
      }
    },
    
    /**
     * funziona che si occupa di settare il sdp locale della peerconnection e di inviarlo
     * all'altro utente
     */
    gotDescription : function(desc){
      if(lastPeerConnection==null){
        peerConnection.setLocalDescription(desc);
        var response=JSON.stringify(desc);
        var credentials={type: 'sdp', description: response, contact: recipient};
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
        var message = JSON.stringify({type: 'candidate', candidate: candidate, contact: recipient});
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
        var message = JSON.stringify({type: 'candidateReady', contact: recipient});
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
      
      remotevid[contact]=document.getElementById(contact);
      console.log("Conference");
      remoteStream[contact]=null;
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
            call.createPeerConnectionConference(contact);
            peerConnection[contact].addStream(localStream);
            peerConnection[contact].setRemoteDescription(new RTCSessionDescription(response));
            peerConnection[contact].createAnswer(function(desc){
              peerConnection[contact].setLocalDescription(desc);  
              var response=JSON.stringify(desc);
              var credentials={type: 'sdp', description: response, contact: contact};
              Connection.send(JSON.stringify(credentials));
            })
          }       
        }
        
        /**
         * una volta ricevuta la risposta (sdp del chiamato) imposto 
         * imposto nella peerconnection lo sdp del remoto
         */
        if (response.type==='answer' && isCaller){
          started=true;
          peerConnection[contact].setRemoteDescription(new RTCSessionDescription(response));
        }
        
        /**
         * si occupa di impostare i candidati all'interno della peerconnection
         */
        if (response.type ==='candidate' && started) {
          console.log('STARTED TRUE');
          console.log('Adding candidate to '+response.contact);
          var candidate = new RTCIceCandidate({sdpMLineIndex:response.label,
          candidate:response.candidate});
          peerConnection[response.contact].addIceCandidate(candidate);
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
          messageReceived[contact]=true;
          console.log("pronto ad inviare");
          if(readyToSend[contact]){
            candidates[contact].forEach(
              function(candidate){
                Connection.send(candidate);
                console.log('C->S: ' + candidate);
              }
            );
          }
        }
        console.log('Processing signaling message...');
      }
      if(isCaller && typecall=='video'){
        lastPeerConnection++;
        console.log("Utente in start conference "+contact);
        call.connectConference(started,contact);
      }
      /** 
       * se sono il chiamante inizializzo lo stream video
       */ 
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
      var message={type : 'endCall', contact: recipient};
      Connection.send(JSON.stringify(message));
      Connection.removeEventListener('message', onMessaggeListener, false);
      
    }

  
  };
	
});
