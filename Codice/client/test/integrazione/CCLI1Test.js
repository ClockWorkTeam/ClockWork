define(['../js/view/AuthenticationView'], function( AuthenticationView ) {

  module( 'Login', {
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

  test('Login con credenziali valide', function() {
    expect( 3 );
    
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.connect();
    
    ok(this.commSpy.called,'Chiamo il metodo per cercare i dati nel server');
    ok(this.sendStub.called,'Invio il messaggio al server');
    
    var data = JSON.stringify({"type":"login","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    ok(this.authenticationView.$("#logout").length == 1, 'Login effettuato');

  });
 
  test('Login con credenziali non valide', function() {
    expect( 4 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.connect();
    
    ok(this.commSpy.called,'Chiamo il metodo per cercare i dati nel server');
    ok(this.sendStub.called,'Invio il messaggio al server');
    
    var data = JSON.stringify({"type":"login","answer":"false","error":"Messaggio di errore dal server"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);

    equal( stub.getCall(0).args[0], 'Messaggio di errore dal server', 'Alert visualizzato correttamente');
    ok(this.authenticationView.$("#logout").lenght == undefined, 'Login fallito');
    
    stub.restore();
    
  });
  
  module( 'Logout', {
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
  
  test('Logout effettuato correttamente', function() {
    expect( 3 );
    
    this.authenticationView.disconnect();
    
    ok(this.commSpy.called,'Chiamo il metodo per inviare il segnale al server');
    ok(this.sendStub.called,'Invio il messaggio al server');
    
    ok(this.authenticationView.$("#logout").length == 0, 'Logout effettuato');
  });
  
  module( 'Registrazione', {
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
  
  test('Registrazione con credenziali valide', function() {
    expect( 3 );
    
    this.authenticationView.viewSignup();
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.$("#password2").val('prova');
    this.authenticationView.$("#name").val('prova');
    this.authenticationView.$("#surname").val('prova');
    this.authenticationView.signup();
    
    ok(this.commSpy.called,'Chiamo il metodo per inviare al server i dati');
    ok(this.sendStub.called,'Invio il messaggio al server');
    
    var data = JSON.stringify({"type":"signUp","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    ok(this.authenticationView.$("#logout").length == 1, 'Registrazione avvenuta correttamente');

  });
 
  test('Registrazione fallita a causa di errori', function() {
    expect( 4 );
    
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
    
    this.authenticationView.viewSignup();
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.$("#password2").val('prova');
    this.authenticationView.$("#name").val('prova');
    this.authenticationView.$("#surname").val('prova');
    this.authenticationView.signup();
    
    ok(this.commSpy.called,'Chiamo il metodo per inviare al server i dati');
    ok(this.sendStub.called,'Invio il messaggio al server');
    
    var data = JSON.stringify({"type":"signUp","answer":"false","error":"Messaggio di errore dal server"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);

    equal( stub.getCall(0).args[0], 'Messaggio di errore dal server', 'Alert visualizzato correttamente');
    ok(this.authenticationView.$("#logout").lenght == undefined, 'Registrazione fallita');
    
    stub.restore();
    
  });
  
});
