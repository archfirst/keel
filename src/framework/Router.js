define([

  'MessageBus',

  'backbone'

],

function(MessageBus, Backbone) {

  // Defining the application router, you can attach sub routers here.
  return Backbone.Router.extend({

    // Route map
    routes: {
      "":       "goToPage",
      ":page":  "goToPage"
    },

    // Simply directs the application to go to a specific page
    goToPage: function(page) {

      // If we do not receive a page argument, just go home
      if (!page || page === "index.html") {

        page = 'home';

      }

      // Convert to Uppercase first letter
      page = page[0].toUpperCase() + page.slice(1);

      // Trigger the pageChange event in the MessageBus
      MessageBus.trigger('pageChange');

      // Load in the page's module and fire the function it returns
      require(['pages/' + page + '/' + page + 'View'], function(module) {

        new module().render().place('body');

      });

    }

  });

});
