//Wait for relevant code bits to load before starting any tests
define(['../../js/model/TextMessageModel'], function( TextMessageModel ) {

  module( 'About Backbone.Model');

  test('Can be created with default values for its attributes.', function() {
      expect( 3 );

      var textMessageModel = new TextMessageModel();
      equal( textMessageModel.get('contact'), '' );
      equal( textMessageModel.get('message'), '' );
      equal( textMessageModel.get('source'), '' );  // può essere sent o received o notsent

  });

  test('Will set attributes on the model instance when created.', function() {
      expect( 3 );

      var textMessageModel = new TextMessageModel( { contact: 'johndoe', message: 'hello', source: 'received' } );
      equal( textMessageModel.get('contact'), 'johndoe' );
      equal( textMessageModel.get('message'), 'hello' );
      equal( textMessageModel.get('source'), 'received' );

  });

  test('Fires a custom event when the state changes.', function() {
      expect( 1 );

      var spy = this.spy();
      var textMessageModel = new TextMessageModel( { contact: 'johndoe', message: 'hello', source: 'received' } );

      textMessageModel.on( 'change', spy );
      // Change the model state
      textMessageModel.set( { source: 'notsent' } );

      ok( spy.calledOnce, 'A change event callback was correctly triggered' );
  });

  test('The model is clear correctly.', function() {
      expect( 3 );

      var errorCallback = this.spy();
      var textMessageModel = new TextMessageModel( { contact: 'johndoe', message: 'hello', source: 'received' } );
      
      // Clear the model
      textMessageModel.clear();

      equal( textMessageModel.get('contact'), undefined );
      equal( textMessageModel.get('message'), undefined );
      equal( textMessageModel.get('source'), undefined );

  });

});
