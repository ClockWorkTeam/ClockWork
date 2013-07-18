define(['../js/view/UserDataView', '../js/model/UserModel'], function( UserDataView, UserModel ) {

  module( 'About modifying data', {
      setup: function() {
        var userModel = new UserModel({
            username: 'prova',
            password: 'prova',
            name: 'prova',
            surname: 'prova'
          });
        this.userDataView = new UserDataView({model: userModel});
        this.UserDataCommunication = require('communication/UserDataCommunication');
        this.checkSpy = sinon.spy(this.UserDataCommunication, 'checkPassword');
        this.commSpy = sinon.spy(this.UserDataCommunication, 'changeData');
        this.Connection = require('connection');
        this.sendStub = sinon.stub(this.Connection, 'send');
      },
      teardown: function() {
        this.sendStub.restore();
        this.commSpy.restore();
        this.checkSpy.restore();
        this.userDataView.remove();
      }
  });

  test('Data changed successfully.', function() {
    expect( 8 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.userDataView.$("#password").val('prova2');
    this.userDataView.$("#password2").val('prova2');
    this.userDataView.$("#name").val('prova2');
    this.userDataView.$("#surname").val('prova2');
    this.userDataView.$("#oldPassword").val('prova');
    this.userDataView.checkPassword();
    
    ok(this.checkSpy.called,'UserDataCommunication.checkPassword called');
    ok(this.sendStub.calledOnce, 'Connection.send called once');

    var data = JSON.stringify({"type":"checkCredentials","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);    
    
    ok(this.commSpy.called,'UserDataCommunication.changeData called');
    ok(this.sendStub.calledTwice,'Connection.send called twice');
    
    data = JSON.stringify({"type":"changeData","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    equal( stub.getCall(0).args[0], 'Operazione riuscita', 'Alert correctly displayed.');
    ok(this.userDataView.model.toJSON().password === 'prova2', 'Password changed successfully');
    ok(this.userDataView.model.toJSON().name === 'prova2', 'Name changed successfully');
    ok(this.userDataView.model.toJSON().surname === 'prova2', 'Surname changed successfully');

  });
 
  test('Error while changing data.', function() {
    expect( 8 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.userDataView.$("#password").val('prova2');
    this.userDataView.$("#password2").val('prova2');
    this.userDataView.$("#name").val('prova2');
    this.userDataView.$("#surname").val('prova2');
    this.userDataView.$("#oldPassword").val('prova');
    this.userDataView.checkPassword();
    
    ok(this.checkSpy.called,'UserDataCommunication.checkPassword called');
    ok(this.sendStub.calledOnce, 'Connection.send called once');

    var data = JSON.stringify({"type":"checkCredentials","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);    
    
    ok(this.commSpy.called,'UserDataCommunication.changeData called');
    ok(this.sendStub.calledTwice,'Connection.send called twice');
    
    data = JSON.stringify({"type":"changeData","answer":"false","error":"Error message"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    equal( stub.getCall(0).args[0], 'Error message', 'Alert correctly displayed.');
    ok(this.userDataView.model.toJSON().password === 'prova', 'Password not changed');
    ok(this.userDataView.model.toJSON().name === 'prova', 'Name not changed');
    ok(this.userDataView.model.toJSON().surname === 'prova', 'Surname not changed');
    
  });
  
});
