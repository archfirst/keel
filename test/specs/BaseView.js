/*global describe:true, expect:true, it:true, before:true, beforeEach:true */
/*jshint expr:true, es5:true */
define([

  'BaseView'

], function(BaseView) {
  'use strict';

  var BV = new BaseView({
    tagName: 'section',
    className: 'test-base-view'
  });

  describe('BaseView', function() {

    before(function() {
      BV.childViews = {};
    });

    describe('#addChild()', function() {

      it('should add a property to the object', function() {

        var key = 'key';
        var value = new BaseView();

        // There should not be any child views to start
        expect(Object.keys(BV.childViews).length).to.equal(0);

        BV.addChild(key, value);

        // There should now be one child view
        expect(Object.keys(BV.childViews).length).to.equal(1);

        // The key and value should be what we passed in
        expect(BV.childViews.key).to.equal(value);

      });

      it('should only add a Backbone View', function() {

        expect(BV.addChild).to.throw(/must be a Backbone View/);

      });

      it('should return the View', function() {

        expect(BV.addChild('key3', new BaseView())).to.equal(BV);

      });

    });

    describe('#addWidget()', function() {

      // addWidget accepts an object with required name, widget, and element properties
      // The object may have optional model or collection properties

      it('should add a child to childViews', function() {

        BV.addWidget({

          name: 'addWidgetTest1',
          element: '#test',
          widget: BaseView

        });

        expect(BV.childViews.addWidgetTest1).to.be.an.instanceof(Backbone.View);

      });

      it('should have the specific model passed', function() {

        var model = new Backbone.Model({
          modelAttribute: 'this is a custom model'
        });

        BV.addWidget({
          name: 'addWidgetTest2',
          element: '#test',
          widget: BaseView,
          model: model
        });

        expect(BV.childViews.addWidgetTest2.model.get('modelAttribute')).to.equal('this is a custom model');

      });

      it ('should have the specific collection passed', function() {

        var collection = new Backbone.Collection({
          collectionAttribute: 'this is a custom collection'
        });

        BV.addWidget({
          name: 'addWidgetTest3',
          element: '#test',
          widget: BaseView,
          collection: collection
        });

        expect(BV.childViews.addWidgetTest3.collection.at(0).get('collectionAttribute')).to.equal('this is a custom collection');

      });

      it('should have both specific model and collection passed', function() {

        var model = new Backbone.Model({
          modelAttribute: 'this is another custom model'
        });

        var collection = new Backbone.Collection({
          collectionAttribute: 'this is another custom collection'
        });

        BV.addWidget({
          name: 'addWidgetTest4',
          element: '#test',
          widget: BaseView,
          model: model,
          collection: collection
        });

        expect(BV.childViews.addWidgetTest4.model.get('modelAttribute')).to.equal('this is another custom model');
        expect(BV.childViews.addWidgetTest4.collection.at(0).get('collectionAttribute')).to.equal('this is another custom collection');

      });

      it('should return the View', function() {

        expect(BV.addWidget({
          name: 'addWidgetTest5',
          element: '#test',
          widget: BaseView
        })).to.equal(BV);

      });

    });

    describe('#addWidgets()', function() {

      it('should add all listed widgets', function() {

        BV.addWidgets([
          {
            name: 'addWidgetsTest1',
            element: '#test',
            widget: BaseView
          },
          {
            name: 'addWidgetsTest2',
            element: '#test',
            widget: BaseView
          }
        ]);

        expect(BV.childViews.addWidgetsTest1).to.be.an.instanceof(Backbone.View);
        expect(BV.childViews.addWidgetsTest2).to.be.an.instanceof(Backbone.View);

      });

      it('should return the View', function() {

        expect(BV.addWidgets([
          {
            name: 'addWidgetsTest3',
            element: '#test',
            widget: BaseView
          },
          {
            name: 'addWidgetsTest4',
            element: '#test',
            widget: BaseView
          }
        ])).to.equal(BV);

      });

    });

    describe('#removeChild()', function() {

      it('should remove a single child object', function() {

        var numKeys = Object.keys(BV.childViews).length;

        expect(BV.childViews.key).to.exist;

        BV.removeChild('key');

        expect(BV.childViews.key).to.not.exist;

        expect(Object.keys(BV.childViews).length).to.equal(numKeys - 1);

      });

      it('should return the View', function() {

        expect(BV.removeChild('key3')).to.equal(BV);

      });

    });

    describe('#removeAllChildren()', function() {

      it('should remove all children', function() {

        expect(Object.keys(BV.childViews).length).to.be.above(0);

        BV.removeAllChildren();

        expect(Object.keys(BV.childViews).length).to.equal(0);

      });

      it('should return the View', function() {

        expect(BV.removeAllChildren()).to.equal(BV);

      });

    });

    describe('#render()', function() {

      it('should add the template to the element', function() {

        expect(BV.$el.html()).to.equal('');

        BV.render();

        expect(BV.$el.html()).to.equal(BV.template.source);

      });

      it('should return the View', function() {

        expect(BV.render()).to.equal(BV);

      });

    });

    describe('#getTemplate()', function() {

      it('should return the view template', function() {

        // invoke getTemplate() to get the function that returns the template
        // invoke again to get template string
        // Since the default template has no variables, it should match the template source
        expect(BV.getTemplate()()).to.equal(BV.template.source);

      });

    });

    describe('#place()', function() {

      beforeEach(function(){
        $('.test-base-view').remove();
      });

      it('should place the el after existing content by default', function() {

        expect($('#test').find(BV.$el).length).to.equal(0);

        BV.place('#test');

        expect($('#test').find(BV.$el).length).to.equal(1);

        // The LAST element of the container should be the element
        // Compare raw HTML, because jQuery objects will not equal
        expect($('#test section:last-child').get(0)).to.equal(BV.el);

      });

      it('should place the el after existing content when directed', function() {

        expect($('#test').find(BV.$el).length).to.equal(0);

        BV.place('#test', 'last');

        expect($('#test').find(BV.$el).length).to.equal(1);

        // The LAST element of the container should be the element
        // Compare raw HTML, because jQuery objects will not equal
        expect($('#test section:last-child').get(0)).to.equal(BV.el);

      });

      it('should place the el before existing content when directed', function() {

        expect($('#test').find(BV.$el).length).to.equal(0);

        BV.place('#test', 'first');

        expect($('#test').find(BV.$el).length).to.equal(1);

        // The LAST element of the container should be the element
        // Compare raw HTML, because jQuery objects will not equal
        expect($('#test section:first-child').get(0)).to.equal(BV.el);

      });

      it('replace existing content when directed', function() {

        expect($('#test').find(BV.$el).length).to.equal(0);
        expect($('#test section').length).to.equal(3);

        BV.place('#test', 'only');

        expect($('#test').find(BV.$el).length).to.equal(1);
        expect($('#test section').length).to.equal(1);

        // The LAST element of the container should be the element
        // Compare raw HTML, because jQuery objects will not equal
        expect($('#test section').get(0)).to.equal(BV.el);

      });

      it('should return the View', function() {

        expect(BV.place('#test')).to.equal(BV);

      });

    });

    describe('#postRender()', function() {

      it('should return the View', function() {

        expect(BV.postRender()).to.equal(BV);

      });

    });

    describe('#postPlace()', function() {

      it('should return the View', function() {

        expect(BV.postPlace()).to.equal(BV);

      });

    });

  });

});