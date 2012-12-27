define(
  [

    'app',

    'widgetthreeModule'

  ],

  function(app, widgetthreeModule){

    // The module returns a function that is invoked immediately after the file is loaded
    // This allows us to pass options into our module
    return function(options) {

      // Create a Model for this widget
      // Our template will be passed a stringified version of this as the data context
      var widgetthreeModel = new widgetthreeModule.Model();

      // Create a View for this widget, passing in the model above, render it, and place it in the DOM
      var widgetthreeView = new widgetthreeModule.View({

        model: widgetthreeModel

      }).render().placeAt(options.element);

      // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
      // On pageChange, remove this view
      widgetthreeView.listenTo(app, 'pageChange', function() {

        widgetthreeView.remove();

      });

    };

  }

);