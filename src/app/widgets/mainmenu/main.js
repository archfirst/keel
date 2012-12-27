define(
  [

    'app',

    'mainmenuModule'

  ],

  function(app, mainmenuModule){

    // The module returns a function that is invoked immediately after the file is loaded
    // This allows us to pass options into our module
    return function(options) {

      // Create a View for this widget, passing in the model above, render it, and place it in the DOM
      var mainmenuView = new mainmenuModule.View()
        .render()
        .placeAt(options.element);

      // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
      // On pageChange, remove this view
      mainmenuView.listenTo(app, 'pageChange', function() {

        mainmenuView.remove();

      });

    };

  }

);