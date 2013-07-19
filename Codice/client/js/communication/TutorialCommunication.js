/**
 * Nome:TutorialCommunication.js
 * Package: Communication
 * Autore: 
 * Data: 2013/04/10
 * Versione: 1.0
 * 
 * Modifiche:
 * +---------+---------------+-------------------------------------+
 * | Data    | Programmatore |        Modifiche                    | 
 * +---------+---------------+-------------------------------------+
 * |         |               |                                     | 
 * |         |               |                                     |  
 * |_________|_______________|_____________________________________| 
 */
 
/**
 * classe che si occupa di gestire il recupero dei tutorial
 */
define(['connection', 'collection/TutorialsCollection'], function(Connection, TutorialsCollection){

  /**
   * listener di tutorial in arrivo
   */
  Connection.addEventListener('message', onReceived, false);
  function onReceived(str){
    var response = JSON.parse(str.data);
    if (response.type === 'tutorials'){
      for(var i=0; i<response.size; i++){
          TutorialsCollection.add({
            title: response['title'+i], 
            url: response['path'+i]
          });
      };
    }
  };
	
});
