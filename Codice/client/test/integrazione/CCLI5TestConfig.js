require.config({
  baseUrl: '../../js/',
  paths: {
    jquery: '../test/resources/jquery/jquery-min',
    underscore: '../test/resources/underscore/underscore-min',
    backbone: '../test/resources/backbone/backbone',
    text: '../test/resources/require/text',
    storage: '../test/resources/backbone/backbone.noStorage',
    bootstrap: 'libs/bootstrap/bootstrap.min'
  },
  
  shim: {
    underscore: {
      exports: '_'
    },

    backbone: {
      deps: [ 'underscore', 'jquery' ],
      exports: 'Backbone'
    },

  	bootstrap:{
      deps: ['jquery']
    }
  }
});

QUnit.config.autostart = false;
 
require(['../integrazione/CCLI5Test.js', 'bootstrap'], function(){
  QUnit.start(); //Tests loaded, run tests
});
