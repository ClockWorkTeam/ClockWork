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
 'text!templates/StatisticsTemplate.html'
], function($, _, Backbone, StatisticsTemplate){
  var StatisticsView = Backbone.View.extend({
    //si occupa di legare gli eventi ad oggetti del DOM
    events:{
		'click button#update':'updateStatistics',
    'click button#close':'close'
    },
	
    el : $('#statistics'),
	
    //indica in quale parte del DOM gestirà 
    template : _.template(StatisticsTemplate),
    
    //funzione di inizializzazione dell'oggetto
    initialize: function(){
      _.bindAll(this, 'render');
      this.render();
    },
    
    //funzione che effettua la scrittura della struttura della pagina
    render: function(){
      if(document.getElementById('statistics')){
        $(this.el).html(this.template());
      }
      else{
        $('#main').prepend(this.el);
        $(this.el).html(this.template());
      }
    },
    
    updateStatistics: function(){
      
    }
  });

  StatisticsView.prototype.close = function(){
    this.remove();
    this.unbind();
    $('#main').prepend(this.el);
  };

  return StatisticsView;

});

