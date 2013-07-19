define([ '../js/communication/TutorialCommunication', '../js/view/TutorialView'], function( TutorialCommunication,  TutorialView ) {

  module( 'About tutorial', {
      setup: function() {
        this.tutorialView = new TutorialView();
        this.Connection = require('connection');
        var data = JSON.stringify({"type":"tutorials","size":"3", "title0":"uno","path0":"78y38r","title1":"due","path1":"34ru8r9","title2":"tre","path2":"r3478r"});
        var event = document.createEvent('MessageEvent');
        event.initMessageEvent('message', false, false, data, 'ws://127.0.0.1', 12, window, null);
        this.Connection.dispatchEvent(event);
      },
      teardown: function() {
        this.tutorialView.remove();
      }
  });

  test('Tutorial reperiti dal server', function() {
    expect(1);
    equal(this.tutorialView.collection.length, 3);

  });

  test('Tutorial visualizzati sulla pagina', function() {
    expect(1);
    
    $(this.tutorialView.el).find('a#tutorial').click();
    
    equal(this.tutorialView.$("iframe").length, 1);

  });

  test('Sono presenti i bottoni Precedente e Successivo', function() {
    expect(2);
    
    $(this.tutorialView.el).find('a#tutorial').click();
    $(this.tutorialView.el).find('#next').click();
    
    equal(this.tutorialView.$("#prev").length, 1);
    equal(this.tutorialView.$("#next").length, 1);

  });
  
});
