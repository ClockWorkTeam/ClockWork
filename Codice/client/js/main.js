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
require(['./common'], function (common) {
  require(['connection',
           'view/AuthenticationView',
           'collection/ContactsCollection',
           'communication/NotificationCommunication',
           'bootstrap'],
           function(Connection,
           AuthenticationView,
           ContactsCollection,
           NotificationCommunication,
           bootstrap){
    NotificationCommunication.listenNotification();
    var authentication_view = new AuthenticationView();
  });
});

