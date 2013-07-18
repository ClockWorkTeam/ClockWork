define(['../js/view/AuthenticationView'], function( AuthenticationView ) {

  module( 'Lista utenti', {
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

  test('Visualizzazione della lista degli utenti', function() {
    expect( 3 );
    
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.connect();

    ok(this.commSpy.called,'Chiamo il metodo per reperire i dati dal server');
    ok(this.sendStub.called,'Invio il messaggio al server');
    var data = JSON.stringify({"type":"login","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    ContactsCollection = require('collection/ContactsCollection');
    ContactsCollection.add({username: 'qwe', name: 'qwe', surname: 'qwe', IP: '0' });
    ContactsCollection.add({username: 'asd', name: 'asd', surname: 'asd', IP: '0' });
    ContactsCollection.add({username: 'zxc', name: 'zxc', surname: 'zxc', IP: '0' });
    ContactsCollection.add({username: 'jkl', name: 'jkl', surname: 'jkl', IP: '0' });
    
    equal($("span.contact").length, 4, 'Login effettuato');

  });
  
});
