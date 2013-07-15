//Wait for relevant code bits to load before starting any tests
define(['../../js/model/TutorialModel'], function( TutorialModel ) {

  module( 'About Backbone.Model');

  test('Can be created with default values for its attributes.', function() {
      expect( 2 );

      var tutorialModel = new TutorialModel();
      equal( tutorialModel.get('title'), '' );
      equal( tutorialModel.get('url'), '' );

  });

  test('Will set attributes on the model instance when created.', function() {
      expect( 2 );

      var tutorialModel = new TutorialModel( {title:'Introduzione', url:'video.avi'} );
      equal( tutorialModel.get('title'), 'Introduzione' );
      equal( tutorialModel.get('url'), 'video.avi' );

  });

  test('Fires a custom event when the state changes.', function() {
      expect( 1 );

      var spy = this.spy();
      var tutorialModel = new TutorialModel( {title:'Introduzione', url:'video.avi'} );

      tutorialModel.on( 'change', spy );
      // Change the model state
      tutorialModel.set( { url:'video2.avi' } );

      ok( spy.calledOnce, 'A change event callback was correctly triggered' );
  });

  test('The model is clear correctly.', function() {
      expect( 2 );

      var errorCallback = this.spy();
      var tutorialModel = new TutorialModel( {title:'Introduzione', url:'video.avi'} );

      // Clear the model
      tutorialModel.clear();

      equal( tutorialModel.get('title'), undefined );
      equal( tutorialModel.get('url'), undefined );

  });

});
