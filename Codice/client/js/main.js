/*
 * Nome:main.js
 * Package: client
 * Autore: Ceseracciu Marco
 * Data: 2013/05/18
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+-----------------------+
 * |  Data  | Programmatore |      Modifiche        |
 * +--------+---------------+-----------------------+
 * | 130518 |     CM        | + main                |
 * |        |               | + creazione documento |
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
  var authentication_view = new AuthenticationView();
});

