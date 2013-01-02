/**
 * Copyright 2012 Archfirst
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
 */

/*!
 * framework/BaseView
 * Based on: https://github.com/rmurphey/srchr-demo/blob/master/app/views/base.js
 * * Copyright 2012 Rebecca Murphey http://rmurphey.com
 * * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
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
 * @author Naresh Bhatia
 */

 /*!
  * Further modified by Bob Holt
  */

define([

  "backbone",
  "underscore",
  "jquery"

],

function(Backbone, _, $) {

  'use strict';

  var _templates = {};

  return Backbone.View.extend({

    // Map of ids to child views
    // The view id is any unique string, e.g. the id of the associated model
    childViews: {},

    addChild: function(id, childView) {

      this.childViews[id] = childView;

    },

    addWidget: function(widget) {

      var constructorArg = {};

      if (widget.model) {
        constructorArg.model = widget.model;
      }

      if (widget.collection) {
        constructorArg.collection = widget.collection;
      }

      this.addChild(widget.name, new widget.widget.View(constructorArg).render().place(widget.element));

    },

    addWidgets: function(widgets) {

      for (var i = 0, l = widgets.length; i < l; i++) {

        this.addWidget(widgets[i]);

      }

    },

    removeChild: function(id) {

      var childViews = this.childViews;

      childViews[id].remove();

      delete childViews[id];

    },

    removeAllChildren: function() {

      var childViews = this.childViews;

      for (var id in childViews) {

        if (childViews.hasOwnProperty(id)) {

          childViews[id].remove();

        }

        childViews = {};

      }

    },

    template: {

      name: 'DefaultTemplate',
      source: '<div></div>'

    },

    // This method expects the derived class to supply a template.name and
    // a template.source
    render: function() {

      var template = this.getTemplate();
      var model = this.model || {};
      var context = model.toJSON ? model.toJSON() : {};

      // Remove existing children
      // this.removeAllChildren();

      this.$el.html(template(context));

      this.postRender();

      return this;

    },

    getTemplate: function() {

      if (!_templates[this.template.name]) {

        _templates[this.template.name] = _.template(this.template.source);

      }

      return _templates[this.template.name];

    },

    // ### `place`
    //
    // Once the view has been rendered, it still needs to be placed in the
    // document. The `place` method allows you to specify a destination for
    // the view; this destination can either be a jQuery object, a DOM node, or
    // a selector. The `place` method also optionally takes a position
    // argument, which determines how the object will be placed in the
    // destination node: as the first, last, or only child.
    place : function(node, position) {

      position = position || 'last';

      var method = {

        'first' :     'prepend',
        'last' :      'append',
        'only' :      'html'

      }[position] || 'append';

      $(node)[method](this.$el);

      this.postPlace();

      return this;

    },

    // ## Lifecycle Methods
    //
    // These methods are stubs for implementation by your views. These methods
    // fire after their respective methods are complete.

    // ### `postRender`
    //
    // `postRender` fires just before the view's `render` method returns. Do
    // things here that require the view's basic markup to be in place, but
    // that do NOT require the view to be placed in the document
    postRender : function() { },

    // ### `postPlaceAt`
    //
    // `postPlaceAt` fires just before the view's `place` method returns. Do
    // things here that require the view to be placed in the document, such as
    // operations that require knowing the dimensions of the view.
    postPlace : function() { }

  });

});