define(
  [

    'app',

    'twoModule'

  ],

  function(app, twoModule){

    // The module returns a function that is invoked immediately after the file is loaded
    // This allows us to pass options into our module
    return function(options) {

      // Create a View for this page, render it, and place it in the DOM
      var twoView = new twoModule.View()
        .render()
        .placeAt('body');

      // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
      // On pageChange, remove this view
      twoView.listenTo(app, 'pageChange', function() {

        twoView.remove();

      });

    };

  }

);