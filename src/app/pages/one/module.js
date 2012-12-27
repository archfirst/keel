define(
  [

    'app',

    'text!pages/one/templates/base.html',

    'superview'

  ],

  function(app, baseTemplate){

    // Create a module object to hold our models, views, and collections
    var Module = {};

    // The base model for this module
    Module.Model = Backbone.Model.extend();

    // The base view for this module (extends from /libs/js/superview.js)
    Module.View = Backbone.SuperView.extend({

      // Make this view a <section> in the DOM
      tagName: 'section',

      // Give it a class of 'page'
      className: 'page',

      // Use the template passed in from the define
      template: baseTemplate,

      // After the DOM element is rendered, create our child widgets using app.modules.create from /app/app.js
      postRender: function() {

        app.modules.create([
          {
            module: 'mainmenu',
            element: '.main-menu'
          },
          {
            module: 'widgetone',
            element: '.content'
          },
          {
            module: 'widgetone',
            element: '.content'
          },
          {
            module: 'widgetone',
            element: '.content'
          }
        ]);

      }

    });

    // Return our module object
    return Module;

  }

);