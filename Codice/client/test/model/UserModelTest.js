//Wait for relevant code bits to load before starting any tests
define(['../../js/model/UserModel'], function( UserModel ) {

  module( 'About Backbone.Model');

  test('Can be created with default values for its attributes.', function() {
      expect( 4 );

      var userModel = new UserModel();
      equal( userModel.get('username'), '' , "default username");
      equal( userModel.get('password'), '', "default password" );
      equal( userModel.get('name'), '', "default name" );
      equal( userModel.get('surname'), '', "default surname" );

  });

  test('Will set attributes on the model instance when created.', function() {
      expect( 4 );

      var userModel = new UserModel( { username: 'johndoe', password: '123', name: 'john', surname: 'doe' } );
      equal( userModel.get('username'), 'johndoe', "inserting username" );
      equal( userModel.get('password'), '123', "inserting password" );
      equal( userModel.get('name'), 'john', "inserting name" );
      equal( userModel.get('surname'), 'doe', "inserting surname" );

  });
  test('Fires a custom event when the state changes.', function() {
      expect( 1 );

      var spy = this.spy();
      var userModel = new UserModel( { username: 'johndoe', password: '123', name: 'john', surname: 'doe' } );

      userModel.on( 'change', spy );
      // Change the model state
      userModel.set( { password: '456' } );

      ok( spy.calledOnce, 'A change event callback was correctly triggered' );
  });

  test('After calling function clear the model is empty.', function() {
      expect( 4 );

      var errorCallback = this.spy();
      var userModel = new UserModel( {username: 'johndoe', password: '123', name: 'john', surname: 'doe' } );

      // Clear the model
      userModel.clear();

      equal( userModel.get('username'), undefined );
      equal( userModel.get('password'), undefined );
      equal( userModel.get('name'), undefined );
      equal( userModel.get('surname'), undefined );
  });

});
