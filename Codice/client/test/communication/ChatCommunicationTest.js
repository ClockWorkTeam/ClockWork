//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/ChatCommunication' , '../js/model/TextMessageModel','../js/model/ContactModel'], 
	function( ChatCommunication, TextMessageModel, ContactModel ) {


  module('About ChatCommunication.addEventListener', {
    setup: function() {
      this.Connection = require('connection');
      this.addEventListenerStub = sinon.stub(this.Connection, 'addEventListener' );
    },
    teardown: function() {  
      this.addEventListenerStub.restore();
    }
  });

  test('Check of Connection.addEventListener.', function() {
    expect( 1 );
        
    var onReceived = this.spy();
    this.Connection.addEventListener("message", onReceived, false);
    equal(this.addEventListenerStub.callCount, 1, 'Connection.addEventListener called.');
        
  });
    
    
  module('About ChatCommunication.onReceived', {
    setup: function() {
      this.Connection = require('connection');
      this.textMessageModel = new TextMessageModel();
      this.contactModel = new ContactModel();
      this.textMessagesCollection = require('collection/TextMessagesCollection');
      this.contactsCollection = require('collection/ContactsCollection');
      this.textMessagesCollectionStubAdd = sinon.stub(this.textMessagesCollection, 'add' );
      this.textMessagesCollectionStubFind = sinon.stub(this.textMessagesCollection,'find' ).returns(this.textMessageModel);
      this.contactsCollectionStub = sinon.stub(this.contactsCollection, 'where' ).returns( [this.contactModel] );
    },
    teardown: function() {  
      this.textMessagesCollectionStubAdd.restore();
      this.textMessagesCollectionStubFind.restore();
      this.contactsCollectionStub.restore();
    }
  });
    
  test('Text message not delivered.', function() {
    expect( 4 );
        
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
        
    var data = JSON.stringify({"type":"notDelivered","contact":"johndoe","message":"hello"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
        
    equal(this.textMessagesCollectionStubAdd.callCount, 0, 'TextMessagesCollection.add not called.');
    equal(this.textMessagesCollectionStubFind.callCount, 1, 'TextMessagesCollection.find called.');
        
    equal( stub.callCount, 1, 'response.type === "notDelivered"');
    equal( stub.getCall(0).args[0], 'Messaggio per johndoe non è stato consegnato', "Alert correctly displayed." );
        
    stub.restore();
       
  });
    
  test('Text message delivered.', function() {
    expect( 3 );
        
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
        
    var data = JSON.stringify({"type":"sendText","username":"johndoe","message":"hello"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
        
    equal(this.textMessagesCollectionStubAdd.callCount, 1, 'TextMessagesCollection.add called.');
    equal(this.contactsCollectionStub.callCount, 2, 'ContactsCollection.where called twice.');
        
    equal( stub.callCount, 0, 'response.type === "sendText"');
        
    stub.restore();
       
  });
  
  test('Wrong type.', function() {
    expect( 3 );
        
    var stub = this.stub(window, 'alert', function(msg) { return false; } );
        
    var data = JSON.stringify({"type":"wrong","username":"johndoe","message":"hello"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
        
    equal(this.textMessagesCollectionStubAdd.callCount, 0, 'TextMessagesCollection.add not called.');
    equal(this.contactsCollectionStub.callCount, 0, 'ContactsCollection.where not called.');
        
    equal( stub.callCount, 0, 'wrong type');
        
    stub.restore();
       
  });
    
  module('About ChatCommunication.send', {
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
        
    ChatCommunication.send('johndoe','hello');    
    
    equal(this.sendStub.callCount, 1, 'Connection.send called.');
        
  });
  
});
