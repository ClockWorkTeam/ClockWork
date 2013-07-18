define(['../js/view/AuthenticationView'], function( AuthenticationView ) {

  module( 'About Login', {
      setup: function() {
        this.authenticationView = new AuthenticationView();
        this.AuthenticationCommunication = require('communication/AuthenticationCommunication');
        this.commSpy = sinon.spy(this.AuthenticationCommunication, 'checkCredentials');
        this.Connection = require('connection');
        this.sendStub = sinon.stub(this.Connection, 'send');
      },
      teardown: function() {
        this.sendStub.restore();
        this.commSpy.restore();
        this.authenticationView.remove();
      }
  });

  test('Login successful.', function() {
    expect( 3 );
    
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.connect();
    
    ok(this.commSpy.called,'AuthenticationCommunication.checkCredentials called');
    ok(this.sendStub.called,'Connection.send called');
    
    var data = JSON.stringify({"type":"login","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    ok(this.authenticationView.$("#logout").length == 1, 'Login successful');

  });
 
  test('Login unsuccessful.', function() {
    expect( 4 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.connect();
    
    ok(this.commSpy.called,'AuthenticationCommunication.checkCredentials called');
    ok(this.sendStub.called,'Connection.send called');
    
    var data = JSON.stringify({"type":"login","answer":"false","error":"Messaggio di errore dal server"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);

    equal( stub.getCall(0).args[0], 'Messaggio di errore dal server', 'Alert correctly displayed.');
    ok(this.authenticationView.$("#logout").lenght == undefined, 'Login unsuccessful');
    
    stub.restore();
    
  });
  
  module( 'About Logout', {
      setup: function() {
        this.authenticationView = new AuthenticationView();
        this.AuthenticationCommunication = require('communication/AuthenticationCommunication');
        this.commSpy = sinon.spy(this.AuthenticationCommunication, 'logout');
        this.Connection = require('connection');
        this.sendStub = sinon.stub(this.Connection, 'send');
      },
      teardown: function() {
        this.sendStub.restore();
        this.commSpy.restore();
        this.authenticationView.remove();
      }
  });
  
  test('Logout successful.', function() {
    expect( 3 );
    
    this.authenticationView.disconnect();
    
    ok(this.commSpy.called,'AuthenticationCommunication.logout called');
    ok(this.sendStub.called,'Connection.send called');
    
    ok(this.authenticationView.$("#logout").length == 0, 'Logout successful');
  });
  
  module( 'About Signup', {
      setup: function() {
        this.authenticationView = new AuthenticationView();
        this.AuthenticationCommunication = require('communication/AuthenticationCommunication');
        this.commSpy = sinon.spy(this.AuthenticationCommunication, 'signup');
        this.Connection = require('connection');
        this.sendStub = sinon.stub(this.Connection, 'send');
      },
      teardown: function() {
        this.sendStub.restore();
        this.commSpy.restore();
        this.authenticationView.remove();
      }
  });
  
  test('Signup successful.', function() {
    expect( 3 );
    
    this.authenticationView.viewSignup();
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.$("#password2").val('prova');
    this.authenticationView.$("#name").val('prova');
    this.authenticationView.$("#surname").val('prova');
    this.authenticationView.signup();
    
    ok(this.commSpy.called,'AuthenticationCommunication.signup called');
    ok(this.sendStub.called,'Connection.send called');
    
    var data = JSON.stringify({"type":"signUp","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    ok(this.authenticationView.$("#logout").length == 1, 'Signup successful');

  });
 
  test('Signup unsuccessful.', function() {
    expect( 4 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.authenticationView.viewSignup();
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.$("#password2").val('prova');
    this.authenticationView.$("#name").val('prova');
    this.authenticationView.$("#surname").val('prova');
    this.authenticationView.signup();
    
    ok(this.commSpy.called,'AuthenticationCommunication.checkCredentials called');
    ok(this.sendStub.called,'Connection.send called');
    
    var data = JSON.stringify({"type":"signUp","answer":"false","error":"Messaggio di errore dal server"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);

    equal( stub.getCall(0).args[0], 'Messaggio di errore dal server', 'Alert correctly displayed.');
    ok(this.authenticationView.$("#logout").lenght == undefined, 'Signup unsuccessful');
    
    stub.restore();
    
  });
  
});
