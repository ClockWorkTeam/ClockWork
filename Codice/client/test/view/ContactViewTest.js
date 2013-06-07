//Wait for relevant code bits to load before starting any tests
define(['../js/view/ContactView'], function( ContactView ) {

  module( 'About Backbone.View', {
      setup: function() {
        this.contactView = new ContactView({model: new Backbone.Model(), dom:'sidebar'});
     		
      },
      teardown: function() {
        this.contactView.remove();
      }
  });

  test('Should be tied to a DOM element when created, based off the property provided.', function() {
    expect( 1 );
    equal( this.contactView.el.tagName.toLowerCase(), 'li', 'Tied to li.' );
  });

  test('The template is render correctly when the contact is offline.', function() {
    expect( 3 );
		
		$(this.contactView.el).html(this.contactView.template({dom: 'sidebar', username: 'clockwork', ip: '0', unread: '0' }));
    // Check the number of items rendered
    equal($(this.contactView.el).find('span').length, 1, 'One span rendered.');
    equal($(this.contactView.el).find('.contact').length, 1, 'One contact rendered.');
    equal($(this.contactView.el).find('.offline').length, 1, 'The contact rendered is offline.');
  });

  test('The template is render correctly when the contact is online.', function() {
    expect( 3 );
			
		$(this.contactView.el).html(this.contactView.template({dom: 'sidebar', username: 'clockwork', ip: '1', unread: '0' }));
    // Check the number of items rendered
    equal($(this.contactView.el).find('span').length, 1, 'One span rendered.');
    equal($(this.contactView.el).find('.contact').length, 1, 'One contact rendered.');
    equal($(this.contactView.el).find('.online').length, 1, 'The contact rendered is online.');

  });
  
  test('The template is render correctly when you have an unread text message from the contact.', function() {
    expect( 1 );
			
		$(this.contactView.el).html(this.contactView.template({dom: 'sidebar', username: '', ip: '1', unread: '1' }));
    // Check the number of items rendered
    notStrictEqual($(this.contactView.el).find('span')[0].innerHTML, '(1)', 'The unread message number is correctly displayed.');

  });

  test('The template is render correctly when displayed in div#content', function() {
    expect( 3 );
			
		$(this.contactView.el).html(this.contactView.template({dom: 'conference', username: 'clockwork', ip: '', unread: '' }));
    // Check the number of items rendered
    equal($(this.contactView.el).find('span').length, 1, 'One span rendered.');
    equal($(this.contactView.el).find('input').length, 1, 'One input rendered.');
    equal($(this.contactView.el).find('input')[0].type, 'checkbox', 'One contact rendered.');
    
  });
  
  test('Can wire up send method to DOM element.', function() {
    expect( 1 );

		$(this.contactView.el).html(this.contactView.template({dom: 'sidebar', username: 'clockwork', ip: '1', unread: '0' }));
    this.viewSpy = sinon.spy();
    this.sendStub = sinon.stub(this.contactView, 'view', this.viewSpy );
    this.contactView.delegateEvents();
    // Trigger the event

     $(this.contactView.el).find('span.contact').click();

    // Check the done status for the model is true
    ok( this.viewSpy.called );
    
    this.sendStub.restore();
  });

});
