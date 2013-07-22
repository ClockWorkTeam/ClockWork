/**
 * Nome:NotificationCommunication.js
 * Package: Communication
 * Autore: La Bruna Agostino
 * Data: 2013/04/08
 * Versione: 1.0
 *
 * Modifiche:
 * +---------+---------------+-------------------------------------+
 * | Data    | Programmatore |        Modifiche                    |
 * +---------+---------------+-------------------------------------+
 * |13/07/12 |    BG         | # Gestione conferenza nel metodo    |
 * |         |               |   onNotification                    |
 * +---------+---------------+-------------------------------------+
 * |13/04/09 |    LBA        | + variabile onCalling per capire se |
 * |         |               |   occupato o meno con altri utenti  |
 * +---------|---------------|-------------------------------------|
 * |13/04/08 |    LBA        | + Metodo listenNotification         |
 * |         |               | + Metodo refuse                     |
 * |_________|_______________|_____________________________________|
 */

/**
 * classe che comunica con il server per ricezione di notifiche di chiamata
 */
define(['connection', 'view/NotificationView'],function(Connection, NotificationView){

  /**
   * variabile che indica se sono già in chiamata o meno
   */
  var onCalling=false;
  
  var timeOut=null;
  return {
    //getStatus: function(){
    //  return onCalling;
    //},

    /**
     * funzione che si occupa di segnalare la presenza di chiamate in arrivo e avvertire l'utente
     */
    listenNotification : function(){
      var Notification=this;
      var notificationView=null;
      Connection.addEventListener('message', onNotification, false);
      document.addEventListener('setOnCall',setOnCall,false);
      function setOnCall(event){
        onCalling=event.detail.type;
      };
      /**
       * ascoltatore che si occupa di segnalare l'arrivo di segnali di chiamata
       */
      function onNotification(str){
        var response = JSON.parse(str.data);
        /**
         * segnala la presenza di una chiamata in ingresso
         */
        if (response.type === 'call'){
          if(onCalling==false){
            onCalling=true;
           
            notificationView= new NotificationView({caller: response.contact, typeCall: response.callType, conference: response.conference, NotificationCommunication:Notification});
            timeOut=setTimeout(function(){notificationView.timeoutCall()},30000);
          }else{
            var message = {
							type:'busy',
              contact: response.contact
            };
            Connection.send(JSON.stringify(message));
          }
        }

        /**
         * segnala la presenza di chiusura chiamata ancora prima che quest'ultima inizi
         */
        if (response.type === 'endCallEarly'){
          onCalling=false;
          if(notificationView != null){
            notificationView.unrender();
          }
        }
      };
    },

    /**
     * funzione che si occupa di inviare il segnale di rifiuta chiamata da parte del chiamato
     */
    refuse : function(caller){
      onCalling=false;
      var message = {
        type:'refuseCall',
        contact: caller
      };
      Connection.send(JSON.stringify(message));
    },
    
    stopTimeOut : function(){
      clearTimeout(timeOut);
    }
  };
});
