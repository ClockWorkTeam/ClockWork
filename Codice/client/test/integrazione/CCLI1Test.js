define(['../js/view/AuthenticationView'], function( AuthenticationView, AuthenticationCommunication ) {

  module( 'About Login', {
      setup: function() {
        this.authenticationView = new AuthenticationView();
        this.AuthenticationCommunication = require('communication/AuthenticationCommunication');
        this.commSpy = sinon.spy(this.AuthenticationCommunication, 'checkCredentials');
        this.Connection = require('connection');
        this.sendStub = sinon.stub(this.Connection, 'send');
        this.callBacksSpy = sinon.spy(this.authenticationView, 'callBacks');
      },
      teardown: function() {
        this.callBacksSpy.restore();
        this.sendStub.restore();
        this.commSpy.restore();
        this.authenticationView.remove();
      }
  });

  test('Login successful.', function() {
    expect( 2 );
    
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.connect();
    
    ok(this.commSpy.called,'AuthenticationCommunication.checkCredentials called');
    
    var data = JSON.stringify({"type":"login","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    ok(this.authenticationView.$("#logout").length == 1, 'Login successful');

  });
 
  test('Login unsuccessful.', function() {
    expect( 3 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.connect();
    
    ok(this.commSpy.called,'AuthenticationCommunication.checkCredentials called');
    
    var data = JSON.stringify({"type":"login","answer":"false","error":"Messaggio di errore dal server"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);

    equal( stub.getCall(0).args[0], 'Messaggio di errore dal server', 'Alert correctly displayed.');
    ok(this.authenticationView.$("#logout").lenght == 0, 'Login unsuccessful');
    
    stub.restore();
    
  });
  
  module( 'About Logout', {
      setup: function() {
        this.authenticationView = new AuthenticationView();
      },
      teardown: function() {
        this.authenticationView.remove();
      }
  });
  
  test('Logout successful.', function() {
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
  
  module( 'About Signup', {
      setup: function() {
        this.authenticationView = new AuthenticationView();
      },
      teardown: function() {
        this.authenticationView.remove();
      }
  });
  
});
