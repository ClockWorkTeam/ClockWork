define(['../js/view/AuthenticationView'], function( AuthenticationView ) {

  module( 'Chat', {
      setup: function() {
        this.authenticationView = new AuthenticationView();
        this.Connection = require('connection');
        this.sendStub = sinon.stub(this.Connection, 'send');
      },
      teardown: function() {
        this.sendStub.restore();
        this.authenticationView.remove();
      }
  });

  test('Notifico un messaggio di chat in arrivo', function() {
    expect( 2 );
    
    this.authenticationView.$("#user").val('prova');
    this.authenticationView.$("#password").val('prova');
    this.authenticationView.connect();

    var data = JSON.stringify({"type":"login","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    ContactsCollection = require('collection/ContactsCollection');
    ContactsCollection.add({username: 'qwe', name: 'qwe', surname: 'qwe', IP: '0' });
    ContactsCollection.add({username: 'asd', name: 'asd', surname: 'asd', IP: '0' });
    ContactsCollection.add({username: 'zxc', name: 'zxc', surname: 'zxc', IP: '0' });
    ContactsCollection.add({username: 'jkl', name: 'jkl', surname: 'jkl', IP: '0' });
    
    var data = JSON.stringify({"type":"sendText","message":"prova", "contact":"qwe"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    equal(ContactsCollection.where({username: 'qwe'})[0].get('unread'), 1, 'Notifica visualizzata correttamente');
    equal(ContactsCollection.where({username: 'asd'})[0].get('unread'), 0, 'Notifica visualizzata correttamente');

  });
  
});
