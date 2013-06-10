//Wait for relevant code bits to load before starting any tests
define(['../js/view/UserDataView'], function( UserDataView ) {

  module( 'About Backbone.View', {
      setup: function() {
				model= new Backbone.Model();
				model.set({username: 'clockwork', name: 'clockwork', surname: 'clockwork' });
        this.userDataView = new UserDataView({model: model});

      },
      teardown: function() {
        this.userDataView.remove();
      }
  });

 test('Should be tied to a DOM element when created, based off the property provided.', function() {
   expect( 1 );

   equal( this.userDataView.el.id.toLowerCase(), 'main', 'Tied to #main.' );
  });
 

  test('The template is render correctly.', function() {
    expect( 3 );

    // Check the number of items rendered
    equal($('#main').find('button').length, 3, 'Three buttons rendered.');
    equal($('#main').find('ul').length, 1, 'One list rendered.');
    equal($('#main').find('input').length, 5, 'Five input rendered.');

  }); 


  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

    this.checkPasswordSpy = sinon.spy();
    this.sendStub = sinon.stub(this.userDataView, 'checkPassword', this.checkPasswordSpy );
    this.userDataView.delegateEvents();
    // Trigger the event
     $('button#submitChange').click();
    // Check the done status for the model is true
    ok( this.checkPasswordSpy.called );
    
    this.sendStub.restore();
  });
  
  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

    this.renderSpy = sinon.spy();
    this.sendStub = sinon.stub(this.userDataView, 'render', this.renderSpy );
    this.userDataView.delegateEvents();
    // Trigger the event
     $('button#reset').click();
    // Check the done status for the model is true
    ok( this.renderSpy.called );
    
    this.sendStub.restore();
  });
  
    test('Can wire up send method to DOM element.', function() {
    expect( 1 );

    this.unrenderSpy = sinon.spy();
    this.sendStub = sinon.stub(this.userDataView, 'unrender', this.unrenderSpy );
    this.userDataView.delegateEvents();
    // Trigger the event
     $('button#denyChange').click();
    // Check the done status for the model is true
    ok( this.unrenderSpy.called );
    
    this.sendStub.restore();
  });
});
