/*
 * Nome:SideViewTestConfig.js
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
  baseUrl: '../../js/',
  paths: {
    jquery: '../test/resources/jquery/jquery-min',
    underscore: '../test/resources/underscore/underscore-min',
    backbone: '../test/resources/backbone/backbone',
    text: '../test/resources/require/text',
    storage: '../test/resources/backbone/backbone.noStorage'
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

QUnit.config.autostart = false;
 
require(['../view/SideViewTest.js'], function(){
  QUnit.start(); //Tests loaded, run tests
});
