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
  var StatisticsView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#update':'updateStatistics',
    'click button#close':'close'
    },
	
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
      if(document.getElementById('statistics')){
        $(this.el).html(this.statisticsTemplate({sent: 0, received: 0}));
      }
      else{
        $('#main').prepend(this.el);
        $(this.el).html(this.statisticsTemplate({sent: 0, received: 0}));
      }
    },
    
    updateStatistics: function(){
      var pc = CallCommunication.getPeerConnection();
      var baselineReport, currentReport;
      var selector = pc.getRemoteStreams()[0].getAudioTracks()[0];

      pc.getStats(selector, function (report) {
          baselineReport = report;
      });

      // ... wait a bit
      setTimeout(function () {
          pc.getStats(selector, function (report) {
              currentReport = report;
              processStats();
          });
      }, 2000);

      function processStats() {
          // compare the elements from the current report with the baseline
          for (var now in currentReport) {
              if (now.type != "outbund-rtp")
                  continue;

              // get the corresponding stats from the baseline report
              base = baselineReport[now.id];

              if (base) {
                  remoteNow = currentReport[now.remoteId];
                  remoteBase = baselineReport[base.remoteId];

                  var packetsSent = now.packetsSent - base.packetsSent;
                  var packetsReceived = remoteNow.packetsReceived - remoteBase.packetsReceived;
                  
                  $(this.el).html(this.statisticsTemplate({sent: packetsSent, received: packetsReceived}));

                  // if fractionLost is > 0.3, we have probably found the culprit
                  var fractionLost = (packetsSent - packetsReceived) / packetsSent;
              }
          }
      }
    }
  });

  StatisticsView.prototype.close = function(){
    this.remove();
    this.unbind();
  };

  return StatisticsView;

});

