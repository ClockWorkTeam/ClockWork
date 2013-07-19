/**
 * Nome:TutorialView.js
 * Package: View
 * Autore: 
 * Data: 
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+-----------------------+
 * | Data   | Programmatore |     Modifiche         |
 * +--------+---------------+-----------------------+
 * |        |               | + creazione documento |
 * +--------+---------------+-----------------------+
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'text!template/TutorialTemplate.html',
  'collection/TutorialsCollection',
  'model/TutorialModel'
], function($, _, Backbone, TutorialTemplate, TutorialsCollection, TutorialModel){

  var TutorialView = Backbone.View.extend({
    /**
     * si occupa di legare gli eventi ad oggetti del DOM
     */
    events: {
      'click a#tutorial' : 'viewTutorial',
      'click button#prev' : 'viewTutorial',
      'click button#indice' : 'render',
      'click button#next' : 'viewTutorial'
    },
    
    el: $('#main'),

    template: _.template(TutorialTemplate),
    
    collection: TutorialsCollection,

    /**
     * funzione di inizializzazione dell'oggetto
     */
    initialize: function(){
      _.bindAll(this, 'render');
      this.listenTo(this.collection, 'add', this.render);
    },

    /**
     * funzione che effettua la scrittura della struttura della pagina
     */
    render: function() {
      this.$el.html(this.template({ results: this.collection.models, list: true }));
    },

    /**
     * funzione che visualizza un video
     */
    viewTutorial: function(event) {
      var number = $(event.target).data('number');
      var fbool = (number == 0);
      var lbool = (number == this.collection.length-1);
      this.$el.html(this.template({ titolo: this.collection.at(number).toJSON().title, list: false, first: fbool, last: lbool, url: this.collection.at(number).toJSON().url, position: number }));
    }
  });
  return TutorialView;
});


