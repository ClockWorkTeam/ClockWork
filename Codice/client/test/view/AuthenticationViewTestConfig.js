/*
 * Nome:AuthenticationViewTestConfig.js
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
    jquery: '../resources/jquery/jquery-min',
    underscore: '../resources/underscore/underscore-min',
    backbone: '../resources/backbone/backbone',
    text: '../resources/require/text',
    storage: '../resources/backbone/backbone.noStorage'
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
 
require(['AuthenticationViewTest.js'], function(){
  QUnit.start(); //Tests loaded, run tests
});
