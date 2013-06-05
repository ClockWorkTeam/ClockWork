//Wait for relevant code bits to load before starting any tests
define(['../js/collection/TutorialsCollection','../js/model/TutorialModel'], function( TutorialsCollection, TutorialModel) {




module('Test Collection', {
	setup: function() {	
        this.tutorialsCollection = TutorialsCollection;
        this.tutorialModelOne=new TutorialModel();
        this.tutorialModelTwo=new TutorialModel({title: 'Introduzione', description: 'utile', url: 'video.avi'});
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
	expect( 1 );
	
	ok(this.tutorialsCollection.model);
  
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

/*
test('returns an array of TutorialModel that has username', function() {
    expect( 3 );
   
    equal(this.tutorialsCollection.record()[0],this.tutorialModelOne);
    equal(this.tutorialsCollection.record()[1],this.tutorialModelTwo);
    equal(this.tutorialsCollection.record().length,2);
	
});
*/






});
