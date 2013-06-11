//Wait for relevant code bits to load before starting any tests
define(['../js/view/NotificationView'], function( NotificationView ) {

  module( 'About Backbone.View', {
      setup: function() {
        this.notificationView = new NotificationView({caller: 'clockwork'});
      },
      teardown: function() {
        this.notificationView.remove();
      }
  });

 test('Should be tied to a DOM element when created, based off the property provided.', function() {
   expect( 1 );
   
   equal( this.notificationView.el.id.toLowerCase(), 'main', 'Tied to #main.' );
  });
 
 test('The template is render correctly.', function() {
    expect( 3 );

    // Check the number of items rendered
    equal(this.notificationView.$el.find('button').length, 2, 'Two buttons rendered.');
    equal(this.notificationView.$el.find('button')[0].id, 'acceptCall', 'One of the buttons is acceptCall.');
		equal(this.notificationView.$el.find('button')[1].id, 'refuseCall', 'One of the buttons is refuseCall.');

  }); 
   
  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

    this.acceptSpy = sinon.spy();
    this.sendStub = sinon.stub(this.notificationView, 'acceptCall', this.acceptSpy );
    this.notificationView.delegateEvents();
    // Trigger the event
     this.notificationView.$el.find('button#acceptCall').click();
    // Check the done status for the model is true
    ok( this.acceptSpy.called );
    
    this.sendStub.restore();
  });

  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

    this.refuseSpy = sinon.spy();
    this.sendStub = sinon.stub(this.notificationView, 'refuseCall', this.refuseSpy );
    this.notificationView.delegateEvents();
    // Trigger the event
     this.notificationView.$el.find('button#refuseCall').click();
    // Check the done status for the model is true
    ok( this.refuseSpy.called );
    
    this.sendStub.restore();
  });
});
