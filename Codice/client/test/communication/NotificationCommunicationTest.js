//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/NotificationCommunication'], 
	function( NotificationCommunication ) {

module('About NotificationCommunication.listenNotification', {
    setup: function() {
      this.Connection = require('connection');
      this.sendStub = sinon.stub(this.Connection, 'send' );
      this.addEventListenerStub = sinon.stub(this.Connection, 'addEventListener' );

    },
    teardown: function() {  
      this.sendStub.restore();
      this.addEventListenerStub.restore();
      clearTimeout();
    }
  });

  test('Show a notification for an incoming call', function() {
    expect( 2 );
    
    NotificationCommunication.listenNotification();
    var data = JSON.stringify({"type":"call","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    equal(this.addEventListenerStub.callCount, 1, 'Connection.addEventListener called.');
    equal(this.sendStub.callCount, 0, 'Showing notification View');
  
  });

  test('Already calling', function() {
    expect( 1 );

    NotificationCommunication.listenNotification();
    var event=new CustomEvent('setOnCall', {detail:{type:true}, bubbles:true, cancelable:true} ); 
    document.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"call","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    equal(this.sendStub.called, false, 'Another call is in progress.');
        
  });
  
  test('Wrong type', function() {
    expect( 1 );

    NotificationCommunication.listenNotification();
    var event=new CustomEvent('setOnCall', {detail:{type:true}, bubbles:true, cancelable:true} ); 
    document.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"wrong","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    equal(this.sendStub.called, 0, 'Wrong type.');
        
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

  test('Check the sending of the refuse signal.', function() {
    expect( 1 );
        
    NotificationCommunication.refuse('johndoe');    
    
    equal(this.sendStub.callCount, 1, 'Connection.send called.');
        
  });
 
});
