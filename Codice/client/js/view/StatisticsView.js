/*
 * Nome: StatisticsView.js
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
 
//definizione delle dipendenze
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
    //si occupa di legare gli eventi ad oggetti del DOM
    el : $('#statistics'),
	
    //indica in quale parte del DOM gestirà 
    statisticsTemplate : _.template(StatisticsTemplate),
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
      if(!document.getElementById('statistics')){
        $('#main').append(this.el);
        $(this.el).html(this.statisticsTemplate({time: 0, sentAudio: 0, sentVideo: 0,latency: 0, bitrate: 0}));
      }
      document.addEventListener("setPeerConn",setPeerConn,false);
      var view=this;
      function setPeerConn(event){
        peerConnection=event.detail.peercon;
        var baseTime;
        var prevTime;
        var bitprev;
        var actualtime;
        if(interval){
          clearInterval(interval);
        }
        else{
          baseTime=0;
          prevTime=0;
          bitprev=0;
          actualtime=0;
        }
        interval= setInterval(function() {
          if (peerConnection && peerConnection.getRemoteStreams()[0]) {
            if (peerConnection.getStats) {
              peerConnection.getStats(function(stats) {
                var byteAudioSent=0;
                var byteVideoSent=0;
                var time=0;
                var bitrate=0;
                var latency=0;
                var results = stats.result();
                var audio=0;
                prevTime=actualtime
                for (var i = 0; i < results.length; ++i) {
                  var res = results[i];
                  actualtime=res.timestamp;
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
                
                bitrate = Math.round((((parseInt(byteVideoSent)+parseInt(byteAudioSent)) - parseInt(bitprev)) /
                                    ((actualtime - prevTime)/1000))/1024);
                console.log(actualtime );
                bitprev=parseInt(byteVideoSent)+parseInt(byteAudioSent);                    
                
                byteAudioSent=Math.round(byteAudioSent/1024);
                byteVideoSent=Math.round(byteVideoSent/1024);
                
                time=Math.floor(time/1000);
                var hour=Math.floor(time/3600);
                time=time-3600*hour;
                var minute=Math.floor(time/60);
                time=time-60*minute;
                var second=time;
                
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
                  
                $(view.el).html(view.statisticsTemplate({time: timeToDisplay, sentAudio: byteAudioSent, sentVideo: byteVideoSent,latency: latency, bitrate: bitrate}));
              })     
            }
          }
        },1000);
      };
    }
  });

  StatisticsView.prototype.close = function(){
    this.remove();
    this.unbind();
    clearInterval(interval);
    peerConnection=null
  };

  return StatisticsView;

});

