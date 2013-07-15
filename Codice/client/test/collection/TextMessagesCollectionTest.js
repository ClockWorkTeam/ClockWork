//Wait for relevant code bits to load before starting any tests
define(['../js/collection/TextMessagesCollection','../js/model/TextMessageModel'], function( TextMessagesCollection, TextMessageModel) {




module('Test Collection', {
	setup: function() {	
        this.textMessagesCollection = TextMessagesCollection;
        this.textMessageModelOne=new TextMessageModel();
        this.textMessageModelTwo=new TextMessageModel({contact: 'pippo', message: 'ciao', source: 'sent'});
        this.textMessagesCollection.add(this.textMessageModelOne);
        this.textMessagesCollection.add(this.textMessageModelTwo);
    },
    teardown: function() {
        this.textMessagesCollection.remove(this.textMessageModelOne);
        this.textMessagesCollection.remove(this.textMessageModelTwo);
        window.errors = null;
    }
});

test('Has the TextMessageModel model', function() {
	expect( 4 );
	
  ok(this.textMessagesCollection.at(0).has('contact'), 'Has contact');
  ok(this.textMessagesCollection.at(0).has('message'), 'Has message');
  ok(this.textMessagesCollection.at(0).has('source'), 'Has source');
  ok(this.textMessagesCollection.at(0).has('OtherAttributes') == false, 'Collection doesn\'t have other attributes');
  
});

test('Checking removal of models.', function() {
	expect( 1 );
   
	this.textMessagesCollection.remove(this.textMessageModelOne);
	this.textMessagesCollection.remove(this.textMessageModelTwo);
   
	equal(this.textMessagesCollection.length,0);
	
});

test('Checking addiction of models.', function() {
	expect( 1 );
	
	this.textMessagesCollection.remove(this.textMessageModelOne);
	this.textMessagesCollection.remove(this.textMessageModelTwo);
	this.textMessagesCollection.add(this.textMessageModelOne);
	this.textMessagesCollection.add(this.textMessageModelTwo);
   
	equal(this.textMessagesCollection.length,2);
	
});


test('Checking chat_session method.', function() {
	expect( 2 );
	
	equal(this.textMessagesCollection.chat_session('pippo')[0],this.textMessageModelTwo);
	equal(this.textMessagesCollection.chat_session('pippo').length,1);
	
});

test('Fires events when the models change.', function() {
    expect(4);

    var addModelCallback = this.spy();
    var removeModelCallback = this.spy();

    this.textMessagesCollection.bind('add', addModelCallback);
    this.textMessagesCollection.bind('remove', removeModelCallback);

    this.textMessageModelThree=new TextMessageModel({contact: 'johndoe', message: 'ciao', source: 'sent'});

    this.textMessagesCollection.add(this.textMessageModelThree);

    ok(addModelCallback.called, 'addModelCallback called');
    ok(removeModelCallback.notCalled, 'removeModelCallback not called');

    this.textMessagesCollection.remove(this.textMessageModelThree);

    ok(removeModelCallback.called, 'removeModelCallback called');
    ok(addModelCallback.calledOnce, 'addModelCallback not called again');

});

});
