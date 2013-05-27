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
        $('#main').prepend(this.el);
      }
      document.addEventListener("setPeerConn",setPeerConn,false);
      var view=this;
      function setPeerConn(event){
        var peerConnection=event.detail.peercon;
        var baseTime=0;
        var prevTime=0;
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
                for (var i = 0; i < results.length; ++i) {
                  var res = results[i];
                  if(baseTime==0){
                    baseTime=res.timestamp;
                  }
                  time=res.timestamp-baseTime;
                  res.timestamp;
                  
                  if(res.stat("bytesSent")){
                    if(audio==0){
                      byteAudioSent=res.stat("bytesSent");
                      audio=1;
                    }
                    else
                      byteVideoSent=res.stat("bytesSent");
                  }
                  if(res.stat("googBucketDelay")){
                    latency=res.stat("googBucketDelay");
                  }
                  if(res.stat("googTransmitBitrate")){
                    bitrate=res.stat("googTransmitBitrate");
                  }  
                }
                bitrate=Math.round(bitrate/8);
                byteAudioSent=Math.round(byteAudioSent/1024);
                byteVideoSent=Math.round(byteVideoSent/1024);
                var data=new Date();
                time=Math.floor(time/1000);
                var hour=Math.floor(time/3600);
                time=time-3600*hour;
                var minute=Math.floor(time/60);
                time=time-60*minute;
                var second=time;
                data.setHours(hour); 
                data.setMinutes(minute); 
                data.setSeconds(second);
                var timeToDisplay=data.getHours()+":"+data.getMinutes()+":"+data.getSeconds();
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
  };

  return StatisticsView;

});

