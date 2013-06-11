/**
 * Nome: RecordMessageModel.js
 * Package: Model
 * Autore: La Bruna Agostino
 * Data: 2013/04/05
 * Versione: 1.0
 * 
 * Modifiche:
 * +--------+---------------+-------------------------+
 * |  Data  | Programmatore | Modifiche               | 
 * +--------+---------------+-------------------------+
 * |13/04/05|     LBA       | + Creazione documento   | 
 * |__________________________________________________| 
 */

define([
  'underscore',
  'backbone'
], function(_, Backbone){
  var RecordMessageModel = Backbone.Model.extend({

    defaults: {
      contact: '',
      record: '',
      date: '' 
    },
    
  });
  return RecordMessageModel;
});
