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
  require(['view/TutorialView',
           'bootstrap',
           'communication/TutorialCommunication'],
           function(TutorialView,
           bootstrap,
           TutorialCommunication){
    var tutorialView = new TutorialView();
  });
});
