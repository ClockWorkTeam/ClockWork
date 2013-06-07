/**
 * Nome: StatisticsView.js
 * Package: View
 * Autore: Furlan Valentino
 * Data: 2013/05/16
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+-----------------------+
 * |  Data  | Programmatore |         Modifiche     |
 * +--------+---------------+-----------------------+
 * | 130518 |     FV        | + metodo che aggiorna |
 * |        |               |   le statistiche di   |
 * |        |               |   chiamata            |
 * |        |               | + metodo che mette in |
 * |        |               |   attesa l'ascoltatore|
 * |        |               |   per ricevere un     |
 * |        |               |   peerConnection      |
 * +--------+---------------+-----------------------+
 * | 130516 |     FV        | + creazione documento |
 */

define([
 'jquery',
 'underscore',
 'backbone',
 'text!templates/StatisticsTemplate.html',
 'communication/CallCommunication'
], function($, _, Backbone, StatisticsTemplate, CallCommunication){
  var interval=null;
  var peerConnection=null;
  var StatisticsView = Backbone.View.extend({
    el : '#statistics',

    template : _.template(StatisticsTemplate),

    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function(){
      if(!document.getElementById('statistics')){
        $('#main').append(this.el);
        $(this.el).html(this.template({time: 0, sentAudio: 0, sentVideo: 0,latency: 0, bitrate: 0}));
      }
      this.readStatistic();
    },

      /**
       * funzione che si occupa di tenere aggiornate le statistiche della chiamata in corso
       */
    readStatistic: function(){
      document.addEventListener("setPeerConn",setPeerConn,false);
      var view=this;
      /**
       * ascoltatore che rimane in attesa di ricevere un peerConnection dalla callCommunication
       */
      function setPeerConn(event){
        peerConnection=event.detail.peercon;
        var baseTime;
        var prevTime;
        var bitPrev;
        var actualTime;

        /**
         * condizione realizzata per impedire l'avvio di due intervall della stessa chiamata
         */
        if(interval){
          clearInterval(interval);
        }
        else{
          baseTime=0;
          prevTime=0;
          bitPrev=0;
          actualTime=0;
        }

        /**
         * metodo che aggiorna le statistiche di una chiamata ad ogni secondo passato
         */
        interval= setInterval(function() {
          if (peerConnection && peerConnection.getRemoteStreams()[0]) {
            if (peerConnection.getStats) {
              peerConnection.getStats(function(stats) {
                var byteAudioSent=0;
                var byteVideoSent=0;
                var time=0;
                var bitRate=0;
                var latency=0;
                var results = stats.result();
                var audio=0;
                prevTime=actualTime
                for (var i = 0; i < results.length; ++i) {
                  var res = results[i];
                  actualTime=res.timestamp;
                  if(baseTime==0){
                    baseTime=res.timestamp;
                  }
                  time=res.timestamp-baseTime;

                  if(res.stat("bytesSent")){
                    if(audio==0){
                      byteAudioSent=res.stat("bytesSent");
                      audio=1;
                    }
                    else{
                      byteVideoSent=res.stat("bytesSent");
                    }
                  }
                  if(res.stat("googRtt")){
                    latency=res.stat("googRtt")/2;
                  }
                }

                bitRate = Math.round((((parseInt(byteVideoSent)+parseInt(byteAudioSent)) - parseInt(bitPrev)) /
                                    ((actualTime - prevTime)/1000))/1024);
                bitPrev=parseInt(byteVideoSent)+parseInt(byteAudioSent);

                byteAudioSent=Math.round(byteAudioSent/1024);
                byteVideoSent=Math.round(byteVideoSent/1024);

                time=Math.floor(time/1000);
                var hour=Math.floor(time/3600);
                time=time-3600*hour;
                var minute=Math.floor(time/60);
                time=time-60*minute;
                var second=time;

                /**
                 * serie di condizioni fatte allo scopo di poter ottenere la data nel formato hh:mm:ss
                 */
                if(hour<10)
                  timeToDisplay="0"+hour+":";
                else
                  timeToDisplay=hour+":";
                if(minute<10)
                  timeToDisplay=timeToDisplay+"0"+minute+":";
                else
                  timeToDisplay=timeToDisplay+minute+":";
                if(second<10)
                  timeToDisplay=timeToDisplay+"0"+second;
                else
                  timeToDisplay=timeToDisplay+second;

                $(view.el).html(view.template({time: timeToDisplay, sentAudio: byteAudioSent, sentVideo: byteVideoSent,latency: latency, bitrate: bitRate}));
              })
            }
          }
        },1000);
      };
    }
  });

  /**
   * si occupa di chiudere la vista
   */
  StatisticsView.prototype.close = function(){
    this.remove();
    this.unbind();
    clearInterval(interval);
    peerConnection=null
  };

  return StatisticsView;

});

