define([

  'backbone'

],

function() {

  // Provide a global location to place configuration settings and module
  // creation.
  var app = {

    // The root path to run the application.
    root: "/src/",

    // Previously 'widgets' - an object with a common create method for requiring in a module and firing its callback
    modules: {

      // Create module requires the module code and fires the function it returns
      // This expects an array of module objects containing at least the following parameters:
      // * module: "module name"
      // * element: "DOM element a jQuery selector string"
      // If only a string or a single object are passed, the array is created within this method.
      create: function(modules) {

        // If the argument is a string, assume it is the module name
        // Wrap it in an hash and array to format it as we expect
        if (typeof modules === 'string') {
          modules = [{
            module: modules
          }];
        }

        // If the argument is a non-array object, turn it into a length 1 array
        if (typeof modules === 'object' && !Array.isArray(modules)) {

          modules = [modules];

        }

        // Loop through each object in the array, require the module, and fire the function it returns
        _.each(modules, function(module, index) {

          // Assume the module is in the paths config as name + 'Main'
          require([module.module + 'Main'], function(main) {

            // Fire the function returned fromt the module
            main(module);

          });

        });

      }

    }

  };

  // Incorporate Backbone.Events into our app object
  // This way we can use it as a messaging bus
  return _.extend(app, Backbone.Events);

});
