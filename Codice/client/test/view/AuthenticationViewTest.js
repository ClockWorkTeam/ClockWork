//Wait for relevant code bits to load before starting any tests
define(['../js/view/AuthenticationView'], function( AuthenticationView ) {

  module( 'About Backbone.View', {
      setup: function() {
          $('body').append('<div id="authentication"></div>');
          this.authenticationView = new AuthenticationView({ collection: new Backbone.Collection() });
      },
      teardown: function() {
          this.autenticationView.remove();
          $('#authentication').remove();
      }
  });

  test('Should be tied to a DOM element when created, based off the property provided.', function() {
      expect( 1 );
      equal( this.authenticationView.el.tagName.toLowerCase(), 'authentication' );
  });

  test('Is backed by a model instance, which provides the data.', function() {
      expect( 2 );
      notEqual( this.authenticationView.model, undefined );
      equal( this.authenticationView.model.get('done'), false );
  });

  test('Can render, after which the DOM representation of the view will be visible.', function() {
     this.authenticationView.render();

      // Append the DOM representation of the view to ul#todoList
      $('ul#todoList').append(this.authenticationView.el);

      // Check the number of li items rendered to the list
      equal($('#todoList').find('li').length, 1);
  });

  asyncTest('Can wire up view methods to DOM elements.', function() {
      expect( 2 );
      var viewElt;

      $('#todoList').append( this.authenticationView.render().el );

      setTimeout(function() {
          viewElt = $('#todoList li input.check').filter(':first');

          equal(viewElt.length > 0, true);

          // Ensure QUnit knows we can continue
          start();
      }, 1000, 'Expected DOM Elt to exist');

      // Trigget the view to toggle the 'done' status on an item or items
      $('#todoList li input.check').click();

      // Check the done status for the model is true
      equal( this.authenticationView.model.get('done'), true );
  });

});
