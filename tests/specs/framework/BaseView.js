/*jshint expr:true */
define([

    'backbone',

    'BaseView',

    'jquery'

], function(Backbone, BaseView, $) {
    'use strict';

    var Construct = null;
    var Construct2 = null;
    var BV = null;
    var BV2 = null;

    describe('BaseView', function() {

        beforeEach(function() {
            $('#test').empty();
            Construct = BaseView.extend({
                tagName: 'section',
                className: 'test-base-view'
            });

            Construct2 = BaseView.extend({
                tagName: 'section',
                className: 'test-base-view-2',
                template: null
            });

            BV = new Construct();
            BV2 = new Construct2();
        });

        afterEach(function() {
            $('#test').empty();
            Construct = null;
            Construct2 = null;
            BV = null;
            BV2 = null;
        });

        describe('#addChild()', function() {

            it('should add a property to the object', function() {

                // There should not be any child views to start
                expect(Object.keys(BV.children).length).to.equal(0);

                BV.addChild({
                    id: 'addChildTest1',
                    viewClass: BaseView
                });

                // There should now be one child view
                expect(Object.keys(BV.children).length).to.equal(1);

                // The key and value should be what we passed in
                expect(BV.children.addChildTest1).to.be.an.instanceof(BaseView);

            });

            it('should require a viewClass', function() {

                expect(BV.addChild).to.
                throw (/must have a viewClass defined/);

            });

            it('should throw an error if viewClass is not a Backbone View', function() {

                expect(function() {
                    BV.addChild({
                        viewClass: function() {}
                    });
                }).to.
                throw (/viewClass must be a Backbone View constructor/);

            });

            it('should throw an error if viewClass is not a function', function() {
                expect(function() {
                    BV.addChild({
                        viewClass: {}
                    });
                }).to.
                throw (/viewClass must be a Backbone View constructor/);
            });

            it('should return the child', function() {

                var bv = BaseView.extend({
                    testProp: 'test'
                });

                expect(BV.addChild({
                    id: 'addChildTest2',
                    viewClass: bv
                })).to.be.an.instanceof(bv);

            });

            it('should add a child to childViews', function() {

                BV.addChild({

                    id: 'addChildTest3',
                    viewClass: BaseView

                });

                expect(BV.children.addChildTest3).to.be.an.instanceof(Backbone.View);

            });

            it('should add the options as attributes', function() {

                var model = new Backbone.Model({
                    modelAttribute: 'this is a custom model'
                });

                var collection = new Backbone.Collection({
                    collectionAttribute: 'this is a custom collection'
                });


                BV.addChild({
                    id: 'addChildTest4',
                    viewClass: BaseView,
                    options: {
                        model: model,
                        collection: collection,
                        testOption: 1
                    }
                });

                expect(BV.children.addChildTest4.model.get('modelAttribute')).to.eql('this is a custom model');
                expect(BV.children.addChildTest4.collection.at(0).get('collectionAttribute')).to.eql('this is a custom collection');
                expect(BV.children.addChildTest4.options.testOption).to.eql(1);

            });

            it('should add an element to the DOM', function() {

                expect($('#test > div').length).to.eql(0);

                BV.addChild({
                    id: 'addChildTest5',
                    viewClass: BaseView,
                    parentElement: $('#test')
                });

                expect($('#test > div').length).to.eql(1);

            });

        });

        describe('#addChildren()', function() {

            it('should add all listed widgets', function() {

                BV.addChildren([{
                        id: 'addChildrenTest1',
                        viewClass: BaseView
                    }, {
                        id: 'addChildrenTest2',
                        viewClass: BaseView
                    }
                ]);

                expect(BV.children.addChildrenTest1).to.be.an.instanceof(Backbone.View);
                expect(BV.children.addChildrenTest2).to.be.an.instanceof(Backbone.View);

            });

            it('should return the View', function() {

                expect(BV.addChildren([{
                        id: 'addChildrenTest3',
                        viewClass: BaseView
                    }, {
                        id: 'addChildrenTest4',
                        viewClass: BaseView
                    }
                ])).to.equal(BV);

            });

        });

        describe('#destroy()', function() {

            it('calls destroyChildren', function() {

                var spy = sinon.spy(BV, 'destroyChildren');

                BV.addChildren([{
                        id: 'deleteTest1',
                        viewClass: BaseView
                    }, {
                        id: 'deleteTest2',
                        viewClass: BaseView
                    }
                ]);

                BV.destroy();

                expect(spy).to.have.been.called;

            });

            it('removes itself from the DOM', function() {

                BV.place('#test');

                BV.addChildren([{
                        id: 'destroyTest1',
                        viewClass: BaseView,
                        parentElement: $('#test')
                    }, {
                        id: 'destroyTest2',
                        viewClass: BaseView,
                        parentElement: $('#test')
                    }
                ]);

                expect($('#test > .test-base-view').length).to.eql(1);
                expect($('#test > div').length).to.eql(2);

                BV.destroy();

                expect($('#test > .test-base-view').length).to.eql(0);
                expect($('#test > div').length).to.eql(0);

            });

        });

        describe('#destroyChild()', function() {

            it('should remove a single child object', function() {

                BV.addChild({

                    id: 'destroyChildTest1',
                    viewClass: BaseView

                });

                expect(BV.children.destroyChildTest1).to.exist;

                BV.destroyChild('destroyChildTest1');

                expect(BV.children.destroyChildTest1).to.not.exist;


            });

            it('should return the View', function() {

                BV.addChild({

                    id: 'destroyChildTest2',
                    viewClass: BaseView

                });

                expect(BV.destroyChild('destroyChildTest2')).to.equal(BV);

            });

        });

        describe('#destroyChildren()', function() {

            it('should remove all children', function() {

                BV.addChildren([{
                        id: 'deleteTest1',
                        viewClass: BaseView
                    }, {
                        id: 'deleteTest2',
                        viewClass: BaseView
                    }
                ]);

                expect(BV.children.deleteTest1).to.exist;
                expect(BV.children.deleteTest2).to.exist;

                BV.destroy();

                expect(BV.children).to.be.empty;

            });

            it('should return the View', function() {

                expect(BV.destroyChildren()).to.equal(BV);

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

            it('should handle a null template', function() {

                // console.log(BV2.getTemplate()());

                // invoke getTemplate() to get the function that returns the template
                // invoke again to get template string, which should be empty
                expect(BV2.getTemplate()()).to.be.undefined;

            });

        });

        describe('#place()', function() {

            beforeEach(function() {
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

                $('#test').append($('<section>'));
                $('#test').append($('<section>'));
                $('#test').append($('<section>'));

                expect($('#test').find(BV.$el).length).to.equal(0);
                expect($('#test > section').length).to.equal(3);

                BV.place('#test', 'only');

                expect($('#test').find(BV.$el).length).to.equal(1);
                expect($('#test > section').length).to.equal(1);

                // The LAST element of the container should be the element
                // Compare raw HTML, because jQuery objects will not equal
                expect($('#test > section').get(0)).to.equal(BV.el);

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