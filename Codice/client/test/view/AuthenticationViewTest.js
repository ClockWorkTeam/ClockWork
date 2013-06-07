//Wait for relevant code bits to load before starting any tests
define(['../js/view/AuthenticationView'], function( AuthenticationView ) {

  module( 'About Backbone.View', {
      setup: function() {
          this.authenticationView = new AuthenticationView();
      },
      teardown: function() {
          this.authenticationView.remove();
      }
  });

  test('Should be tied to a DOM element when created, based off the property provided.', function() {
    expect( 1 );
    equal( this.authenticationView.el.id.toLowerCase(), 'authentication', 'Tied to #authentication.' );
  });
 
  test('The login form is render correctly.', function() {
    expect( 3 );

    // Check the number of items rendered
    equal($('#authentication').find('label').length, 2, 'Two labels rendered.');
    equal($('#authentication').find('input').length, 2, 'Two inputs rendered.');
    equal($('#authentication').find('button').length, 2, 'Two buttons rendered.');
  });
  
  test('The register form is render correctly.', function() {
    expect( 3 );
    
    this.authenticationView.view_signup();

    // Check the number of items rendered
    equal($('#authentication').find('label').length, 5, 'Five labels rendered.');
    equal($('#authentication').find('input').length, 5, 'Five inputs rendered.');
    equal($('#authentication').find('button').length, 2, 'Two buttons rendered.');
    
  });
  
  test('The welcome screen is render correctly.', function() {
    expect( 1 );
    
    $(this.authenticationView.el).html(this.authenticationView.template({authenticated: true, name: 'johndoe'}));

    // Check the number of items rendered
    equal($('#authentication').find('button').length, 2, 'Two buttons rendered.');
    
  });
/*
  test('Can wire up view methods to DOM elements.', function() {
    expect( 2 );
    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'connect', this.connectSpy );
    var viewElt;

    setTimeout(function() {
        viewElt = $('button#login');
        
        alert('timeout');

        equal(viewElt.length, 1);

        // Ensure QUnit knows we can continue
       start();
    }, 1000, 'Expected DOM Elt to exist');
    stop();

    // Trigget the view to toggle the 'done' status on an item or items
    $('button#login').click();

    // Check the done status for the model is true
    ok( this.connectSpy.calleOnce );
    
    this.sendStub.restore();
  });
*/
});
