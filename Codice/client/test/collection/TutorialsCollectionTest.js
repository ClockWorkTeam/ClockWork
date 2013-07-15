//Wait for relevant code bits to load before starting any tests
define(['../js/collection/TutorialsCollection','../js/model/TutorialModel'], function( TutorialsCollection, TutorialModel) {

module('Test Collection', {
	setup: function() {	
        this.tutorialsCollection = TutorialsCollection;
        this.tutorialModelOne=new TutorialModel();
        this.tutorialModelTwo=new TutorialModel({title: 'Introduzione', url: 'video.avi'});
        this.tutorialsCollection.add(this.tutorialModelOne);
        this.tutorialsCollection.add(this.tutorialModelTwo);
    },
    teardown: function() {
        this.tutorialsCollection.remove(this.tutorialModelOne);
        this.tutorialsCollection.remove(this.tutorialModelTwo);
        window.errors = null;
    }
});

test('Has the TutorialModel model', function() {
	expect( 3 );
	
  ok(this.tutorialsCollection.at(0).has('title'), 'Has title');
  ok(this.tutorialsCollection.at(0).has('url'), 'Has url');
  ok(this.tutorialsCollection.at(0).has('OtherAttributes') == false, 'Collection doesn\'t have other attributes');
  
});

test('control of remove method', function() {
	expect( 1 );
   
	this.tutorialsCollection.remove(this.tutorialModelOne);
	this.tutorialsCollection.remove(this.tutorialModelTwo);
   
	equal(this.tutorialsCollection.length,0);
	
});

test('control of add method', function() {
	expect( 1 );
	
	this.tutorialsCollection.remove(this.tutorialModelOne);
	this.tutorialsCollection.remove(this.tutorialModelTwo);
	this.tutorialsCollection.add(this.tutorialModelOne);
	this.tutorialsCollection.add(this.tutorialModelTwo);
   
	equal(this.tutorialsCollection.length,2);
	
});

test('Fires events when the models change.', function() {
    expect(4);

    var addModelCallback = this.spy();
    var removeModelCallback = this.spy();

    this.tutorialsCollection.bind('add', addModelCallback);
    this.tutorialsCollection.bind('remove', removeModelCallback);

    this.tutorialModelThree=new TutorialModel({title: 'Chiamata', url:'video2.avi' });

    this.tutorialsCollection.add(this.tutorialModelThree);

    ok(addModelCallback.called, 'addModelCallback called');
    ok(removeModelCallback.notCalled, 'removeModelCallback not called');

    this.tutorialsCollection.remove(this.tutorialModelThree);

    ok(removeModelCallback.called, 'removeModelCallback called');
    ok(addModelCallback.calledOnce, 'addModelCallback not called again');

});

});
