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

/*
  test('Will call a custom initialize function on the model instance when created.', function() {
      expect( 1 );

      var toot = new Todo({ text: 'Stop monkeys from throwing their own crap!' });
      equal( toot.get('text'), 'Stop monkeys from throwing their own rainbows!' );
  });

  test('Fires a custom event when the state changes.', function() {
      expect( 1 );

      var spy = this.spy();
      var todo = new Todo();

      todo.on( 'change', spy );
      // Change the model state
      todo.set( { text: 'new text' } );

      ok( spy.calledOnce, 'A change event callback was correctly triggered' );
  });


  test('Can contain custom validation rules, and will trigger an invalid event on failed validation.', function() {
      expect( 3 );

      var errorCallback = this.spy();
      var todo = new Todo();

      todo.on('invalid', errorCallback);
      // Change the model state in such a way that validation will fail
      todo.set( { done: 'not a boolean' } );

      ok( errorCallback.called, 'A failed validation correctly triggered an error' );
      notEqual( errorCallback.getCall(0), undefined );
      equal( errorCallback.getCall(0).args[1], 'Todo.done must be a boolean value.' );

  });
**/

});
