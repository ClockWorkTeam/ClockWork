define(['../js/view/TutorialView'], function( TutorialView ) {

  module( 'About tutorial', {
      setup: function() {
        this.tutorialView = new TutorialView();
      },
      teardown: function() {

      }
  });

  test('Tutorial reperiti dal server', function() {
    expect(1);
    ok(this.tutorialView.collection.length != 0);

  });

  test('Tutorial visualizzati sulla pagina', function() {
    expect(1);
    
    $(this.tutorialView.el).find('a#tutorial').click();
    
    ok(this.tutorialView.$("iframe").length == 1);

  });

  test('Sono presenti i bottoni Precedente e Successivo', function() {
    expect(2);
    
    $(this.tutorialView.el).find('a#tutorial').click();
    $(this.tutorialView.el).find('#next').click();
    
    ok(this.tutorialView.$("#prev").length == 1);
    ok(this.tutorialView.$("#next").length == 1);

  });
  
});
