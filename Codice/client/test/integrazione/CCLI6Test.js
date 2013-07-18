define(['../js/view/CallView'], function( CallView ) {

  module( 'Chiamata', {
      setup: function() {
        this.callView = new CallView();
        this.CallCommunication = require('communication/CallCommunication');
        this.commSpy = sinon.spy(this.CallCommunication, 'sendCall');
        this.Connection = require('connection');
        this.sendStub = sinon.stub(this.Connection, 'send');
      },
      teardown: function() {
        this.sendStub.restore();
        this.commSpy.restore();
        this.callView.remove();
      }
  });

  test('Invio la richiesta di chiamata al server', function() {
    expect( 2 );
    
    this.callView.render();
    
    ok(this.commSpy.called,'Chiamo il metodo per inviare i dati al server');
    ok(this.sendStub.called,'Invio il messaggio al server');

  });
  
});
