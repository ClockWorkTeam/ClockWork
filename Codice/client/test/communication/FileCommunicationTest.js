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
 
  test('fetchContacts with with contact found in ContacsCollection.', function() {
      expect( 3 );
      
      this.contactModel=new ContactModel({ username: 'johndoe'});
      this.contactsCollectionStubFind = sinon.stub(this.contactsCollection, 'find' ).returns(this.contactModel);
      this.contactModelStub = sinon.stub(this.contactModel, 'set' );
      
      ContactsCommunication.fetchContacts( 'johndoe' );
      
      var data = JSON.stringify({"type":"getContacts","username":"johndoe","size":1});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendStub.callCount, 1, 'Connection.send called.');
      equal(this.contactsCollectionStubFind.callCount, 1, 'contactsCollection.find called.');
      equal(this.contactModelStub.callCount, 1, 'contactModel.set called.');

			this.contactsCollectionStubFind.restore();
			this.contactModelStub.restore(); 
  });
    */
});
