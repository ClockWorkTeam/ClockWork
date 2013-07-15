//Wait for relevant code bits to load before starting any tests
define(['../js/collection/RecordMessagesCollection','../js/model/RecordMessageModel'], function( RecordMessagesCollection, RecordMessageModel) {

module('Test Collection', {
	setup: function() {	
        this.recordMessagesCollection = RecordMessagesCollection;
        this.recordMessageModelOne=new RecordMessageModel();
        this.recordMessageModelTwo=new RecordMessageModel({contact:'johndoe', record:'', date:'2013-01-01'});
        this.recordMessagesCollection.add(this.recordMessageModelOne);
        this.recordMessagesCollection.add(this.recordMessageModelTwo);
    },
    teardown: function() {
        this.recordMessagesCollection.remove(this.recordMessageModelOne);
        this.recordMessagesCollection.remove(this.recordMessageModelTwo);
        window.errors = null;
    }
});

test('Has the RecordMessageModel model.', function() {
    expect( 4 );
	 
    ok(this.recordMessagesCollection.at(0).has('contact'), 'Has contact');
    ok(this.recordMessagesCollection.at(0).has('record'), 'Has record');
    ok(this.recordMessagesCollection.at(0).has('date'), 'Has date');
    ok(this.recordMessagesCollection.at(0).has('OtherAttributes') == false, 'Collection doesn\'t have other attributes');
  
});

test('Checking removal of models.', function() {
    expect( 1 );
   
    this.recordMessagesCollection.remove(this.recordMessageModelOne);
    this.recordMessagesCollection.remove(this.recordMessageModelTwo);
   
    equal(this.recordMessagesCollection.length,0);
	
});

test('Checking addiction of models.', function() {
    expect( 1 );
    
    this.recordMessagesCollection.remove(this.recordMessageModelOne);
    this.recordMessagesCollection.remove(this.recordMessageModelTwo);
    this.recordMessagesCollection.add(this.recordMessageModelOne);
    this.recordMessagesCollection.add(this.recordMessageModelTwo);
   
    equal(this.recordMessagesCollection.length,2);
	
});

test('Checking record method.', function() {
    expect( 3 );
   
    equal(this.recordMessagesCollection.record()[0],this.recordMessageModelOne);
    equal(this.recordMessagesCollection.record()[1],this.recordMessageModelTwo);
    equal(this.recordMessagesCollection.record().length,2);
	
});

test('Fires events when the models change.', function() {
    expect(4);

    var addModelCallback = this.spy();
    var removeModelCallback = this.spy();

    this.recordMessagesCollection.bind('add', addModelCallback);
    this.recordMessagesCollection.bind('remove', removeModelCallback);

    this.recordMessageModelThree=new RecordMessageModel({contact:'janedoe', record:'', date:'2013-02-01'});

    this.recordMessagesCollection.add(this.recordMessageModelThree);

    ok(addModelCallback.called, 'addModelCallback called');
    ok(removeModelCallback.notCalled, 'removeModelCallback not called');

    this.recordMessagesCollection.remove(this.recordMessageModelThree);

    ok(removeModelCallback.called, 'removeModelCallback called');
    ok(addModelCallback.calledOnce, 'addModelCallback not called again');

});

});
