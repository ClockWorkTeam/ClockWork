//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/ContactsCommunication' , '../js/model/ContactModel'], 
	function( ContactsCommunication, ContactModel ) {


  module('About ContactsCommunication.fetchContacts', {
    setup: function() {
      this.Connection = require('connection');
      this.sendStub = sinon.stub(this.Connection, 'send' );
      this.contactsCollection = require('collection/ContactsCollection');
      
      this.contactModel=new ContactModel({ username: 'johndoe'});
      this.contactModelStub = sinon.stub(this.contactModel, 'set' );
      this.contactsCollectionStubAdd = sinon.stub(this.contactsCollection, 'add' );
      
    },
    teardown: function() {  
      this.sendStub.restore();
      
			this.contactsCollectionStubAdd.restore();
			this.contactModelStub.restore(); 
      
    }
  });

  test('fetchContacts with contact not found in ContacsCollection.', function() {
      expect( 4 );
      
      this.contactsCollectionStubFind = sinon.stub(this.contactsCollection, 'find' );
      
      ContactsCommunication.fetchContacts( 'johndoe' );
      
      var data = JSON.stringify({"type":"getContacts","username":"johndoe","size":1});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendStub.callCount, 1, 'Connection.send called.');
      equal(this.contactsCollectionStubFind.callCount, 1, 'contactsCollection.find called.');
      equal(this.contactsCollectionStubAdd.callCount, 1, 'contactsCollection.add called.');
      equal(this.contactModelStub.callCount, 0, 'contactModel.set not called.');

			this.contactsCollectionStubFind.restore();

  });
  
  test('fetchContacts with with contact found in ContacsCollection.', function() {
      expect( 4 );
      
      this.contactsCollectionStubFind = sinon.stub(this.contactsCollection, 'find' ).returns(this.contactModel);
      
      ContactsCommunication.fetchContacts( 'johndoe' );
      
      var data = JSON.stringify({"type":"getContacts","username":"johndoe","size":1});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      equal(this.sendStub.callCount, 1, 'Connection.send called.');
      equal(this.contactsCollectionStubFind.callCount, 1, 'contactsCollection.find called.');
      equal(this.contactModelStub.callCount, 1, 'contactModel.set called.');
      equal(this.contactsCollectionStubAdd.callCount, 0, 'contactsCollection.add not called.');

			this.contactsCollectionStubFind.restore();

  });
    
});
