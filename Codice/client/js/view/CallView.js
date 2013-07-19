/**
 * Nome: CallView.js
 * Package: View
 * Autore: Palmisano Maria Antonietta
 * Data: 2013/05/17
 * Versione: 2.0
 *
 * Modifiche:
 * +--------+---------------+-----------------------------+
 * | Data   | Programmatore |     Modifiche               | 
 * +--------+---------------+-----------------------------+
 * | 130710 |    BG         | + metodo conference         | 
 * |        |               | + metodo addVideoConference | 
 * +--------+---------------+-----------------------------+ 
 * | 130518 |    PMA        | + metodo che chiude la      | 
 * |        |               |   chiamata                  | 
 * +--------+---------------+-----------------------------+ 
 * | 130517 |    PMA        | + creazione documento       | 
 * +--------+---------------+-----------------------------+

 */

//definizione delle dipendenze
define([
 'jquery',
 'underscore',
 'backbone',
 'communication/CallCommunication',
 'text!template/CallTemplate.html',
 'view/StatisticsView'
], function($, _, Backbone, CallCommunication, CallTemplate, StatisticsView){

  var CallView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events:{
      'click button#endCall':'endCall'
    },

    el : $('#content'),

    template : _.template(CallTemplate),
    
    statisticsView:'',
    
    calling:'',

    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      this.calling=false;
      _.bindAll(this, 'render');
      this.statisticsView = new StatisticsView();
    },

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(isCaller,typeCall, contact){
      /**
      * controllo se nel DOM esiste l'elemento content, se non esiste viene reinserito nel documento
      */
      this.delegateEvents();
      if(!document.getElementById('content')){
        $('#main').prepend(this.el);
      }
      $(this.el).html(this.template({ username: contact }));
      if(!document.getElementById('statistics'))
        $('#main').insertBefore($('#statistics'), $('#chat'));

     /**
      * si controlla se l'attuale vista ha già una chiamata in corso
      * se si viene ripristinata la visualizzazione della chiamata
      * rendendo nuovamente visibile lo stream video ed audio e le statistiche
      * altrimenti significa che si sta instaurando una nuova chiamata
      * si invocano quindi metodi in base se si è il chiamante o il chiamato
      * della chiamata
      */
      var call=this;
      if(this.calling){
        console.log("prova ripristino");
        CallCommunication.recoverCall(call);
        this.statisticsView.render();
      }else{
        if(isCaller===false){
          CallCommunication.sendAnswer(typeCall, contact, this,'false');
          this.calling=true;
        }else{
          var temp=[];
          temp.push(contact);
          CallCommunication.sendCall(typeCall, temp, this,'false');
          this.calling=true;
        }
      }
    },

    /**
     *  metodo per la chiusura della chiamata
     */
    endCall:function(isEnding){
      /**
       *  controllo che si effettua per verificare chi ha deciso di concludere la chiamata
       */
       console.log("CHIUSURA IN CORSO");
      if(isEnding!=false)
        CallCommunication.endCall();
      if(this.statisticsView){
        this.statisticsView.close();
      }
      this.remove();
      this.unbind();
      this.options.FunctionsView.closeViewCall();
      this.statisticsView.close();
    },
    
    conference:function(isCaller,typeCall,contatti){
      if(!document.getElementById('content')){
        $('#main').prepend(this.el);
      }
      this.delegateEvents();
        var call=this;
        $(this.el).html(this.template());
        if(this.calling){
          console.log("prova ripristino");
          CallCommunication.recoverCall(call);
        }else{
          console.log("Contatti" +contatti)
          if(isCaller==true){
            CallCommunication.sendCall(typeCall,contatti,this,'true');
            this.calling=true
          }else{
            CallCommunication.sendAnswer(typeCall,contatti,this,'true');
            this.calling=true
          }
        }
      
    },

    addVideoConference:function(nameCaller){
      var video="<video id='"+nameCaller+"' autoplay></video>";
      $('#otherCaller').append(video);
      if(document.getElementById("otherCaller").childNodes.length==2){
				document.getElementById("otherCaller").childNodes[0].style.width='49%';
				document.getElementById("otherCaller").childNodes[1].style.width='49%';
			}
      if(document.getElementById("otherCaller").childNodes.length==3){
				document.getElementById("otherCaller").childNodes[0].style.width='33%';
				document.getElementById("otherCaller").childNodes[1].style.width='33%';
								document.getElementById("otherCaller").childNodes[2].style.width='33%';
			}
      if(document.getElementById("otherCaller").childNodes.length>=4){
				for(var i=0; i<document.getElementById("otherCaller").childNodes.length; i++){
					document.getElementById("otherCaller").childNodes[i].style.height='49%';
			  }
			}

      
    }
  });

  CallView.prototype.close = function(){
    
    CallCommunication.endCall();
    if(this.statisticsView){
      this.statisticsView.close();
    }
    this.remove();
    this.unbind();
  };

  return CallView;

});
