//Wait for relevant code bits to load before starting any tests
define(['../js/view/CallView'], function( CallView ) {

  module( 'About Backbone.View', {
      setup: function() {
        this.callView = new CallView();
      },
      teardown: function() {
        this.callView.remove();
      }
  });

  test('Should be tied to a DOM element when created, based off the property provided.', function() {
    expect( 1 );
    equal( this.callView.el.id.toLowerCase(), 'content', 'Tied to #content.' );
  });
 
  test('The template is render correctly.', function() {
    expect( 2 );
		
		$(this.callView.el).html(this.callView.template({ username: 'clockwork' }));
    // Check the number of items rendered
    equal(this.callView.$el.find('video').length, 1, 'Video frame rendered.');
    equal(this.callView.$el.find('button').length, 1, 'One button rendered.');
  });

  test('Can wire up endCall method to DOM element.', function() {
    expect( 1 );

		$(this.callView.el).html(this.callView.template({ username: 'clockwork' }));
    this.endCallSpy = sinon.spy();
    this.sendStub = sinon.stub(this.callView, 'endCall', this.endCallSpy );
    this.callView.delegateEvents();
    // Trigger the event
     this.callView.$el.find('button#endCall').click();
    // Check the done status for the model is true
    ok( this.endCallSpy.called );
    
    this.sendStub.restore();
  });

});
