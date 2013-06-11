//Wait for relevant code bits to load before starting any tests
define([ '../js/model/ContactModel', '../js/connection', '../js/view/CallView' ],
  function( ContactModel, Connection, callView ) {

module('About CallCommunication.sendCall', {

  setup: function() {
    
    window.Connection = Connection;
    this.sendSpy = sinon.stub(window.Connection, 'send');
    this.addSpy = sinon.spy(window.Connection, 'addEventListener');
    this.removeSpy = sinon.spy(window.Connection, 'removeEventListener');

    this.alertStub = sinon.stub(window, 'alert', function(msg) { return false; } );

    this.dispatchStub = sinon.stub(document, 'dispatchEvent' );
    this.startStub = sinon.stub(CallCommunication, 'startCall' );

  },

  teardown: function() {
    
    this.dispatchStub.restore();
    this.startStub.restore();
    
    this.sendSpy.restore();
    this.addSpy.restore();
    this.removeSpy.restore();
    
    this.alertStub.restore();
    
  }
  
});

  test('The contact answer the call.', function() {
      expect( 6 ); 
      
      var contact = new ContactModel();
      var callView = null;
      CallCommunication.sendCall('audio', contact, callView);
      
      var data = JSON.stringify({"type":"answeredCall","answer":"true"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      equal( this.dispatchStub.called, 1, 'document.dispatchEvent called once.');
      equal( this.sendSpy.callCount, 1, 'Connection.send called.');
      equal( this.addSpy.callCount, 1, 'Connection.addEventListener called.');
      equal( this.alertStub.called, false, 'response.answer === "true"');
      equal( this.startStub.callCount, 1, 'startCall called.');
      equal( this.removeSpy.callCount, 1, 'Connection.removeEventListener called.');

     
  });

  test('The contact refuse the call.', function() {
      expect( 8 );
      
      var contact = new ContactModel();
      var callView = { endCall: this.spy() };
      CallCommunication.sendCall('audio', contact, callView);
      
      var data = JSON.stringify({"type":"answeredCall","answer":"false"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      equal( this.dispatchStub.callCount, 2, 'document.dispatchEvent called twice.');
      equal( this.sendSpy.callCount, 1, 'Connection.send called.');
      equal( this.addSpy.callCount, 1, 'Connection.addEventListener called.');
      equal(callView.endCall.callCount, 1, 'callView.endCall called');
      equal( this.alertStub.callCount, 1, 'response.answer === "false"');
      equal( this.alertStub.getCall(0).args[0], 'chiamata rifiutata', "Alert correctly displayed." );
      equal( this.startStub.called, false, 'startCall not called.');
      equal( this.removeSpy.callCount, 1, 'Connection.removeEventListener called.');
     
  });

  test('The contact is busy.', function() {
      expect( 8 );
      
      var contact = new ContactModel();
      var callView = { endCall: this.spy() };
      CallCommunication.sendCall('audio', contact, callView);
      
      var data = JSON.stringify({"type":"answeredCall","answer":"busy"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      equal( this.dispatchStub.callCount, 2, 'document.dispatchEvent called twice.');
      equal( this.sendSpy.callCount, 1, 'Connection.send called.');
      equal( this.addSpy.callCount, 1, 'Connection.addEventListener called.');
      equal(callView.endCall.callCount, 1, 'callView.endCall called');
      equal( this.alertStub.callCount, 1, 'response.answer === "busy"');
      equal( this.alertStub.getCall(0).args[0], 'utente occupato', "Alert correctly displayed." );
      equal( this.startStub.called, false, 'startCall not called.');
      equal( this.removeSpy.callCount, 1, 'Connection.removeEventListener called.');
     
  });

  test('There was an error during the setup of the call.', function() {
      expect( 8 );
      
      var contact = new ContactModel();
      var callView = { endCall: this.spy() };
      CallCommunication.sendCall('audio', contact, callView);
      
      var data = JSON.stringify({"type":"answeredCall","answer":"error"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      equal( this.dispatchStub.callCount, 2, 'document.dispatchEvent called twice.');
      equal( this.sendSpy.callCount, 1, 'Connection.send called.');
      equal( this.addSpy.callCount, 1, 'Connection.addEventListener called.');
      equal(callView.endCall.callCount, 1, 'callView.endCall called');
      equal( this.alertStub.callCount, 1, 'response.answer === "error"');
      equal( this.alertStub.getCall(0).args[0], 'errore durante la chiamata', "Alert correctly displayed." );
      equal( this.startStub.called, false, 'startCall not called.');
      equal( this.removeSpy.callCount, 1, 'Connection.removeEventListener called.');
     
  });
  
module('About CallCommunication.sendAnswer', {

  setup: function() {

    window.Connection = Connection;
    this.sendSpy = sinon.stub(window.Connection, 'send');
    
    this.startStub = sinon.stub(CallCommunication, 'startCall' );

  },

  teardown: function() {

    this.startStub.restore();
    
    this.sendSpy.restore();
    
  }
  
});
  
  test('Answer to an incoming call.', function() {
    expect( 2 );
    
    var contact = new ContactModel();
    var callView = { endCall: this.spy() };
    
    CallCommunication.sendAnswer('audio', contact, callView);
    
    equal( this.sendSpy.callCount, 1, 'Connection.send called.');
    equal( this.startStub.callCount, 1, 'startCall called.');

  });
  
module('About CallCommunication.createPeerConnection', {

  setup: function() {
    
  },

  teardown: function() {
    
  }
  
});
  
  test('onRemoteStreamAdded Called', function() {
    expect( 2 );
    
    var createObjURLStub = this.stub(window.webkitURL, 'createObjectURL');
    this.dispatchStub = this.stub(document, 'dispatchEvent' );
    
    CallCommunication.createPeerConnection();
    
    var data = JSON.stringify({"type":"stream","stream":"blob"});
    var event = document.createEvent('Event');
    event.initEvent('addstream', false, false, data, 'ws://127.0.0.1', 12, window, null);
    peerConnection.dispatchEvent(event);
    
    equal( createObjURLStub.callCount, 1, 'window.webkitURL.createObjectURL called.');
    equal( this.dispatchStub.callCount, 1, 'window.dispatchEvent called.');
    
    this.dispatchStub.restore();
    createObjURLStub.restore();

  });
  
  test('onRemoteStreamRemoved Called', function() {
    expect( 2 );
    
    CallCommunication.createPeerConnection();
    
    this.removeSpy = this.stub(peerConnection, 'removeStream');
    this.closeSpy = this.stub(peerConnection, 'close');
    
    var data = JSON.stringify({"type":"stream","stream":"blob"});
    var event = document.createEvent('Event');
    event.initEvent('oniceconnectionstatechange', false, false, data, 'ws://127.0.0.1', 12, window, null);
    peerConnection.dispatchEvent(event);
    
    equal( this.removeSpy.callCount, 1, 'peerConnection.removeStream called.');
    equal( this.closeSpy.callCount, 1, 'peerConnection.close called.');
    
    this.removeSpy.restore();
    this.closeSpy.restore();

  });
  
module('About CallCommunication.connect', {

  setup: function() {
    this.pcStub = sinon.stub(CallCommunication, 'createPeerConnection');
    this.alertStub = sinon.stub(window, 'alert', function(msg) { return false; } );
  },

  teardown: function() {
    this.pcStub.restore();
    this.alertStub.restore();
  }
  
});
  
  test('Call not started and localStream started', function() {
    expect( 4 );
    
    this.addStub = this.stub(peerConnection, 'addStream');
    this.createStub = this.stub(peerConnection, 'createOffer');
    
    localStream = true;
    CallCommunication.connect(false);

    equal( this.alertStub.callCount, 0, '!started == true && localStream started'); 
    equal( this.addStub.callCount, 1, 'peerConnection.addstream called.');
    equal( this.createStub.callCount, 1, 'peerConnection.createOffer called.');
    equal( this.pcStub.callCount, 1, 'createPeerConnection called.');
    
    this.addStub.restore();
    this.createStub.restore();

  });
  
  test('Call started or localStream not started', function() {
    expect( 3 );

    localStream = false;
    CallCommunication.connect(false);

    equal( this.pcStub.callCount, 0, 'createPeerConnection not called.');
    equal( this.alertStub.callCount, 1, '!started == false || localStream == false');
    equal( this.alertStub.getCall(0).args[0], 'Local stream not running yet.', "Alert correctly displayed." );


  });
  
module('About CallCommunication.gotDescription', {

  setup: function() {
    this.setStub = sinon.stub(peerConnection, 'setLocalDescription');
    window.Connection = Connection;
    this.sendSpy = sinon.stub(window.Connection, 'send');
  },

  teardown: function() {
    this.setStub.restore();
    this.sendSpy.restore();
  }
  
});
  
  test('Call not started and localStream started', function() {
    expect( 2 );
    
    CallCommunication.gotDescription(true);

    equal( this.setStub.callCount, 1, 'peerConnection.setLocalDescription called.');
    equal( this.sendSpy.callCount, 1, 'Connection.send called.');

  });

module('About CallCommunication.startCall', {

  setup: function() {
    this.getUserMediaSpy = sinon.spy(navigator, 'webkitGetUserMedia');
    window.Connection = Connection;
    this.sendSpy = sinon.stub(window.Connection, 'send');
  },

  teardown: function() {
    this.getUserMediaSpy.restore();
    this.sendSpy.restore();
  }
  
});
  
  test('isCaller==true && typecall=="video"', function() {
    expect( 1 );
    
    var view = new callView();
    CallCommunication.startCall(true, 'audio', CallCommunication, view);

    equal( this.getUserMediaSpy.callCount, 1, 'webkitGetUserMedia called.');

  });
  
  test('isCaller==true && typecall=="audio"', function() {
    expect( 1 );
    
    var view = new callView();
    CallCommunication.startCall(true, 'audio', CallCommunication, view);

    equal( this.getUserMediaSpy.callCount, 1, 'webkitGetUserMedia called.');

  });

});
