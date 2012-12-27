define(
  [

    'app',

    'widgettwoModule'

  ],

  function(app, widgettwoModule){

    // The module returns a function that is invoked immediately after the file is loaded
    // This allows us to pass options into our module
    return function(options) {

      // Create a Model for this widget
      // Our template will be passed a stringified version of this as the data context
      var widgettwoModel = new widgettwoModule.Model();

      // Create a View for this widget, passing in the model above, render it, and place it in the DOM
      var widgettwoView = new widgettwoModule.View({

        model: widgettwoModel

      }).render().placeAt(options.element);

      // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
      // On pageChange, remove this view
      widgettwoView.listenTo(app, 'pageChange', function() {

        widgettwoView.remove();

      });

    };

  }

);