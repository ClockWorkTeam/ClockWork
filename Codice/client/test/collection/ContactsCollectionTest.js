//Wait for relevant code bits to load before starting any tests
define(['../js/collection/ContactsCollection','../js/model/ContactModel'], function( ContactsCollection, ContactModel) {

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

test('Has the ContactModel model.', function() {
    expect( 6 );
	 
    ok(this.contactsCollection.at(0).has('username'), 'Has username');
    ok(this.contactsCollection.at(0).has('name'), 'Has name');
    ok(this.contactsCollection.at(0).has('surname'), 'Has surname');
    ok(this.contactsCollection.at(0).has('IP'), 'Has IP');
    ok(this.contactsCollection.at(0).has('unread'), 'Has unread');
    ok(this.contactsCollection.at(0).has('OtherAttributes') == false, 'Collection doesn\'t have other attributes');
  
});

test('Checking removal of models.', function() {
    expect( 1 );
   
    this.contactsCollection.remove(this.contactModelOne);
    this.contactsCollection.remove(this.contactModelTwo);
   
    equal(this.contactsCollection.length,0);
	
});

test('Checking addiction of models.', function() {
    expect( 1 );
    
    this.contactsCollection.remove(this.contactModelOne);
    this.contactsCollection.remove(this.contactModelTwo);
    this.contactsCollection.add(this.contactModelOne);
    this.contactsCollection.add(this.contactModelTwo);
   
    equal(this.contactsCollection.length,2);
	
});

test('Checking record method.', function() {
    expect( 3 );
   
    equal(this.contactsCollection.record()[0],this.contactModelOne);
    equal(this.contactsCollection.record()[1],this.contactModelTwo);
    equal(this.contactsCollection.record().length,2);
	
});

test('Fires events when the models change.', function() {
    expect(4);

    var addModelCallback = this.spy();
    var removeModelCallback = this.spy();

    this.contactsCollection.bind('add', addModelCallback);
    this.contactsCollection.bind('remove', removeModelCallback);

    this.contactModelThree=new ContactModel({username:'janedoe', name:'jane', surname:'doe', IP:'4.3.2.1', unread:0});

    this.contactsCollection.add(this.contactModelThree);

    ok(addModelCallback.called, 'addModelCallback called');
    ok(removeModelCallback.notCalled, 'removeModelCallback not called');

    this.contactsCollection.remove(this.contactModelThree);

    ok(removeModelCallback.called, 'removeModelCallback called');
    ok(addModelCallback.calledOnce, 'addModelCallback not called again');

});

});
