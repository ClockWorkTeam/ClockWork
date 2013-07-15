/**
 * Nome: TutorialsCollection.js
 * Package: collection
 * Autore: Furlan Valentino
 * Data: 2013/04/12
 * Versione: 1.0
 *
 * Modifiche:
 * +--------+---------------+------------------------------+
 * |  Data  | Programmatore |           Modifiche          |
 * +--------+---------------+------------------------------+
 * | 130412 |      FV       | + creazione documento        |
 */

define([
 'underscore',
 'backbone',
 'storage',
 'model/TutorialModel'
], function( _, Backbone, Storage, TutorialModel){
  var TutorialsCollection = Backbone.Collection.extend({

    model: TutorialModel,

    localStorage: new Storage('tutorials'),

  });
  return new TutorialsCollection();
});
