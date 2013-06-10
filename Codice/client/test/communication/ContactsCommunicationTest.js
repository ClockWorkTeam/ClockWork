//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/ContactsCommunication' , '../js/model/ContactModel'], 
	function( ContactsCommunication, ContactModel ) {


  module('About ContactsCommunication.fetchContacts', {
    setup: function() {
      this.Connection = require('connection');
      this.sendStub = sinon.stub(this.Connection, 'send' );
      this.contactsCollection = require('collection/ContactsCollection');
      
    },
    teardown: function() {  
      this.sendStub.restore();
    }
  });

  test('fetchContacts with with contact not found in ContacsCollection.', function() {
      expect( 3 );
      
      this.contactsCollectionStubFind = sinon.stub(this.contactsCollection, 'find' );
      this.contactsCollectionStubAdd = sinon.stub(this.contactsCollection, 'add' );
      
      ContactsCommunication.fetchContacts( 'johndoe' );
      
      var data = JSON.stringify({"type":"getContacts","username":"johndoe","size":1});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendStub.callCount, 1, 'Connection.send called.');
      equal(this.contactsCollectionStubFind.callCount, 1, 'contactsCollection.find called.');
      equal(this.contactsCollectionStubAdd.callCount, 1, 'contactsCollection.add called.');

			this.contactsCollectionStubFind.restore();
			this.contactsCollectionStubAdd.restore();
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
    
});
