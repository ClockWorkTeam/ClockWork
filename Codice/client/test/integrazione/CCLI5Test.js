define(['../js/communication/NotificationCommunication'], function( NotificationCommunication ) {

  module( 'Notifiche', {
      setup: function() {
        this.Connection = require('connection');
        this.sendStub = sinon.stub(this.Connection, 'send');
      },
      teardown: function() {
        this.sendStub.restore();
      }
  });

  test('Notifica di chiamata', function() {
    expect( 1 );
    
    NotificationCommunication.listenNotification();
    
    var data = JSON.stringify({"type":"call","answer":"true"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    ok($("#acceptCall").length == 1, 'Notifica visualizzata correttamente');

  });
  
});
