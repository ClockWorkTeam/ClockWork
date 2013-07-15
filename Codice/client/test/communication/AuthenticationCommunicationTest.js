//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/AuthenticationCommunication'], function( AuthenticationCommunication ) {

module('About AuthenticationCommunication.checkCredentials', {
  setup: function() {
    this.Connection = require('connection');
    this.sendSpy = sinon.spy();
    this.sendStub = sinon.stub(this.Connection, 'send', this.sendSpy );
  },
  teardown: function() {  
    this.sendStub.restore();
  }
});

  test('Login with wrong credentials.', function() {
      expect( 4 );
      
      var callBacks = this.spy();
      var view = this.spy();
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      AuthenticationCommunication.checkCredentials( 'johndoe', '1234', callBacks, view );
      
      var data = JSON.stringify({"type":"login","answer":"false","error":"Login e username errate"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendSpy.callCount, 1, 'Connection.send called.');
      equal(callBacks.callCount, 0, 'callBacks not called.');

      equal( stub.callCount, 1, 'response.answer === "false"');
      equal( stub.getCall(0).args[0], 'Login e username errate', "Alert correctly displayed." );
      
      stub.restore();
     
  });
  
  test('Login with valid credentials.', function() {
      expect( 3 );
      
      var callBacks =  { doLogin: this.spy() };
      var view = this.spy();
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      AuthenticationCommunication.checkCredentials( 'johndoe', '1234', callBacks, view );
      
      var data = JSON.stringify({"type":"login","answer":"true"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendSpy.callCount, 1, 'Connection.send called.');
      equal(callBacks.doLogin.callCount, 1, 'response.answer === "true"');

      equal( stub.callCount, 0, 'No alert displayed.');
      
      stub.restore();
     
  });
  
  
  
  
  
module('About AuthenticationCommunication.signup', {
  setup: function() {
    this.Connection = require('connection');
    this.sendSpy = sinon.spy();
    this.sendStub = sinon.stub(this.Connection, 'send', this.sendSpy );
  },
  teardown: function() {  
    this.sendStub.restore();
  }
});

  test('Signup with wrong credentials.', function() {
      expect( 4 );
      
      var callBacks = this.spy();
      var view = this.spy();
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      AuthenticationCommunication.signup( 'johndoe', '1234', 'john', 'doe', callBacks, view );
      
      var data = JSON.stringify({"type":"signUp","answer":"false","error":"Username non disponibile"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendSpy.callCount, 1, 'Connection.send called.');
      equal(callBacks.callCount, 0, 'callBacks not called.');

      equal( stub.callCount, 1, 'response.answer === "false"');
      equal( stub.getCall(0).args[0], 'Username non disponibile', "Alert correctly displayed." );
      
      stub.restore();
     
  });
  
  test('Signup with valid credentials.', function() {
      expect( 3 );
      
      var callBacks =  { doLogin: this.spy() };
      var view = this.spy();
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      AuthenticationCommunication.signup( 'johndoe', '1234', 'john', 'doe', callBacks, view );
      
      var data = JSON.stringify({"type":"signUp","answer":"true"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendSpy.callCount, 1, 'Connection.send called.');
      equal(callBacks.doLogin.callCount, 1, 'response.answer === "true"');

      equal( stub.callCount, 0, 'No alert displayed.');
      
      stub.restore();
     
  });
  
  
  
  
  
module('About AuthenticationCommunication.logout', {
  setup: function() {
    this.Connection = require('connection');
    this.sendSpy = sinon.spy();
    this.sendStub = sinon.stub(this.Connection, 'send', this.sendSpy );
  },
  teardown: function() {  
    this.sendStub.restore();
  }
});
  
  test('Logout.', function() {
      expect( 2 );
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      AuthenticationCommunication.logout();
      
      equal(this.sendSpy.callCount, 1, 'Connection.send called.');

      equal( stub.callCount, 0, 'No alert displayed.');
      
      stub.restore();
     
  });
  
});
