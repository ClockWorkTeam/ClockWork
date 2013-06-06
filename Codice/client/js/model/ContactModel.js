/*
 * Nome: ContactModel.js
 * Package: model
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
define([
  'underscore',
  'backbone'
  ], function(_, Backbone){
    var ContactModel = Backbone.Model.extend({

      defaults: {
        username: '',
        name: '',
        surname: '',
        IP: '0.0.0.0',
      	unread: 0
      }

    });
    return ContactModel;
});
