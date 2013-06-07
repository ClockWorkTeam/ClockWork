//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/AuthenticationCommunication'], function( AuthenticationCommunication ) {

module('About AuthenticationCommunication', {

  setup: function() {
    
    this.Connection = require('connection');
    this.sendSpy = sinon.spy();
    this.sendStub = sinon.stub(this.Connection, 'send', this.sendSpy );
    //var Connection = { send: function(){}, onmessage: function(){} };
    //this.sendStub = sinon.stub(Connection, 'send', function(string){} );
    //this.onmessageStub = sinon.stub(Connection, 'onmessage');

  },

  teardown: function() {
    
    //this.sendStub.restore();
    //this.onmessageStub.restore();

    
  }
  
});

  test('Login with wrong credentials.', function() {
      expect( 4 );
      
      var callBacks = this.spy();
      var view = this.spy();
      
      AuthenticationCommunication.checkCredentials( 'johndoe', '1234', callBacks, view );
      
      var data = JSON.stringify({"type":"login","answer":"false"});
      var event = document.createEvent('MessageEvent');
      event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null)      
      this.Connection.dispatchEvent(event);
      
      ok(this.sendSpy.called);
      equal(this.sendSpy.callCount, 1);
      equal(callBacks.callCount, 0);
      equal(view.callCount, 0);
    
    /*
     * 
     * 
     * codice di checkCredentials
    checkCredentials: function(user, pass, callBacks, view) {
      var credentials = {
        type: "login",
        username: user,
        password: pass
      };
      Connection.send(JSON.stringify(credentials));
      //ascoltatore di eventi da parte del server che si occupa di verificare
      //che le credenziali inserite siano corrette o meno
      Connection.onmessage = function(str){
        var response = JSON.parse(str.data);
        if(response.type==="login"){				
          if(response.answer === "true"){
            callBacks.doLogin(user, pass, response, view);
          }else if(response.answer === "false"){
            alert("Login e username errate");
          }
        }
      }
      }
      */
     
  });


});
