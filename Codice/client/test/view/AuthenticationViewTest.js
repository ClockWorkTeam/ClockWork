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
    equal(this.authenticationView.$el.find('label').length, 2, 'Two labels rendered.');
    equal(this.authenticationView.$el.find('input').length, 2, 'Two inputs rendered.');
    equal(this.authenticationView.$el.find('button').length, 2, 'Two buttons rendered.');
  });
  
  test('The register form is render correctly.', function() {
    expect( 3 );
    
    this.authenticationView.viewSignup();

    // Check the number of items rendered
    equal(this.authenticationView.$el.find('label').length, 5, 'Five labels rendered.');
    equal(this.authenticationView.$el.find('input').length, 5, 'Five inputs rendered.');
    equal(this.authenticationView.$el.find('button').length, 3, 'Three buttons rendered.');
    
  });
  
  test('The welcome screen is render correctly.', function() {
    expect( 1 );
    
    $(this.authenticationView.el).html(this.authenticationView.template({authenticated: true, name: 'johndoe'}));

    // Check the number of items rendered
    equal(this.authenticationView.$el.find('button').length, 2, 'Two buttons rendered.');
    
  });

  test('Can wire up connect method to DOM element.', function() {
    expect( 1 );

    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'connect', this.connectSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
     this.authenticationView.$el.find('button#login').click();
    // Check the done status for the model is true
    ok( this.connectSpy.called );
    
    this.sendStub.restore();
  });

  test('Can wire up disconnect method to DOM element.', function() {
    expect( 1 );
	
		$(this.authenticationView.el).html(this.authenticationView.template({authenticated: true, name: 'johndoe'}));

    this.disconnectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'disconnect', this.disconnectSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    this.authenticationView.$el.find('button#logout').click();
    // Check the done status for the model is true
    ok( this.disconnectSpy.called );
    
    this.sendStub.restore();
  });
  
  test('Can wire up viewSignup method to DOM element.', function() {
    expect( 1 );

    this.viewSignupSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'viewSignup', this.viewSignupSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    this.authenticationView.$el.find('button#signup').click();
    // Check the done status for the model is true
    ok( this.viewSignupSpy.called );
    
    this.sendStub.restore();
  });
 
  test('Can wire up signup method to DOM element.', function() {
    expect( 1 );

    $(this.authenticationView.el).html(this.authenticationView.template({authenticated: false, signup: true}));

    this.signupSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'signup', this.signupSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    this.authenticationView.$el.find('button#sign').click();
    // Check the done status for the model is true
    ok( this.signupSpy.called );
    
    this.sendStub.restore();
  });
   
  test('Can wire up deny method to DOM element.', function() {
    expect( 1 );

    $(this.authenticationView.el).html(this.authenticationView.template({authenticated: false, signup: true}));

    this.denySpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'deny', this.denySpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    this.authenticationView.$el.find('button#deny').click();
    // Check the done status for the model is true
    ok( this.denySpy.called );
    
    this.sendStub.restore();
  });
   
  test('Can wire up editProfile method to DOM element.', function() {
    expect( 1 );

		$(this.authenticationView.el).html(this.authenticationView.template({authenticated: true, name: 'johndoe'}));

    this.editSpy = sinon.spy();
    this.sendStub = sinon.stub(this.authenticationView, 'editProfile', this.editSpy );
    this.authenticationView.delegateEvents();
    // Trigger the event
    this.authenticationView.$el.find('button#edit').click();
    // Check the done status for the model is true
    ok( this.editSpy.called );
    
    this.sendStub.restore();
  });
  
    test('Can wire up callBacks method to DOM element.', function() {
    expect( 1 );

    this.cViewSpy = this.spy();
		var view = { contactsView: { getContacts: this.cViewSpy },template: function(){} };

    this.authenticationView.callBacks().doLogin('johndoe','1234','true',view);

    ok( this.cViewSpy.called );
  });
  
  
});
