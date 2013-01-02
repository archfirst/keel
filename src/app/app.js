define([

  'backbone'

],

function() {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {

    // The root path to run the application.
    root: "/src/"

  };

  // Incorporate Backbone.Events into our app object
  // This way we can use it as a messaging bus
  return _.extend(app, Backbone.Events);

});
