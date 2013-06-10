//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/FileCommunication'], 
	function( ContactsCommunication ) {

module('About FileCommunication.send', {
    setup: function() {
      this.Connection = require('connection');
      this.sendStub = sinon.stub(this.Connection, 'send' );
    },
    teardown: function() {  
      this.sendStub.restore();
    }
  });

  test('Check of Connection.send.', function() {
    expect( 1 );
        
    ChatCommunication.send('johndoe','file','url');    
    
    equal(this.sendStub.callCount, 1, 'Connection.send called.');
        
  });
 
});
