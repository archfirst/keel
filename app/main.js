// Set the require.js configuration for the application.
// Doing this in main.js to ensure it loads before any other scripts are required in
require.config({

  // Initialize the application with the main application file.
  deps: ["main"],

  paths: {

    // The main app file
    app:              "app",

    // jQuery
    jquery:           "../libs/js/jquery-1.8.3.min",

    // Underscore/Lodash
    underscore:       "../libs/js/lodash.underscore.min",

    // Backbone
    backbone:         "../libs/js/backbone",
    router:           "../app/router",
    superview:        "../libs/js/superview",

    // Layouts
    homeMain:         "pages/home/main",
    homeModule:       "pages/home/module",
    oneMain:          "pages/one/main",
    oneModule:        "pages/one/module",
    twoMain:          "pages/two/main",
    twoModule:        "pages/two/module",
    threeMain:        "pages/three/main",
    threeModule:      "pages/three/module",

    // Widgets
    baseWidget:       "widgets/_lib/baseWidget",
    mainmenuMain:     "widgets/mainmenu/main",
    mainmenuModule:   "widgets/mainmenu/module",
    widgetoneMain:     "widgets/widgetone/main",
    widgetoneModule:   "widgets/widgetone/module",
    widgettwoMain:     "widgets/widgettwo/main",
    widgettwoModule:   "widgets/widgettwo/module",
    widgetthreeMain:     "widgets/widgetthree/main",
    widgetthreeModule:   "widgets/widgetthree/module"

  },

  // Shim those modules that are not set up for AMD
  // http://requirejs.org/docs/api.html#config-shim
  shim: {

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    underscore: {
      exports: '_'
    }

  }

});

// Kick off the application by requiring in the app and router
require([
  // Application.
  "app",

  // Main Router.
  "router"

],

function(app, Router) {

  // Define your master router on the application namespace and trigger all
  // navigation from this instance.
  app.router = new Router();

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router. If the link has a `data-bypass`
  // attribute, bypass the delegation completely.
  $(document).on("click", "a[href]:not([data-bypass])", function(evt) {

    // Get the absolute anchor href.
    var href = { prop: $(this).prop("href"), attr: $(this).attr("href") };

    // Get the absolute root.
    var root = location.protocol + "//" + location.host + app.root;

    // Ensure the root is part of the anchor href, meaning it's relative.
    if (href.prop.slice(0, root.length) === root) {

      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events. The Router's internal `navigate` method
      // calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate(href.attr, true);

    }

  });

});
