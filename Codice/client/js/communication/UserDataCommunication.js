/**
 * Nome:UserDataCommunication.js
 * Package: communication
 * Autore:
 * Data:
 * Versione:
 * 
 * Modifiche:
 * +------+---------------+-----------+
 * | Data | Programmatore | Modifiche |
 * +------+---------------+-----------+
 * |      |               |           |
 */
 
//classe che comunica con il server per i dati che riguardano il login
define(['connection'], function(Connection){
  return {
    //metodo per controllare la correttezza delle credenziali inserite	
    checkPassword: function(model, password, view) {
      var credentials = {
	type: 'checkCredentials',
        username: model.toJSON().username,
        password: password
      };
      Connection.send(JSON.stringify(credentials));
      Connection.onmessage = function(str){
	var response = JSON.parse(str.data);
	if(response.type==='checkCredentials'){
	  if(response.answer === 'true'){
	    view.callBacks().changeData(model, view);
	  }else if(response.answer === 'false'){
	    alert('Password non corretta');
	  }
	}
      }
    },
		
    changeData: function(model, name, surname, password, view){
      var credentials ={
	type: 'changeData',
	username: model.toJSON().username,
	name:name,
	surname: surname,
	password: password
      };
      Connection.send(JSON.stringify(credentials));
      Connection.onmessage=function(str){
	var response = JSON.parse(str.data);
	if(response.type==='changeData'){
	  if(response.answer === 'true'){
	    model.set({
	      name:name,
	      surname: surname,
	      password: password
	    });
	    view.render();
	    alert('Operazione riuscita');		
	  }else if(response.answer === 'false'){
	    alert('Operazione fallita');		
	  }
	}
      }
    }
  };
});
