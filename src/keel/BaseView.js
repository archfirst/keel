/*!
* Copyright 2013 Archfirst
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*
* This file based on: https://github.com/rmurphey/srchr-demo/blob/master/app/views/base.js
* Copyright 2012 Rebecca Murphey - http://rmurphey.com - http://opensource.org/licenses/MIT
*/


/**
* keel/BaseView
*
* This is a view base class built on top of the default Backbone.View; it
* provides a set of rendering, binding, and lifecycle methods that tend to
* be useful in Backbone applications. As part lifecycle methods, it provides
* the facility to maintain a set of child views, especially to avoid zombies.
*
* This view has been further extended to specialize the render method.
* To use this view, you should call the 'extend' method of the appropriate
* sub-class just like you would extend the normal 'Backbone.View'.
*
* @module BaseView
* @requires ExceptionUtil, Backbone, Underscore, jQuery
* @author Naresh Bhatia
* @author Bob Holt
**/
define([

    'ExceptionUtil',

    'backbone',
    'underscore',
    'jquery'

],

function( ExceptionUtil, Backbone, _, $ ) {

    'use strict';

    // TODO: Does it make sense to store templates on the BaseView or in an external template repo?
    var _templates = {};

    /**
    * The BaseView constructor
    *
    * @class BaseView
    * @constructor
    * @extends Backbone.View
    **/
    var BaseView = Backbone.View.extend({

        /**
        * If you would like to store references to certain elements in your
        * template for later use, you can indicate those elements by doing *both*
        * of the following:
        *
        * - adding a classname beginning with `js-` to the elements in your template
        * - listing the classname suffix in your view's `elements` array
        *
        * For example, if your template contains the following:
        *
        *    `<div class="js-interesting"></div>`
        *
        * And your view's `elements` array is:
        *
        *    `[ 'interesting' ]`
        *
        * Then your view will have a property `interestingElement` that references
        * a jQuery object for the div.
        *
        * @property elements
        * @type Array
        **/
        elements : [],

        /**
        * Set a default template that should be overridden by each implementation
        *
        * @property template
        * @type Object
        * @default
        *     {
        *         name: 'DefaultTemplate',
        *         source: '<div></div>'
        *     }
        **/
        template: {

            name: 'DefaultTemplate',
            source: '<div></div>'

        },

        /**
        * Override the constructor to add per-instance configuration

        * @method constructor
        * @chainable
        * @example
        *     new BaseView();
        **/
        constructor: function() {

            // Create a per instance children property.
            // It is a map of unique child ids to child views.
            // The child id can be a number or string, e.g. the id of the associated model
            this.children = {};

            // Call super
            Backbone.View.apply( this, arguments );

        },

        /**
        * Adds a View to the list of child views.
        *
        * @method addChild
        * @param {Object} childSpec A map of child view specifications
        *   @param {Number|String} id A unique id for this child
        *   @param {Function} viewClass The view for this child
        *   @param {HTMLElement} [parentElement=undefined] The HTML element to append the view to
        *   @param {Object} [options=undefined] Options to pass directly into the Backbone View constructor
        * @return {Backbone.View} The child view just added
        * @example
        *     BaseView.addChild({
        *         id: 'ChildView',
        *         viewClass: ChildView,
        *         parentElement: this.el,
        *         options: {
        *             model: ChildModel,
        *             arbitrary: 42
        *         }
        *     });
        **/
        addChild: function( childSpec ) {

            var child = null;

            // Throw an error if an argument isn't passed or a viewClass isn't defined
            if ( !childSpec || !childSpec.viewClass ) {
                throw new ExceptionUtil.FrameworkException( 'BaseView.addChild: child must have a viewClass defined' );
            }

            // Throw an error if the viewClass isn't a function
            if ( typeof childSpec.viewClass !== 'function' ) {
                throw new ExceptionUtil.FrameworkException( 'BaseView.addChild: viewClass must be a Backbone View constructor' );
            }

            // Create the child view, passing any options directly in
            child = new childSpec.viewClass(childSpec.options);

            // Throw an error if the viewClass isn't a Backbone View
            if ( !( child instanceof Backbone.View ) ) {
                throw new ExceptionUtil.FrameworkException( 'BaseView.addChild: viewClass must be a Backbone View constructor' );
            }

            child.render();

            // Add it to the children map
            this.children[ childSpec.id ] = child;

            // If the parent element is supplied, place the child under the parent
            if ( childSpec.parentElement ) {
                child.place( childSpec.parentElement );
            }

            return child;
        },

        /**
        * Adds an array of child views to the list of child views
        *
        * @method addChildren
        * @param {Array} childSpecs An array of childSpecs to iteratively pass into addChild
        * @chainable
        * @example
        *     BaseView.addChildren( [
        *         {
        *             id: 'ChildView1',
        *             viewClass: ChildView1,
        *             parentElement: this.el
        *         },
        *         {
        *             id: 'ChildView2',
        *             viewClass: ChildView2,
        *             parentElement: this.el
        *         }
        *     ] );
        **/
        addChildren: function( childSpecs ) {

            // Loop through and call addChild on each childSpec
            for ( var i = 0, l = childSpecs.length; i < l; i++ ) {
                this.addChild( childSpecs[i] );
            }

            return this;
        },

        /**
        * Destroys the view and all its children recursively, unbinding their events
        *
        * @method destroy
        * @chainable
        * @example
        *     BaseView.destroy();
        **/
        destroy: function() {

            this.destroyChildren();
            this.remove();

            return this;
        },

        /**
        * Destroys the specified child of this view, unbinding its events
        *
        * @method destroyChild
        * @param {String} id The unique name of the child view to destroy
        * @chainable
        * @example
        *     BaseView.destroyChild( 'ChildView1' );
        **/
        destroyChild: function( id ) {

            var children = this.children;

            children[ id ].destroy();

            // Destroy removes the events and DOM element
            // Call delete to remove the object from memory
            delete children[ id ];

            return this;
        },

        /**
        * Destroys all the children of this view recursively, unbinding their events
        *
        * @method destroyChildren
        * @chainable
        * @example
        *     BaseView.destroyChildren();
        **/
        destroyChildren: function() {

            var children = this.children;

            for ( var id in children ) {

                // Only delete own properties
                if ( children.hasOwnProperty(id) ) {
                    children[ id ].destroy();

                    // Destroy removes the events and DOM element
                    // Call delete to remove the object from memory
                    delete children[ id ];
                }
            }

            return this;
        },

        /**
        * Retrieves the view's template from the template cache, or creates it if not cached
        *
        * @method getTemplate
        * @return {Function} template function that accepts a data context
        * @example
        *     BaseView.getTemplate();
        **/
        getTemplate: function() {

            if (!this.template) {
                
                // When applied, this function will return undefined
                // jQuery.html() shortcuts if the argument is undefined as opposed to null or the empty string
                return function(){};
            }

            if ( !_templates[this.template.name] ) {
                _templates[ this.template.name ] = _.template( this.template.source );
            }

            return _templates[ this.template.name ];
        },

        /**
        * Once the view has been rendered, it still needs to be placed in the
        * document. The `place` method allows you to specify a destination for
        * the view; this destination can either be a jQuery object, a DOM node, or
        * a selector. The `place` method also optionally takes a position
        * argument, which determines how the object will be placed in the
        * destination node: as the first, last, or only child.
        *
        * @method place
        * @param {HTMLElement} node The DOM element in which to place this view's element
        * @param {String} [position='last'] Identifier of where in the node to place the view's element
        * @chainable
        * @example
        *     BaseView.place( $('body').get(0), 'last' );
        **/
        place : function(node, position) {

            position = position || 'last';

            var method = {

                'first' :     'prepend',
                'last' :      'append',
                'only' :      'html'

            }[position] || 'append';

            // Equivalent to $(node).append(this.$el);
            $(node)[method](this.$el);

            // Call postPlace lifecycle method
            this.postPlace();

            return this;
        },

        // ## Lifecycle Methods
        //
        // These methods are stubs for implementation by your views. `postPlace` and `postRender
        // fire after their respective methods are complete.

        /**
        * `postPlace` fires just before the view's `place` method returns. Do
        * things here that require the view to be placed in the document, such as
        * operations that require knowing the dimensions of the view.
        *
        * @method postPlace
        * @chainable
        * @example
        *     BaseView.postPlace();
        **/
        postPlace : function() {

            return this;

        },

        /**
        * `postRender` fires just before the view's `render` method returns. Do
        * things here that require the view's basic markup to be in place, but
        * that do NOT require the view to be placed in the document
        *
        * @method postRender
        * @chainable
        * @example
        *     BaseView.postRender();
        **/
        postRender : function() {

            return this;

        },

        /**
        * Renders the view's element in the DOM
        * This method expects the derived class to supply a template.name and a template.source
        *
        * @method render
        * @chainable
        * @example
        *     BaseView.render();
        **/
        render: function() {

            var template = this.getTemplate();
            var model = this.model || {};

            // If the model contains a toJSON method, call it to create the context.
            // Otherwise assume that the model contains properties that will be
            // displayed as is.
            var context = model.toJSON ? model.toJSON() : model;

            // Remove existing children
            this.destroyChildren();

            // Render the template into the view's element
            this.$el.html( template(context) );

            // Store optional element references on the view
            this._setupElements();

            // Call postRender lifecycle method
            this.postRender();

            return this;
        },

        /**
        * The `_setupElements` method is a "private" method for storing references
        * to elements as indicated by the view's `elements` property.
        *
        * @method _setupElements
        * @private
        * @chainable
        * @example
        *     this._setupElements();
        **/
        _setupElements : function() {

            if (this.elements) {

                // Loop through this.elements, and store a reference to the FIRST matching DOM element
                _.each(this.elements, function(c) {
                    this[c + 'Element'] = this.$('.js-' + c).eq(0);
                }, this);
            }

            return this;
        }
    });

    return BaseView;
});