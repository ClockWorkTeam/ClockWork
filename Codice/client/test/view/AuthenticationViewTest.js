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

  test('Can wire up connect method to DOM element.', function() {
    expect( 1 );

    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'connect', this.connectSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
     $('button#login').click();
    // Check the done status for the model is true
    ok( this.connectSpy.called );
    
    this.sendStub.restore();
  });

  test('Can wire up disconnect method to DOM element.', function() {
    expect( 1 );
	
		$(this.authenticationView.el).html(this.authenticationView.template({authenticated: true, name: 'johndoe'}));

    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'disconnect', this.connectSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    $('button#logout').click();
    // Check the done status for the model is true
    ok( this.connectSpy.called );
    
    this.sendStub.restore();
  });
  
  test('Can wire up view_signup method to DOM element.', function() {
    expect( 1 );

    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'view_signup', this.connectSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    $('button#signup').click();
    // Check the done status for the model is true
    ok( this.connectSpy.called );
    
    this.sendStub.restore();
  });
 
  test('Can wire up signup method to DOM element.', function() {
    expect( 1 );

    $(this.authenticationView.el).html(this.authenticationView.template({authenticated: false, signup: true}));

    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'signup', this.connectSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    $('button#sign').click();
    // Check the done status for the model is true
    ok( this.connectSpy.called );
    
    this.sendStub.restore();
  });
   
  test('Can wire up deny method to DOM element.', function() {
    expect( 1 );

    $(this.authenticationView.el).html(this.authenticationView.template({authenticated: false, signup: true}));

    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'deny', this.connectSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    $('button#deny').click();
    // Check the done status for the model is true
    ok( this.connectSpy.called );
    
    this.sendStub.restore();
  });
   
  test('Can wire up editProfile method to DOM element.', function() {
    expect( 1 );

		$(this.authenticationView.el).html(this.authenticationView.template({authenticated: true, name: 'johndoe'}));

    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'editProfile', this.connectSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    $('button#edit').click();
    // Check the done status for the model is true
    ok( this.connectSpy.called );
    
    this.sendStub.restore();
  });
  
});
