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
    
  var remoteStream = [];
    
  var peerConnection = [];
    
  var recipient = [];
    
  var remotevid = [];
       
  var sourcevid = null;
   
  var onAddConferenceListener = null;
  
  var onCandidateListener = null;
  
  var onEndCallListener=null;
    
  var readyToSend = [];
    
  var messageReceived = [];
    
  var candidates = [];
    
  var confirmedContact=[];
  
  return {
	
    /**
     * funzione che inoltra la richiesta di chiamata ad uno o più utenti al server e attende una risposta
     */
    sendCall: function (typeCall, contact, callView, conference){
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
      
      var message;
      sourcevid = document.getElementById('sourcevid');
      if(typeCall=='video'){
        navigator.webkitGetUserMedia({video:true, audio:true},
        function(stream) {
          sourcevid.src = window.webkitURL.createObjectURL(stream);
          localStream=stream;	
          Connection.addEventListener('message', onAnswer, false);
          for(var i=0;i<recipient.length;i++){
            message= {type:'call', contact: recipient[i] ,  callType:typeCall, conference:conference};
          /**
            * aggiunta del listener per la ricezione della risposta dell'utente chiamato
            */
            Connection.send(JSON.stringify(message));
          }
        });
      }else if(typeCall=='audio'){
        navigator.webkitGetUserMedia({video:false, audio:true},
        function(stream) {
          sourcevid.src = window.webkitURL.createObjectURL(stream);
          localStream=stream;	
          Connection.addEventListener('message', onAnswer, false);
          for(var i=0;i<recipient.length;i++){
            message= {type:'call', contact: recipient[i] ,  callType:typeCall, conference:conference};
          /**
            * aggiunta del listener per la ricezione della risposta dell'utente chiamato
            */
            Connection.send(JSON.stringify(message));
          }
        });
      }
      /**
       * viene impostata questa variabile per poter tener traccia della funzione stessa
       * e per essere quindi utilizzata in funzioni anonime
       */
      var call=this;
      
      
      var answerReceived=0;   /** risposte ricevute **/
      var confirmReceived=0;  /**risposte di conferma ricevute*/
      
      /**
       * metodo per la gestione della risposta ricevuta dall'utente chiamato
       */
      function onAnswer(evt){
        var response = JSON.parse(evt.data);
        if(response.type==='answeredCall'){
          /**
           * controllo la risposta del chiamato, se positiva avvio la chiamata e aggiorno il valore
           * delle persone che mi hanno contattato
           */
          answerReceived++;
          if(response.answer==='true'){
            confirmReceived++;
            confirmedContact.push(response.user);
            /**
             * aggiungo un tag video con id uguale al nick della persona che ha confermato la chiamata
             */
            callView.addVideoConference(response.user) 
            var isCaller=true;
            
            /**
             * avvio la chiamata vera e propria con quell'utente
             */
            call.startCall(isCaller, call, callView,response.user)
            
            /**
             * in caso sia una videoconferenza inviero un messaggio a tutti gli utenti
             * che hanno già accettato di partecipare alla videoconferenza la presenza
             * del nuovo utente, ed inviero al nuovo utente la presenza di tutti gli utenti
             * già presenti nella videoconferenza
             */
            for(var i=0;i<confirmedContact.length-1;i++){
              message= {type:'addConferenceCaller', user: confirmedContact[i], contact: response.user};
              Connection.send(JSON.stringify(message));
              message= {type:'addConferenceAnswer', user: response.user, contact: confirmedContact[i]};
              Connection.send(JSON.stringify(message));
            }
          }else{
            /**
             * se ho ricevuto una risposta negativa da parte di un utente controllo se
             * ho già ricevuto una risposta da tutti gli utenti, e il numero di persone che hanno 
             * accettato di partecipare alla chiamata/videoconferenza, in caso abbia ricevuto risposta
             * da tutti gli utenti e sia stata sempre negativa rendo nuovamente disponibile alla chiamata l'utente
             */
            if(answerReceived==recipient.length && confirmReceived==0){
              var event=new CustomEvent('setOnCall',{
                detail:{
                  type:false
                },
                bubbles:true,
                cancelable:true
              });
              localStream.stop();
              
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
          /**
           * se ho ricevuto risposta da tutti gli utenti contattati chiudo il listener
           */
           
          if(answerReceived==recipient.length){
            Connection.removeEventListener('message',onAnswer,false);
          }
        }
      }
    },
    
    /**
     * funzione che invia al server la risposta dell'utente chiamato e avvia la chiamata con
     * uno o più utenti
     */
    sendAnswer: function (typeCall, contact, callView,conference){
      sourcevid = document.getElementById('sourcevid');
      callView.addVideoConference(contact);
      var call=this;
      Connection.addEventListener('message', onAddConference, false);
      var allow=true;
      /**
       * richiesta di accensione della telecamera
       */
      if(typeCall=='video'){
        navigator.webkitGetUserMedia({video:true, audio:true},
        function(stream) {
          if(allow==true){
            sourcevid.src = window.webkitURL.createObjectURL(stream);
            localStream=stream;

            var message = {type:'answeredCall',contact: contact, conference:conference};
            Connection.send(JSON.stringify(message));
            /**
             * avvio la chiamata con la persona che mi ha contattato
             */
            call.startCall(false, call, callView,contact);
            recipient.push(contact);
            confirmedContact.push(contact);
          }else{
            stream.stop();
          }
        },
        function(error){
          var message = {
            type:'refuseCam',
            contact: contact
          };
          Connection.send(JSON.stringify(message));
          var event=new CustomEvent('setOnCall',{
            detail:{
              type:false
            },
            bubbles:true,
            cancelable:true
          });
          document.dispatchEvent(event);
        });
      }else if(typeCall=='audio'){
        navigator.webkitGetUserMedia({video:false, audio:true},
        function(stream) {
          if(allow==true){
            sourcevid.src = window.webkitURL.createObjectURL(stream);
            localStream=stream;
            var message = {type:'answeredCall',contact: contact};
            Connection.send(JSON.stringify(message));
            /**
             * avvio la chiamata con la persona che mi ha contattato
             */
            call.startCall(false, call, callView,contact);
            recipient.push(contact);
            confirmedContact.push(contact);
          }else{
            stream.stop();
          }
          
        },
        function(error){
          var message = {
            type:'refuseCam',
            contact: contact
          };
          Connection.send(JSON.stringify(message));
          var event=new CustomEvent('setOnCall',{
            detail:{
              type:false
            },
            bubbles:true,
            cancelable:true
          });
          document.dispatchEvent(event);
        });
      }
      
     function onAddConference(evt){
        var response = JSON.parse(evt.data);
        
        if (response.type==='addConferenceCaller'){
          recipient.push(response.user);
          confirmedContact.push(response.user);
          callView.addVideoConference(response.user)
          call.startCall(false, typeCall, call, callView,response.user)
        }
        if (response.type==='addConferenceAnswer'){
          recipient.push(response.user);
          confirmedContact.push(response.user);
          callView.addVideoConference(response.user)
          call.startCall(true, typeCall, call, callView,response.user)
        }
        if (response.type==='endCallEarly'){
          allow=false;
        }
      }
      onAddConferenceListener=onAddConference;
    },

    
    /**
     * creo la peerconnection
     */
    createPeerConnection : function(user) {
      /**
       * ascoltatore che capisce quando viene inserito all'interno di una peerconnection uno stream da un utente remoto
       */
      function onRemoteStreamAdded(event) {
        console.log("Added remote stream");
        /**
         * associo alla tag giusta il video dell'utente remoto
         */
        if(remoteStream[user]==null){
          remotevid[user].src = window.webkitURL.createObjectURL(event.stream);
          remoteStream[user]=event.stream;
        }
        var event=new CustomEvent("setPeerConn",{
          detail:{
            peercon:peerConnection[user]
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
        peerConnection[user]=new webkitRTCPeerConnection(pcConfig);
        /**
         * creo un array a due dimensioni
         */
        candidates[user]=[];
        peerConnection[user].onicecandidate = function(event){
      /**
        * funzione interna che si occupa di salvare gli icecandidate e di inviarli all'altro utente
        * solo nel qualcaso l'utente con cui si instaura la chiamata sia pronto a ricevere altrimenti
        * vengono salvati per poi inviarli successivamente
        */ 
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
    
    /**
     * l'utente che ha iniziato la chiamata instaura la connessione inviando 
     * l'offerta e creando il proprio peerconnection
     */
    connect : function(started,user) {
      if (!started && localStream ) {	  
        this.createPeerConnection(user);	  
        peerConnection[user].addStream(localStream);
        console.log('Adding local stream...');
        peerConnection[user].createOffer(
      /**
        * funzione interna che si occupa di settare il sdp locale della peerconnection e di inviarlo
        * all'altro utente
        */
        function(desc){
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
     * instaura la chiamata
     */
    startCall: function (isCaller, call, callView,contact){
      remotevid[contact]=document.getElementById(contact);
      remoteStream[contact]=null;
      var started = false;
      var description=null;
      /**
       * listener che si occupano di riceve i vari messaggi dal server e in base al tipo
       * effettuare determinate azioni
       */
      /**
       * si occupa di gestire il pacchetto sdp
       */
      if(isCaller==false){
        Connection.addEventListener('message', onOfferSDP, false);
      }else{
        Connection.addEventListener('message', onAnswerSDP, false);
      }
      Connection.addEventListener('message', onCandidate, false);
      Connection.addEventListener('message', onEndCall, false);
      Connection.addEventListener('message', onCandidateReady, false);
      

      function onOfferSDP(evt){
        var response = JSON.parse(evt.data);
        /**
         * una volta che il chiamante invia la su offerta (cioè il suo sdp) viene creato 
         * una nuova peerconection con chiave per ricavarla uguale al nome dell'utente
         * con cui si sta instaurando una chiamata. Viene inoltre settato sdp e inviato il proprio
         * sdp all'altro utente
         */
        if (response.type==='offer' && !isCaller && response.contact==contact){
          started = true;
          call.createPeerConnection(contact);
          peerConnection[contact].addStream(localStream);
          peerConnection[contact].setRemoteDescription(new RTCSessionDescription(response));
          peerConnection[contact].createAnswer(function(desc){
            peerConnection[contact].setLocalDescription(desc);  
            var response=JSON.stringify(desc);
            var credentials={type: 'sdp', description: response, contact: contact};
            Connection.send(JSON.stringify(credentials));
          })
          Connection.removeEventListener('message',onOfferSDP,false);       
        }
      }
        
      /**
        * una volta ricevuta la risposta (sdp del chiamato) imposto 
        * nella peerconnection relativo a quell'utente lo sdp remoto
        */
      function onAnswerSDP(evt){
        var response = JSON.parse(evt.data);
        if (response.type==='answer' && isCaller && response.contact==contact){
          started=true;
          peerConnection[contact].setRemoteDescription(new RTCSessionDescription(response));
          Connection.removeEventListener('message',onAnswerSDP,false);  
        }
      }
        
        /**
         * si occupa di impostare i candidati ricevuti da un particolare utente
         * all'interno della peerconnection associata a quell'utente
         */
      function onCandidate(evt){
        var response = JSON.parse(evt.data);
        if (response.type ==='candidate' && started && response.contact==contact) {
          console.log('STARTED TRUE');
          console.log('Adding candidate ');
          var candidate = new RTCIceCandidate({sdpMLineIndex:response.label,
          candidate:response.candidate});
          peerConnection[response.contact].addIceCandidate(candidate);
        }
      }
      
      onCandidateListener=onCandidate;
        
        /**
         * si occupa di rimuovere dalla peerconnection dell'utente che ha chiuso la chiamata e
         * in caso non ci siano più peerconnection attive chiude il proprio localStream riportando
         * l'utente nella schermata di functionview
         */
      function onEndCall(evt){
        console.log('RECEIVED: '+evt.data);
        var response = JSON.parse(evt.data);
        if (response.type ==='endCall' && response.contact==contact) {
          if(peerConnection[contact]!=null){
            peerConnection[contact].removeStream(localStream);
            peerConnection[contact].close();
          }
          var trovatoConfirmed=false;
          var i=0;
          while(trovatoConfirmed==false){
            if(confirmedContact[i]==contact){
              trovatoConfirmed=true;
            }else{
              i++;
            }
          }
          var trovatoRecipient=false;
          var j=0;
          while(trovatoRecipient==false){
            if(recipient[j]==contact){
              trovatoRecipient=true;
            }else{
              j++;
            }
          }
          if(trovatoConfirmed==true){
            confirmedContact.splice(i,1);
            recipient.splice(j,1);
            remotevid[contact].parentNode.removeChild(remotevid[contact]);
            remotevid.splice(i,1);
          }
          /**
           * reimposto nuovamente la mia disponibilità per la disponibilità di chiamata in 
           * ingresso se non ci sono più utenti con cui comunicare
           */
          if(confirmedContact.length==0){
            localStream.stop();
            var event=new CustomEvent('setOnCall',{
              detail:{
                type:false
              },
              bubbles:true,
              cancelable:true
            });
            document.dispatchEvent(event);
            console.log('end stream');
            callView.endCall(false);
            Connection.removeEventListener('message',onCandidateListener,false);
            Connection.removeEventListener('message',onEndCall,false);
          } 
        }
      }
      onEndCallListener=onEndCall  
        /**
         * riconosce il fatto che l'utente remoto è pronto a ricevere candidati
         */ 
      function onCandidateReady(evt){
        var response = JSON.parse(evt.data);
        if (response.type ==='candidateReady' && response.contact==contact) {
          messageReceived[contact]=true;
          if(readyToSend[contact]){
            candidates[contact].forEach(
              function(candidate){
                Connection.send(candidate);
                console.log('C->S: ' + candidate);
              }
            );
          }
          Connection.removeEventListener('message',onCandidateReady,false);
        }
        console.log('Processing signaling message...');
      }
      if(isCaller){
        call.connect(started,contact);
      }
      /** 
       * se sono il chiamante inizializzo lo stream video
       */ 
    },
    
    /**
     * ripristino la visione dello stream video ed audio o solo audio nel
     * caso durante la chiamata abbia selezionato un altro utente
     */
    recoverCall: function (callView) {
      sourcevid = document.getElementById('sourcevid');
      for(var i=0;i<confirmedContact.length;i++){
        console.log("Utente ripristina "+confirmedContact[i]);
        callView.addVideoConference(confirmedContact[i]);
        remotevid[confirmedContact[i]] = document.getElementById(confirmedContact[i]);
        remotevid[confirmedContact[i]].src = window.webkitURL.createObjectURL(remoteStream[confirmedContact[i]]);
        console.log(remoteStream[confirmedContact[i]]);
      }
      sourcevid.src = window.webkitURL.createObjectURL(localStream);
      
      /**
       * è stato impostato un delay poichè non avveniva istantaneamente il ripristino del
       * video
       */
      setTimeout(function(){
        sourcevid.play();
        for(var i=0;i<confirmedContact.length;i++){
          remotevid[confirmedContact[i]].play();
        }
      },1000);
    },
    
    /**
     * si occupa di chiudere la chiamata in corso se si è premuto il tasto
     * termina chiamata dal callView
     */
    endCall: function() {
      console.log('grandezza di recipient '+recipient.length);
      for(var i=0;i<recipient.length;i++){
        if(peerConnection[recipient[i]] != null){
          peerConnection[recipient[i]].removeStream(localStream);
          peerConnection[recipient[i]].close();
          peerConnection[recipient[i]]=null;
          var message={type : 'endCall', contact: recipient[i]};
        }else{
          var message={type : 'endCallEarly', contact: recipient[i]};
        }
        
        Connection.send(JSON.stringify(message));
      }
      if(localStream!=null){
        localStream.stop()
      }
      recipient.splice(0,recipient.length);
      confirmedContact.splice(0,confirmedContact.length);
      var event=new CustomEvent("setOnCall",{
        detail:{
          type:false
        },
        bubbles:true,
        cancelable:true
      });
      if(onAddConferenceListener==null){
        Connection.removeEventListener('message',onAddConferenceListener,false);
      }
      Connection.removeEventListener('message',onCandidateListener,false);
      Connection.removeEventListener('message',onEndCallListener,false);
      document.dispatchEvent(event);
    }

  
  };
	
});
