/*
 * Nome:main.js
 * Package: 
 * Autore:
 * Data:
 * Versione:
 * 
 * Modifiche:
 * +------+---------------+-----------+
 * | Data | Programmatore | Modifiche |
 * +------+---------------+-----------+
 * |      |               | Scrittura codice          |
 * |      |               | Inserite require  con le tre classi view iniziali |
*/
require.config({
  paths: {
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone',
    text: 'libs/require/text',
    storage: 'libs/backbone/backbone.noStorage'
  },
  
  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    }
  }

});

require(['connection', 'view/AuthenticationView', 'collection/ContactsCollection', 'communication/NotificationCommunication'], function(Connection, AuthenticationView, ContactsCollection, NotificationCommunication){
  NotificationCommunication.listenNotification();
  var authentication_view = new AuthenticationView({collection: ContactsCollection});
});

