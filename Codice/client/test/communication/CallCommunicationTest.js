//Wait for relevant code bits to load before starting any tests
define([ '../js/model/ContactModel', '../js/connection', '../js/view/CallView' ],
  function( ContactModel, Connection, callView ) {

module('About CallCommunication.sendCall', {

  setup: function() {
    window.Connection = Connection;
    this.sendStub = sinon.stub(window.Connection, 'send');
    this.stream=null;
    this.navigatorStub = sinon.stub(navigator, 'webkitGetUserMedia', function(uno, func) {func(this.stream);} );
    this.windowStub = sinon.stub(window.webkitURL, 'createObjectURL');
    this.addSpy = sinon.spy(window.Connection, 'addEventListener');
    this.removeSpy = sinon.spy(window.Connection, 'removeEventListener');
    this.alertStub = sinon.stub(window, 'alert', function(msg) { return false; } );
    this.dispatchStub = sinon.stub(document, 'dispatchEvent' );
    this.startStub = sinon.stub(CallCommunication, 'startCall' );
  },

  teardown: function() {
    this.dispatchStub.restore();
    this.startStub.restore();
    this.navigatorStub.restore();
    this.windowStub.restore();
    this.sendStub.restore();
    this.addSpy.restore();
    this.removeSpy.restore();
    this.alertStub.restore();
  }
});

  test('The contact answer the call.', function() {
      expect( 7 ); 
      var contact = recipient;
      var callView = { addVideoConference: this.spy() };
      var conference = null;
      typeCall = 'video';
      CallCommunication.sendCall('audio', contact, callView, conference);
      
      var data = JSON.stringify({"type":"answeredCall","answer":"true","user":"user"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      equal( this.dispatchStub.callCount, 1, 'document.dispatchEvent called once.');
      equal( this.sendStub.called, true, 'Connection.send called.');
      equal( this.addSpy.callCount, 1, 'Connection.addEventListener called.');
      equal( callView.addVideoConference.callCount, 1, 'callView.addVideoConference called');
      equal( this.startStub.callCount, 1, 'startCall called.');
      equal( this.removeSpy.callCount, 1, 'Connection.removeEventListener called.');
      equal( this.alertStub.called, false, 'response.answer === "true"');
  });

  test('The contact refuse the call.', function() {
      expect( 8 );
      //recipient=new Array();
      //recipient.push("user");
      var contact = recipient;
      var callView = { endCall: this.spy() };
      var conference = null;
      CallCommunication.sendCall('audio', contact, callView, conference);
      
      var data = JSON.stringify({"type":"answeredCall","answer":"false", "error":"chiamata rifiutata"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      equal( this.dispatchStub.callCount, 2, 'document.dispatchEvent called twice.');
      equal( this.sendStub.callCount, 1, 'Connection.send called.');
      equal( this.addSpy.callCount, 1, 'Connection.addEventListener called.');
      equal( callView.endCall.callCount, 1, 'callView.endCall called');
      equal( this.alertStub.callCount, 1, 'response.answer === "false"');
      equal( this.alertStub.getCall(0).args[0], 'chiamata rifiutata', "Alert correctly displayed." );
      equal( this.startStub.called, false, 'startCall not called.');
      equal( this.removeSpy.callCount, 1, 'Connection.removeEventListener called.');
     
  });
  










module('About CallCommunication.sendAnswer', {

  setup: function() {
    window.Connection = Connection;
    this.sendStub = sinon.stub(window.Connection, 'send');
    this.stream=null;
    this.error=null;
    this.navigatorStub = sinon.stub(navigator, 'webkitGetUserMedia', function(uno, func, func2) {func2(this.error);func(this.stream);} );
    this.windowStub = sinon.stub(window.webkitURL, 'createObjectURL');
    this.addSpy = sinon.spy(window.Connection, 'addEventListener');
    this.removeSpy = sinon.spy(window.Connection, 'removeEventListener');
    //this.alertStub = sinon.stub(window, 'alert', function(msg) { return false; } );
    this.dispatchStub = sinon.stub(document, 'dispatchEvent' );
    this.startStub = sinon.stub(CallCommunication, 'startCall' );
  },

  teardown: function() {
    this.dispatchStub.restore();
    this.startStub.restore();
    this.navigatorStub.restore();
    this.windowStub.restore();
    this.sendStub.restore();
    this.addSpy.restore();
    this.removeSpy.restore();
    //this.alertStub.restore();
  }
});

  test('addConferenceCaller.', function() {
      expect( 6 ); 
      var contact = recipient;
      var callView = { addVideoConference: this.spy() };
      var conference = null;
      typeCall = 'video';
      CallCommunication.sendAnswer('audio', contact, callView, conference);
      
      var data = JSON.stringify({"type":"addConferenceCaller","answer":"true","user":"user"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      var data = JSON.stringify({"type":"addConferenceAnswer","answer":"true","user":"user"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      var data = JSON.stringify({"type":"endCallEarly","answer":"true","user":"user"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
      window.Connection.dispatchEvent(event);
      
      equal( this.dispatchStub.callCount, 1, 'document.dispatchEvent called once.');
      equal( this.sendStub.called, true, 'Connection.send called.');
      equal( this.addSpy.callCount, 1, 'Connection.addEventListener called.');
      equal( callView.addVideoConference.callCount, 3, 'callView.addVideoConference called');
      equal( this.startStub.callCount, 3, 'startCall called.');
      equal( this.removeSpy.callCount, 0, 'Connection.removeEventListener called.');
      //equal( this.alertStub.called, false, 'response.answer === "true"');
  });

module('About CallCommunication.createPeerConnection', {
  setup: function() {
    var pcConfig = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
    peerConnection['user'] = new webkitRTCPeerConnection(pcConfig);
    remotevid['user'] = new webkitRTCPeerConnection(pcConfig);
  },

  teardown: function() {
  }
});
  
  test('onRemoteStreamAdded Called', function() {
    expect( 2 );
    
    var createObjURLStub = this.stub(window.webkitURL, 'createObjectURL');
    this.dispatchStub = this.stub(document, 'dispatchEvent' );
    
    CallCommunication.createPeerConnection('user');
    
    var data = JSON.stringify({"type":"stream","stream":"blob"});
    var event = document.createEvent('Event');
    event.initEvent('addstream', false, false, data, 'ws://127.0.0.1', 12, window, null);
    peerConnection['user'].dispatchEvent(event);
    
    equal( createObjURLStub.callCount, 1, 'window.webkitURL.createObjectURL called.');
    equal( this.dispatchStub.callCount, 1, 'window.dispatchEvent called.');
    
    this.dispatchStub.restore();
    createObjURLStub.restore();

  });
  
  test('onRemoteStreamRemoved Called', function() {
    expect( 2 );
    
    CallCommunication.createPeerConnection('user');
    
    this.removeSpy = this.stub(peerConnection['user'], 'removeStream');
    this.closeSpy = this.stub(peerConnection['user'], 'close');
    
    var data = JSON.stringify({"type":"stream","stream":"blob"});
    var event = document.createEvent('Event');
    event.initEvent('oniceconnectionstatechange', false, false, data, 'ws://127.0.0.1', 12, window, null);
    peerConnection['user'].dispatchEvent(event);
    
    equal( this.removeSpy.callCount, 1, 'peerConnection.removeStream called.');
    equal( this.closeSpy.callCount, 1, 'peerConnection.close called.');
    
    this.removeSpy.restore();
    this.closeSpy.restore();

  });

module('About CallCommunication.connect', {

  setup: function() {
    this.pcStub = sinon.stub(CallCommunication, 'createPeerConnection');
    var pcConfig = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
    peerConnection['user'] = new webkitRTCPeerConnection(pcConfig);
    this.alertStub = sinon.stub(window, 'alert', function(msg) { return false; } );
  },

  teardown: function() {
    this.pcStub.restore();
    this.alertStub.restore();
  }
  
});
  
  test('Call not started and localStream started', function() {
    expect( 4 );
    
    this.addStub = this.stub(peerConnection['user'], 'addStream');
    this.createStub = this.stub(peerConnection['user'], 'createOffer');
    
    localStream = true;
    CallCommunication.connect(false,'user');

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
    CallCommunication.connect(false,'user');

    equal( this.pcStub.callCount, 0, 'createPeerConnection not called.');
    equal( this.alertStub.callCount, 1, '!started == false || localStream == false');
    equal( this.alertStub.getCall(0).args[0], 'Local stream not running yet.', "Alert correctly displayed." );


  });
  /*
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
*/
module('About CallCommunication.startCall', {

  setup: function() {
    
    this.pcStub = sinon.stub(CallCommunication, 'createPeerConnection');
    var pcConfig = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
    peerConnection['user'] = new webkitRTCPeerConnection(pcConfig);
    
    this.getUserMediaSpy = sinon.spy(navigator, 'webkitGetUserMedia');
    this.objSpy = sinon.spy(window.webkitURL, 'createObjectURL');
    this.connectSpy = sinon.stub(CallCommunication, 'connect');
    this.addStreamStub = sinon.stub(peerConnection['user'], 'addStream');
    this.setRemoteDescriptionStub = sinon.stub(peerConnection['user'], 'setRemoteDescription');
    this.addIceCandidateStub = sinon.stub(peerConnection['user'], 'addIceCandidate');
    this.removeStreamStub = sinon.stub(peerConnection['user'], 'removeStream');
    this.createAnswer = sinon.stub(peerConnection['user'], 'createAnswer');
    this.closeAnswer = sinon.stub(peerConnection['user'], 'close');
    
    
    
    window.Connection = Connection;
    this.addSpy = sinon.spy(window.Connection, 'addEventListener');
    this.removeSpy = sinon.spy(window.Connection, 'removeEventListener');
    
  },

  teardown: function() {
    this.getUserMediaSpy.restore();
    this.objSpy.restore();
    this.connectSpy.restore();
    this.addSpy.restore();
    this.removeSpy.restore();
    this.setRemoteDescriptionStub.restore();
    this.addIceCandidateStub.restore();
    this.removeStreamStub.restore();
    this.addStreamStub.restore();
    this.createAnswer.restore();
    this.closeAnswer.restore();
  }
  
});
  
  test('isCaller==true|false && typecall=="video"', function() {
    expect( 8 );
    
    var view = new callView();
    CallCommunication.startCall(true, CallCommunication, view, 'user');

    var data = JSON.stringify({"type":"answer","contact":"user"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
    window.Connection.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"candidate","contact":"user"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
    window.Connection.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"endCall","contact":"user"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
    window.Connection.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"candidateReady","contact":"user"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
    window.Connection.dispatchEvent(event);

    //equal( this.getUserMediaSpy.callCount, 1, 'webkitGetUserMedia called.');
    equal( this.addSpy.callCount, 4, 'webkitGetUserMedia called.');
    equal( this.setRemoteDescriptionStub.callCount, 1, 'setRemoteDescriptionStub called.');
    equal( this.addIceCandidateStub.callCount, 1, 'addIceCandidateStub called.');
    equal( this.removeSpy.callCount, 4, 'removeEventListener called.');

    CallCommunication.startCall(false, CallCommunication, view, 'user');

    var data = JSON.stringify({"type":"offer","contact":"user"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
    window.Connection.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"candidate","contact":"user"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
    window.Connection.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"endCall","contact":"user"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
    window.Connection.dispatchEvent(event);
    
    var data = JSON.stringify({"type":"candidateReady","contact":"user"});
    var event = document.createEvent('MessageEvent');
    event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
    window.Connection.dispatchEvent(event);

    //equal( this.getUserMediaSpy.callCount, 1, 'webkitGetUserMedia called.');
    equal( this.addSpy.callCount-4, 4, 'webkitGetUserMedia called.');
    equal( this.setRemoteDescriptionStub.callCount-1, 1, 'setRemoteDescriptionStub called.');
    equal( this.addIceCandidateStub.callCount-1, 1, 'addIceCandidateStub called.');
    equal( this.removeSpy.callCount-4, 4, 'removeEventListener called.');
  });
  
  module('About CallCommunication.recoverCall', {

  setup: function() {
    
    //this.pcStub = sinon.stub(CallCommunication, 'createPeerConnection');
    var pcConfig = {'iceServers': [{'url': 'stun:stun.l.google.com:19302'}]};
    peerConnection['user'] = new webkitRTCPeerConnection(pcConfig);
    remoteStream['user'] = new webkitRTCPeerConnection(pcConfig);
    localStream=null;
    
    this.getUserMediaSpy = sinon.spy(navigator, 'webkitGetUserMedia');
    this.objSpy = sinon.spy(window.webkitURL, 'createObjectURL');
    this.connectSpy = sinon.stub(CallCommunication, 'connect');
    this.addStreamStub = sinon.stub(peerConnection['user'], 'addStream');
    this.setRemoteDescriptionStub = sinon.stub(peerConnection['user'], 'setRemoteDescription');
    this.addIceCandidateStub = sinon.stub(peerConnection['user'], 'addIceCandidate');
    this.removeStreamStub = sinon.stub(peerConnection['user'], 'removeStream');
    this.createAnswer = sinon.stub(peerConnection['user'], 'createAnswer');
    this.closeAnswer = sinon.stub(peerConnection['user'], 'close');
    
    
    
    
    window.Connection = Connection;
    this.addSpy = sinon.spy(window.Connection, 'addEventListener');
    this.removeSpy = sinon.spy(window.Connection, 'removeEventListener');
    
  },

  teardown: function() {
    this.getUserMediaSpy.restore();
    this.objSpy.restore();
    this.connectSpy.restore();
    this.addSpy.restore();
    this.removeSpy.restore();
    this.setRemoteDescriptionStub.restore();
    this.addIceCandidateStub.restore();
    this.removeStreamStub.restore();
    this.addStreamStub.restore();
    this.createAnswer.restore();
    this.closeAnswer.restore();
  }
  
});
  
  test('isCaller==true|false && typecall=="video"', function() {
    expect( 2 );
    
    var callView = { addVideoConference: this.spy() };;
    CallCommunication.recoverCall(callView);

    //equal( this.getUserMediaSpy.callCount, 1, 'webkitGetUserMedia called.');
    equal( this.objSpy.callCount, 1, 'webkitGetUserMedia called.');
    equal( callView.addVideoConference.callCount, 2, 'setRemoteDescriptionStub called.');
  });
  
});
