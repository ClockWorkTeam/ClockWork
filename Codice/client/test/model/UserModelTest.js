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

});
