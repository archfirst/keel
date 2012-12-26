define(
  [

    'text!widgets/mainmenu/templates/base.html',

    'superview'

  ],

  function(baseTemplate){

    // Create a module object to hold our models, views, and collections
    var Module = {};

    // The base view for this module (extends from /libs/js/superview.js)
    Module.View = Backbone.SuperView.extend({

      // Make this view a <ul> in the DOM
      tagName: 'ul',

      // Set classname on this widget for styling
      className: 'widget',

      // Use the template passed in from the define
      template: baseTemplate

    });

    // Return our module object
    return Module;

  }

);