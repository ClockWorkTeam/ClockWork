//Wait for relevant code bits to load before starting any tests
define(['../../js/model/ContactModel'], function( ContactModel ) {

  module( 'About Backbone.Model');

  test('Can be created with default values for its attributes.', function() {
      expect( 5 );

      var contactModel = new ContactModel();
      equal( contactModel.get('username'), '' );
      equal( contactModel.get('name'), '' );
      equal( contactModel.get('surname'), '' );
      equal( contactModel.get('IP'), '0.0.0.0' );
      equal( contactModel.get('unread'), 0 );

  });

  test('Will set attributes on the model instance when created.', function() {
      expect( 5 );

      var contactModel = new ContactModel( { username: 'johndoe', name: 'john', surname: 'doe', IP: '1.2.3.4', unread: 0 } );
      equal( contactModel.get('username'), 'johndoe' );
      equal( contactModel.get('name'), 'john' );
      equal( contactModel.get('surname'), 'doe' );
      equal( contactModel.get('IP'), '1.2.3.4' );
      equal( contactModel.get('unread'), 0 );

  });

  test('Fires a custom event when the state changes.', function() {
      expect( 1 );

      var spy = this.spy();
      var contactModel = new ContactModel( { username: 'johndoe', name: 'john', surname: 'doe', IP: '1.2.3.4', unread: 0 } );

      contactModel.on( 'change', spy );
      // Change the model state
      contactModel.set( { IP: '0.0.0.0' } );

      ok( spy.calledOnce, 'A change event callback was correctly triggered' );
  });

  test('The model is clear correctly.', function() {
      expect( 5 );

      var errorCallback = this.spy();
      var contactModel = new ContactModel( { username: 'johndoe', name: 'john', surname: 'doe', IP: '1.2.3.4', unread: 0 } );

      // Clear the model
      contactModel.clear();

      equal( contactModel.get('username'), undefined );
      equal( contactModel.get('name'), undefined );
      equal( contactModel.get('surname'), undefined );
      equal( contactModel.get('IP'), undefined );
      equal( contactModel.get('unread'), undefined );

  });

});
