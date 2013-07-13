/**
 * Nome:UserDataCommunication.js
 * Package: Communication
 * Autore: Zohouri Haghian Pardis
 * Data: 2013/04/12
 * Versione: 1.0
 * 
 * Modifiche:
 * +---------+---------------+-------------------------------------+
 * | Data    | Programmatore |        Modifiche                    | 
 * +---------+---------------+-------------------------------------+
 * |13/04/13 |    MC         | + aggiunti allert per capire se le  | 
 * |         |               |   modifiche sono state fatte        | 
 * +---------|---------------|-------------------------------------| 
 * |13/04/12 |    ZHP        | + Metodo checkPassword              | 
 * |         |               | + Metodo changeData                 | 
 * |_________|_______________|_____________________________________| 
 */
 
/**
 * classe che comunica con il server per i dati che riguardano il login
 */
define(['connection'], function(Connection){
  return {
    /**
     * metodo per controllare la correttezza delle credenziali inserite	
     */
    checkPassword: function(model, password, view) {
      var message = {
        type: 'checkCredentials',
        password: password
      };
      Connection.send(JSON.stringify(message));
      Connection.onmessage = function(str){
        var response = JSON.parse(str.data);
        /**
         * controllo della password inserita per poter effettuare modifiche
         */
        if(response.type==='checkCredentials'){
          if(response.answer === 'true'){
            view.callBacks().changeData(model, view);
          }else if(response.answer === 'false'){
            alert('Password non corretta');
          }
        }
      }
    },
    
    /**
     * metodo per confermare le modifiche sul proprio profilo da inviare al server
     */		
    changeData: function(model, name, surname, password, view){
      var credentials ={
        type: 'changeData',
        name:name,
        surname: surname,
        password: password
      };
      Connection.send(JSON.stringify(credentials));
      Connection.onmessage=function(str){
        var response = JSON.parse(str.data);
        /**
         * segnale di conferma da parte del server per la modifica dei dati
         */
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
            alert(response.error);		
          }
        }
      }
    }
  };
});
