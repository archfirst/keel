define(
  [

    'app',

    'widgetoneModule'

  ],

  function(app, widgetoneModule){

    // The module returns a function that is invoked immediately after the file is loaded
    // This allows us to pass options into our module
    return function(options) {

      // Create a Model for this widget
      // Our template will be passed a stringified version of this as the data context
      var widgetoneModel = new widgetoneModule.Model();

      // Create a View for this widget, passing in the model above, render it, and place it in the DOM
      var widgetoneView = new widgetoneModule.View({

        model: widgetoneModel

      }).render().placeAt(options.element);

      // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
      // On pageChange, remove this view
      widgetoneView.listenTo(app, 'pageChange', function() {

        widgetoneView.remove();

      });

    };

  }

);