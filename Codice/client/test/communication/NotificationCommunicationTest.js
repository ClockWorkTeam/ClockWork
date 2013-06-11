//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/NotificationCommunication'], 
	function( NotificationCommunication ) {

module('About NotificationCommunication.listenNotification', {
    setup: function() {
      this.Connection = require('connection');
      //this.notificationView = require('view/NotificationView');
      //this.view = new this.notificationView();
      this.sendStub = sinon.stub(this.Connection, 'send' );
      //this.viewStub = sinon.spy(NotificationCommunication.listenNotification, 'notificationView' );
      //this.notificationViewStub = sinon.stub(this.view, 'unrender');
      //this.renderStub = sinon.stub(this.view, 'render' );

    },
    teardown: function() {  
      this.sendStub.restore();
      //this.viewStub.restore();
      clearTimeout();
      //this.notificationViewStub.restore();
      //this.renderStub.restore();
    }
  });

  test('Show a notification for an incoming call', function() {
    expect( 1 );
    
    NotificationCommunication.listenNotification();
    var data = JSON.stringify({"type":"call","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    equal(this.sendStub.callCount, 0, 'Showing notification View');
  
  });

  test('Already calling', function() {
    expect( 1 );
    
    var event=new CustomEvent('setOnCall', {detail:{type:true}, bubbles:true, cancelable:true} ); 
    document.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"call","contact":"johndoe","typecall":"video"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
    this.Connection.dispatchEvent(event);
    
    equal(this.sendStub.callCount, 1, 'Another call is in progress.');
        
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
