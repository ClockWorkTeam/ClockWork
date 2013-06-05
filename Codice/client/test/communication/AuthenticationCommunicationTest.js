//Wait for relevant code bits to load before starting any tests
define(['../js/communication/AuthenticationCommunication'], function( AuthenticationCommunication) {

module('Test Communication');

test('checkCredentials metod', function() {
    expect( 1 );
	
	/*
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
