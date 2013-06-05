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

test('Has the ContactModel model', function() {
    expect( 1 );
	
    ok(this.contactsCollection.model);
  
});

test('control of remove method', function() {
    expect( 1 );
   
    this.contactsCollection.remove(this.contactModelOne);
    this.contactsCollection.remove(this.contactModelTwo);
   
    equal(this.contactsCollection.length,0);
	
});

test('control of add method', function() {
    expect( 1 );
    
    this.contactsCollection.remove(this.contactModelOne);
    this.contactsCollection.remove(this.contactModelTwo);
    this.contactsCollection.add(this.contactModelOne);
    this.contactsCollection.add(this.contactModelTwo);
   
    equal(this.contactsCollection.length,2);
	
});

test('returns an array of ContactModel that has username', function() {
    expect( 3 );
   
    equal(this.contactsCollection.record()[0],this.contactModelOne);
    equal(this.contactsCollection.record()[1],this.contactModelTwo);
    equal(this.contactsCollection.record().length,2);
	
});


});
