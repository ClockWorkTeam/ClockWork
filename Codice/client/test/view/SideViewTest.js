//Wait for relevant code bits to load before starting any tests
define(['../js/view/SideView'], function( SideView ) {

  module( 'About Backbone.View', {
      setup: function() {
        this.sideView = new SideView({caller: 'clockwork'});
      },
      teardown: function() {
        this.sideView.remove();
      }
  });

 test('Should be tied to a DOM element when created, based off the property provided.', function() {
   expect( 1 );

   equal( this.sideView.el.id.toLowerCase(), 'sidebar', 'Tied to #sidebar.' );
  });
 
  test('The template is render correctly when the user is not logged.', function() {
    expect( 2 );

    // Check the number of items rendered
    equal(this.sideView.$el.find('button').length, 1, 'One button rendered.');
    equal(this.sideView.$el.find('ul').length, 0, 'Zero lists rendered.');

  }); 
   
  test('The template is render correctly when the user is logged.', function() {
    expect( 2 );

		$(this.sideView.el).html(this.sideView.template({logged: true}));

    // Check the number of items rendered
    equal(this.sideView.$el.find('button').length, 2, 'Two buttons rendered.');
    equal(this.sideView.$el.find('ul').length, 1, 'One list rendered.');

  }); 
  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

    this.callIPSpy = sinon.spy();
    this.sendStub = sinon.stub(this.sideView, 'callIP', this.callIPSpy );
    this.sideView.delegateEvents();
    // Trigger the event
     this.sideView.$el.find('button#callIP').click();
    // Check the done status for the model is true
    ok( this.callIPSpy.called );
    
    this.sendStub.restore();
  });

  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

		$(this.sideView.el).html(this.sideView.template({logged: true}));
    this.StartConferenceSpy = sinon.spy();
    this.sendStub = sinon.stub(this.sideView, 'StartConference', this.StartConferenceSpy );
    this.sideView.delegateEvents();
    // Trigger the event
     this.sideView.$el.find('button#conference').click();
    // Check the done status for the model is true
    ok( this.StartConferenceSpy.called );
    
    this.sendStub.restore();
  });
});
