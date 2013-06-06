//Wait for relevant code bits to load before starting any tests
define([ '../js/communication/AuthenticationCommunication', '../js/connection' ], function( AuthenticationCommunication, Connection ) {

module('About AuthenticationCommunication', {

  setup: function() {
    
    this.server = sinon.fakeServer.create();
    //var Connection = { send: function(){}, onmessage: function(){} };
    this.sendStub = sinon.stub(Connection, 'send');
    //this.onmessageStub = sinon.stub(Connection, 'onmessage');

  },

  teardown: function() {
    
    this.sendStub.restore();
    //this.onmessageStub.restore();
    this.server.restore();
    
  }
  
});

  test('Login with wrong credentials.', function() {
      expect( 2 );
      
      var callBacks = this.spy();
      var view = this.spy();
      
      AuthenticationCommunication.checkCredentials( 'johndoe', '1234', callBacks, view );
      //Connection.onmessage(JSON.stringify({ data: {  } }));
      
      this.server.respondWith(
          200,
          { data: { JSON.stringify([{ type: 'login', answer: 'false' }] })
      );
      
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
