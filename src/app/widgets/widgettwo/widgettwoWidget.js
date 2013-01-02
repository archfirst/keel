define(
  [

    'framework/BaseView',

    'text!widgets/widgettwo/widgettwoTemplate.html'

  ],

  function(BaseView, widgettwoTemplate){

    // Create a module object to hold our models, views, and collections
    var Module = {};

    // The base model for this module
    Module.ViewModel = Backbone.Model.extend({

      // On initialization, copy the model's cid into the attributes so it remains when templating
      initialize: function() {

        this.set('cid', this.cid);

      }

    });

    // The base view for this module (extends from /libs/js/superview.js)
    Module.View = BaseView.extend({

      // Set classnames on this widget for styling
      className: 'widget content-widget widget-two',

      // Use the template passed in from the define
      template: {
        name: 'widgetTwoTemplate',
        source: widgettwoTemplate
      },

      initialize: function() {

        this.model = new Module.ViewModel();

      }

    });

    // Return our module object
    return Module;

  }

);