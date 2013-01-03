/*global define: true */

(function() {

  'use strict';

  // The application root. The build process will take care of changing this to '/dist/'.
  // If you then deploy /dist as a root directory for your application, this should be changed to '/'.
  var appRoot = '/src/';

  define([

    'Router',

    'backbone',

    'jquery'

  ],

  function(Router, Backbone, $) {

    // Defining the application router, you can attach sub routers here.
    return {

      start: function start() {

        // Start your master router.
        new Router();

        // Trigger the initial route and enable HTML5 History API support
        Backbone.history.start({ pushState: true, root: appRoot });

        /*!
         * The following event handler modified from Backbone Boilerplate
         * Copyright Tim Branyen
         */
        // All navigation that is relative should be passed through the navigate
        // method, to be processed by the router. If the link has a `data-bypass`
        // attribute, bypass the delegation completely.
        $(document).on('click', 'a[href]:not([data-bypass])', function(e) {

          // Get the absolute anchor href.
          var href = { prop: $(this).prop('href'), attr: $(this).attr('href') };

          // Get the absolute root.
          var root = location.protocol + '//' + location.host + appRoot;

          // Ensure the root is part of the anchor href, meaning it's relative.
          if (href.prop.slice(0, root.length) === root) {

            // Stop the default event to ensure the link will not cause a page
            // refresh.
            e.preventDefault();

            // `Backbone.history.navigate` is sufficient for all Routers and will
            // trigger the correct events. The Router's internal `navigate` method
            // calls this anyways.  The fragment is sliced from the root.
            Backbone.history.navigate(href.attr, true);

          }

        });

      }

    };

  });

}());

