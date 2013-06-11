//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/UserDataCommunication', '../js/model/UserModel', '../js/view/UserDataView' ],
 function( UserDataCommunication, UserModel, UserDataView ) {

module('About UserDataCommunication.checkPassword', {
  setup: function() {
    this.Connection = require('connection');
    this.sendStub = sinon.stub(this.Connection, 'send' );
    this.model = new UserModel();
  },
  teardown: function() {  
    this.sendStub.restore();
  }
});

  test('Check credentials with wrong password.', function() {
      expect( 3 );
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      UserDataCommunication.checkPassword( this.model, '1234', this.view );
      
      var data = JSON.stringify({"type":"checkCredentials","answer":"false"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendStub.callCount, 1, 'Connection.send called.');
      
      equal( stub.callCount, 1, 'response.answer === "false"');
      equal( stub.getCall(0).args[0], 'Password non corretta', "Alert correctly displayed." );
      
      stub.restore();
     
  });
  
  test('Check credentials with valid password.', function() {
      expect( 3 );
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      var spy = this.spy();
      var view = { callBacks: function(){ return {changeData: spy}} }
      
      UserDataCommunication.checkPassword( this.model, '1234', view );
      
      var data = JSON.stringify({"type":"checkCredentials","answer":"true"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendStub.callCount, 1, 'Connection.send called.');
      
      equal( stub.callCount, 0, 'response.answer === "true"');
      equal( spy.callCount, 1, "Credentials changed." );
      
      stub.restore();
     
  });
 
 module('About UserDataCommunication.ChangeData', {
  setup: function() {
    this.Connection = require('connection');
    this.sendStub = sinon.stub(this.Connection, 'send' );
    this.model = new UserModel();
    this.view = new UserDataView({model: this.model});
  },
  teardown: function() {  
    this.sendStub.restore();
  }
});

  test('Change credentials successfully.', function() {
      expect( 3 );
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      UserDataCommunication.changeData( this.model, 'john', 'doe', '1234', this.view );
      
      var data = JSON.stringify({"type":"changeData","answer":"true"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendStub.callCount, 1, 'Connection.send called.');
      
      equal( stub.callCount, 1, 'response.answer === "true"');
      equal( stub.getCall(0).args[0], 'Operazione riuscita', "Alert correctly displayed." );
      
      stub.restore();
     
  });
  
  test('Change credentials unsuccessfully.', function() {
      expect( 3 );
      
      var stub = this.stub(window, 'alert', function(msg) { return false; } );
      
      UserDataCommunication.changeData( this.model, 'john', 'doe', '1234', this.view );
      
      var data = JSON.stringify({"type":"changeData","answer":"false"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendStub.callCount, 1, 'Connection.send called.');
      
      equal( stub.callCount, 1, 'response.answer === "false"');
      equal( stub.getCall(0).args[0], 'Operazione fallita', "Alert correctly displayed." );
      
      stub.restore();
     
  });
 
});
