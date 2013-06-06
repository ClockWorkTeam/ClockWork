/**
 * Nome: ContactModel.js
 * Package: Model
 * Autore: La Bruna Agostino
 * Data: 2013/04/05
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+----------------------+
 * |  Data  | Programmatore | Modifiche            | 
 * +--------+---------------+----------------------+
 * |13/04/05|     LBA       | + Creazione documento| 
 * |_______________________________________________| 
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
