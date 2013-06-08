//Wait for relevant code bits to load before starting any tests
define(['../js/view/StatisticsView'], function( StatisticsView ) {

  module( 'About Backbone.View', {
      setup: function() {
        this.statisticsView = new StatisticsView({caller: 'clockwork'});
      },
      teardown: function() {
        this.statisticsView.remove();
      }
  });

 test('Should be tied to a DOM element when created, based off the property provided.', function() {
   expect( 1 );

   equal( this.statisticsView.el.id.toLowerCase(), 'statistics', 'Tied to #statistics.' );
  });
 

});
