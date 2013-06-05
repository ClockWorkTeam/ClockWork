//Wait for relevant code bits to load before starting any tests
define(['../js/collection/ContactsCollection','../js/model/ContactModel'], function( ContactsCollection, ContactModel) {

/*module( 'About Backbone.Collection');
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
*/



module('Test Collection', {
	setup: function() {	
        this.contactsCollection = ContactsCollection;
        this.contactModelOne=new ContactModel();
        this.contactModelTwo=new ContactModel({username:'johndoe', name:'john', surname:'doe', IP:'1.2.3.4', unread:0});
        this.contactsCollection.add(this.contactModelOne);
        this.contactsCollection.add(this.contactModelTwo);
    },
    teardown: function() {
        this.contactsCollection.remove(this.contactModelOne);
        this.contactsCollection.remove(this.contactModelTwo);
        window.errors = null;
    }
});

test('Has the ContactModel model', function() {
	expect( 1 );
	
	ok(this.contactsCollection.model);
  
});

test('returns an array of ContactModel that has username', function() {
  expect( 2 );
   
	equal(this.contactsCollection.record()[0],this.contactModelOne);
  equal(this.contactsCollection.record()[1],this.contactModelTwo);
	
	
    //ok(this.contactsCollection.model);
});



/*

    describe('done', function() {
      return it('returns an array of the todos that are done', function() {
        this.todoTwo.done = true;
        return expect(this.todos.done()).toEqual([this.todoTwo]);
      });
    });

    describe('remaining', function() {
      return it('returns an array of the todos that are not done', function() {
        this.todoTwo.done = true;
        return expect(this.todos.remaining()).toEqual([this.todoOne]);
      });
    });

    describe('clear', function() {
      return it('destroys the current todo from local storage', function() {
        expect(this.todos.models).toEqual([this.todoOne, this.todoTwo]);
        this.todos.clear(this.todoOne);
        return expect(this.todos.models).toEqual([this.todoTwo]);
      });
    });

    return describe('Order sets the order on todos ascending numerically', function() {
      it('defaults to one when there arent any items in the collection', function() {
        this.emptyTodos = new TodoApp.Collections.TodoList;
        return expect(this.emptyTodos.order()).toEqual(0);
      });

      return it('Increments the order by one each time', function() {
        expect(this.todos.order(this.todoOne)).toEqual(1);
        return expect(this.todos.order(this.todoTwo)).toEqual(2);
      });
    });
*/





});
