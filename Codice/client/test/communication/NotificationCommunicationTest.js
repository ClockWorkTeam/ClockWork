//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/NotificationCommunication'], 
	function( NotificationCommunication ) {

module('About NotificationCommunication.listenNotification', {
    setup: function() {
      this.Connection = require('connection');
      this.notificationView = require('view/NotificationView');
      this.view = new this.notificationView();
      this.sendStub = sinon.stub(this.Connection, 'send' );
      this.notificationViewStub = sinon.spy(this.view, 'unrender');
      //this.renderStub = sinon.stub(this.view, 'render' );

    },
    teardown: function() {  
      this.sendStub.restore();
      this.notificationViewStub.restore();
      //this.renderStub.restore();
    }
  });

  test('Check of the termination of call without call in progress', function() {
    expect( 1 );
    
    NotificationCommunication.listenNotification();

    var data = JSON.stringify({"type":"call","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    equal(this.sendStub.callCount, 0, 'There are no call is in progress.');
  
  });

  test('Check of the presence of an incoming call with call in progress', function() {
    expect( 1 );
    
    NotificationCommunication.listenNotification();
    
    var event=new CustomEvent('setOnCall', {detail:{type:true}, bubbles:true, cancelable:true} ); 
    document.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"call","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    equal(this.sendStub.callCount, 2, 'Another call is in progress.');
        
  });


  test('Check of the presence of an incoming call with call in progress', function() {
    expect( 1 );
    
    NotificationCommunication.listenNotification();
    
    
    
    var data = JSON.stringify({"type":"endcall","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    equal(this.notificationViewStub.callCount, 0, 'unrender not called.');
      
  });
  
  test('Check of the presence of an incoming call without call in progress', function() {
    expect( 1 );
    
    NotificationCommunication.listenNotification();
    
    var data = JSON.stringify({"type":"call","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"endcall","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    equal(this.notificationViewStub.callCount, 1, 'unrender called.');
      
  });



module('About NotificationCommunication.refuse', {
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
        
    NotificationCommunication.refuse('johndoe');    
    
    equal(this.sendStub.callCount, 1, 'Connection.send called.');
        
  });
 
});
