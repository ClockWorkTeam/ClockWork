//Wait for relevant code bits to load before starting any tests
define(['../js/view/FunctionsView'], function( FunctionsView ) {

  module( 'About Backbone.View', {
      setup: function() {
        this.functionsView = new FunctionsView({model: new Backbone.Model()});
      },
      teardown: function() {
        this.functionsView.remove();
      }
  });

 test('Should be tied to a DOM element when created, based off the property provided.', function() {
   expect( 1 );

   equal( this.functionsView.el.id.toLowerCase(), 'content', 'Tied to #content.' );
  });
 
 test('The template is render correctly when called from callIP.', function() {
    expect( 4 );
		
		$(this.functionsView.el).html(this.functionsView.template({ From :'IP' }));
    // Check the number of items rendered
    equal($('#content').find('input').length, 2, 'Two input rendered.');
    equal($('#content').find('input')[0].type, 'text', 'One input text rendered.');
		equal($('#content').find('input')[1].type, 'checkbox', 'One input checkbox rendered.');
    equal($('#content').find('button').length, 3, '3 button rendered.');
  }); 
   
 test('The template is render correctly when called from conference.', function() {
    expect( 1 );
		
		$(this.functionsView.el).html(this.functionsView.template({ From :'Conf' }));
    // Check the number of items rendered
    equal($('#content').find('ul').length, 1, 'One list rendered.');
  });
  
 test('The template is render correctly when the contact is online.', function() {
    expect( 4 );
		
		$(this.functionsView.el).html(this.functionsView.template({ username:'clockwork', IP:'1' }));
    // Check the number of items rendered
    notStrictEqual($('#content').innerHTML, '(Online)', 'The online string is displayed.');
    equal($('#content').find('button').length, 4, 'Four buttons rendered.');
    equal($('#content').find('input').length, 1, 'One input rendered.');
		equal($('#content').find('input')[0].type, 'checkbox', 'One input checkbox rendered.');
  });
  
 test('The template is render correctly when the contact is offline.', function() {
    expect( 3 );
		
		$(this.functionsView.el).html(this.functionsView.template({ username:'clockwork', IP:'0' }));
    // Check the number of items rendered
    notStrictEqual($('#content').innerHTML, '(Offline)', 'The offline string is displayed.');
    equal($('#content').find('button').length, 2, 'Two buttons rendered.');
    equal($('#content').find('input').length, 0, 'Zero input rendered.');
  });
  
  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

		$(this.functionsView.el).html(this.functionsView.template({ username:'clockwork', IP:'1' }));
    this.viewDataContactSpy = sinon.spy();
    this.sendStub = sinon.stub(this.functionsView, 'viewDataContact', this.viewDataContactSpy );
    this.functionsView.delegateEvents();
    // Trigger the event
     $('button#dataContact').click();
    // Check the done status for the model is true
    ok( this.viewDataContactSpy.called );
    
    this.sendStub.restore();
  });

  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

		$(this.functionsView.el).html(this.functionsView.template({ username:'clockwork', IP:'1' }));
    this.sendVideoTextSpy = sinon.spy();
    this.sendStub = sinon.stub(this.functionsView, 'sendVideoText', this.sendVideoTextSpy );
    this.functionsView.delegateEvents();
    // Trigger the event
     $('button#sendVideoText').click();
    // Check the done status for the model is true
    ok( this.sendVideoTextSpy.called );
    
    this.sendStub.restore();
  });
  
  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

		$(this.functionsView.el).html(this.functionsView.template({ username:'clockwork', IP:'1' }));
    this.audiocallSpy = sinon.spy();
    this.sendStub = sinon.stub(this.functionsView, 'audiocall', this.audiocallSpy );
    this.functionsView.delegateEvents();
    // Trigger the event
     $('button#call').click();
    // Check the done status for the model is true
    ok( this.audiocallSpy.called );
    
    this.sendStub.restore();
  }); 
   
  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

		$(this.functionsView.el).html(this.functionsView.template({ username:'clockwork', IP:'1' }));
    this.videocallSpy = sinon.spy();
    this.sendStub = sinon.stub(this.functionsView, 'videocall', this.videocallSpy );
    this.functionsView.delegateEvents();
    // Trigger the event
     $('button#video').click();
    // Check the done status for the model is true
    ok( this.videocallSpy.called );
    
    this.sendStub.restore();
  });
  
  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

		$(this.functionsView.el).html(this.functionsView.template({ username:'clockwork', IP:'1' }));
    this.recordSpy = sinon.spy();
    this.sendStub = sinon.stub(this.functionsView, 'record', this.recordSpy );
    this.functionsView.delegateEvents();
    // Trigger the event
     $('input#record').click();
    // Check the done status for the model is true
    ok( this.recordSpy.called );
    
    this.sendStub.restore();
  });
  
});
