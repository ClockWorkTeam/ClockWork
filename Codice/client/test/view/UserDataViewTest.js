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
    equal(this.userDataView.$el.find('button').length, 3, 'Three buttons rendered.');
    equal(this.userDataView.$el.find('ul').length, 1, 'One list rendered.');
    equal(this.userDataView.$el.find('input').length, 5, 'Five input rendered.');

  }); 


  test('Can wire up checkPassword method to DOM element.', function() {
    expect( 1 );

    this.checkPasswordSpy = sinon.spy();
    this.sendStub = sinon.stub(this.userDataView, 'checkPassword', this.checkPasswordSpy );
    this.userDataView.delegateEvents();
    // Trigger the event
     this.userDataView.$el.find('button#submitChange').click();
    // Check the done status for the model is true
    ok( this.checkPasswordSpy.called );
    
    this.sendStub.restore();
  });
  
  test('Can wire up render method to DOM element.', function() {
    expect( 1 );

    this.renderSpy = sinon.spy();
    this.sendStub = sinon.stub(this.userDataView, 'render', this.renderSpy );
    this.userDataView.delegateEvents();
    // Trigger the event
     this.userDataView.$el.find('button#reset').click();
    // Check the done status for the model is true
    ok( this.renderSpy.called );
    
    this.sendStub.restore();
  });
  
    test('Can wire up unrender method to DOM element.', function() {
    expect( 1 );

    this.unrenderSpy = sinon.spy();
    this.sendStub = sinon.stub(this.userDataView, 'unrender', this.unrenderSpy );
    this.userDataView.delegateEvents();
    // Trigger the event
     this.userDataView.$el.find('button#denyChange').click();
    // Check the done status for the model is true
    ok( this.unrenderSpy.called );
    
    this.sendStub.restore();
  });
  
  test('Can wire up callBacks method to DOM element.', function() {
    expect( 1 );

    this.model = this.spy();
    this.view = this.spy();
		//var view = { contactsView: { getContacts: this.cViewSpy },template: function(){} };

    this.userDataCommunication=require('communication/UserDataCommunication');
    
    this.changeStub = sinon.stub(this.userDataCommunication, 'changeData');

    this.userDataView.callBacks().changeData(this.model,this.view);

    ok( this.changeStub.called );
    
    this.changeStub.restore();
  });
  
  
});
