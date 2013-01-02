define([

  "app",

  'backbone'

],

function(app) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({

    // When the router is initialized, trigger the initial route
    initialize: function() {

      // Trigger the initial route and enable HTML5 History API support, set the
      // root folder to '/' by default.  Change root in app.js.
      Backbone.history.start({ pushState: true, root: app.root });

    },

    // Routs map
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

      // Trigger the pageChange event in the app
      app.trigger('pageChange');

      // Load in the page's module and fire the function it returns
      require(['pages/' + page + '/' + page + 'Page'], function(module) {

        new module.View().render().place('body');

      });

    }

  });

  // Return this router instance
  return Router;

});
