define(['../js/view/UserDataView', '../js/model/UserModel'], function( UserDataView, UserModel ) {

  module( 'Modifica dei dati', {
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

  test('Modifica con dati validi', function() {
    expect( 8 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.userDataView.$("#password").val('prova2');
    this.userDataView.$("#password2").val('prova2');
    this.userDataView.$("#name").val('prova2');
    this.userDataView.$("#surname").val('prova2');
    this.userDataView.$("#oldPassword").val('prova');
    this.userDataView.checkPassword();
    
    ok(this.checkSpy.called,'Chiamo il metodo per controllare la passwrod');
    ok(this.sendStub.calledOnce, 'Invio il messaggio al server');

    var data = JSON.stringify({"type":"checkCredentials","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);    
    
    ok(this.commSpy.called,'Chiamo il metodo per inviare la richiesta di cambiamento dati al server');
    ok(this.sendStub.calledTwice,'Invio il messaggio al server');
    
    data = JSON.stringify({"type":"changeData","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    equal( stub.getCall(0).args[0], 'Operazione riuscita', 'Alert correttamente visualizzato');
    ok(this.userDataView.model.toJSON().password === 'prova2', 'Password cambiata con successo');
    ok(this.userDataView.model.toJSON().name === 'prova2', 'Nome cambiato con successo');
    ok(this.userDataView.model.toJSON().surname === 'prova2', 'Cognome cambiato con successo');

  });
 
  test('Errore nella modifica dei dati', function() {
    expect( 8 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.userDataView.$("#password").val('prova2');
    this.userDataView.$("#password2").val('prova2');
    this.userDataView.$("#name").val('prova2');
    this.userDataView.$("#surname").val('prova2');
    this.userDataView.$("#oldPassword").val('prova');
    this.userDataView.checkPassword();
    
    ok(this.checkSpy.called,'Chiamo il metodo per controllare la passwrod');
    ok(this.sendStub.calledOnce, 'Invio il messaggio al server');

    var data = JSON.stringify({"type":"checkCredentials","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);    
    
    ok(this.commSpy.called,'Chiamo il metodo per inviare la richiesta di cambiamento dati al server');
    ok(this.sendStub.calledTwice,'Invio il messaggio al server');
    
    data = JSON.stringify({"type":"changeData","answer":"false","error":"Error message"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    equal( stub.getCall(0).args[0], 'Error message', 'Alert correttamente visualizzato');
    ok(this.userDataView.model.toJSON().password === 'prova', 'Password non cambiato');
    ok(this.userDataView.model.toJSON().name === 'prova', 'Nome non cambiato');
    ok(this.userDataView.model.toJSON().surname === 'prova', 'Cognome non cambiato');
    
  });
  
});
