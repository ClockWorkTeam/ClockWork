//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/AuthenticationCommunication'], function( AuthenticationCommunication ) {

module('About AuthenticationCommunication', {

  setup: function() {
    
    this.Connection = require('connection');
    this.sendSpy = sinon.spy();
    this.sendStub = sinon.stub(this.Connection, 'send', this.sendSpy );
    //var Connection = { send: function(){}, onmessage: function(){} };
    //this.sendStub = sinon.stub(Connection, 'send', function(string){} );
    //this.onmessageStub = sinon.stub(Connection, 'onmessage');

  },

  teardown: function() {
    
    this.sendStub.restore();
    //this.onmessageStub.restore();

    
  }
  
});

  test('Login with wrong credentials.', function() {
      expect( 4 );
      
      var callBacks = this.spy();
      var view = this.spy();
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      AuthenticationCommunication.checkCredentials( 'johndoe', '1234', callBacks, view );
      
      var data = JSON.stringify({"type":"login","answer":"false"});
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
      equal(callBacks.doLogin.callCount, 1, 'response.answer === "false"');

      equal( stub.callCount, 0, 'No alert displayed.');
      
      stub.restore();
     
  });

});
