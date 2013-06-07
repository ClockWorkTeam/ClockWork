//Wait for relevant code bits to load before starting any tests
define(['../js/view/ChatView'], function( ChatView ) {

  module( 'About Backbone.View', {
      setup: function() {
        this.chatView = new ChatView();
      },
      teardown: function() {
        this.chatView.remove();
      }
  });

  test('Should be tied to a DOM element when created, based off the property provided.', function() {
    expect( 1 );
    equal( this.chatView.el.id.toLowerCase(), 'chat', 'Tied to #chat.' );
  });
 
  test('The template is render correctly when the contact is offline.', function() {
    expect( 3 );
		
		$(this.chatView.el).html(this.chatView.template({ ip: '0' }));
    // Check the number of items rendered
    equal($('#chat').find('ul').length, 1, 'One list rendered.');
    equal($('#chat').find('textarea').length, 0, 'Zero textarea rendered.');
    equal($('#chat').find('button').length, 0, 'Zero button rendered.');
  });
  
  test('The template is render correctly when the contact is online.', function() {
    expect( 3 );
		
		$(this.chatView.el).html(this.chatView.template({ ip: '1' }));
    // Check the number of items rendered
    equal($('#chat').find('ul').length, 1, 'One list rendered.');
    equal($('#chat').find('textarea').length, 1, 'One textarea rendered.');
    equal($('#chat').find('button').length, 1, 'One button rendered.');
  });

  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

		$(this.chatView.el).html(this.chatView.template({ ip: '1' }));
    this.connectSpy = sinon.spy();
    this.sendStub = sinon.stub(this.chatView, 'send', this.connectSpy );
    this.chatView.delegateEvents();
    // Trigger the event
     $('button#Send').click();
    // Check the done status for the model is true
    ok( this.connectSpy.called );
    
    this.sendStub.restore();
  });

});
