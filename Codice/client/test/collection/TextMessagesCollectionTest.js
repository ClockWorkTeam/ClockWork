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
	expect( 1 );
	
	ok(this.textMessagesCollection.model);
  
});

test('control of remove method', function() {
	expect( 1 );
   
	this.textMessagesCollection.remove(this.textMessageModelOne);
	this.textMessagesCollection.remove(this.textMessageModelTwo);
   
	equal(this.textMessagesCollection.length,0);
	
});

test('control of add method', function() {
	expect( 1 );
	
	this.textMessagesCollection.remove(this.textMessageModelOne);
	this.textMessagesCollection.remove(this.textMessageModelTwo);
	this.textMessagesCollection.add(this.textMessageModelOne);
	this.textMessagesCollection.add(this.textMessageModelTwo);
   
	equal(this.textMessagesCollection.length,2);
	
});


test('returns an array of TextMessageModel that has username', function() {
	expect( 2 );
	
	equal(this.textMessagesCollection.chat_session('pippo')[0],this.textMessageModelTwo);
	equal(this.textMessagesCollection.chat_session('pippo').length,1);
	
});







});
