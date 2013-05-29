/*global define: true */

(function() {

    'use strict';

    define([

        'app/framework/AppConfig',

        'Router',

        'backbone',

        'jquery'

    ],

    function(AppConfig, Router, Backbone, $) {

        var masterRouter;

        // Defining the application router, you can attach sub routers here.
        return {

            start: function start() {

                var app = this;

                // Start your master router.
                masterRouter = new Router();

                // Trigger the initial route and enable HTML5 History API support
                Backbone.history.start({ pushState: true, root: AppConfig.appRoot });

                /*!
                * The following event handler modified from Backbone Boilerplate
                * Copyright Tim Branyen
                */
                // All navigation that is relative should be passed through the navigate
                // method, to be processed by the router. If the link has a `data-bypass`
                // attribute, bypass the delegation completely.
                $(document).on('click', 'a[href]:not([data-bypass])', function(e) {


                    var relativeURI = app.getRelativeURI(e);

                    if (relativeURI) {

                        // Stop the default event to ensure the link will not cause a page
                        // refresh.
                        e.preventDefault();

                        // The fragment is sliced from the root.
                        masterRouter.navigate(relativeURI, true);

                    }

                });

                return this;

            },

            getRelativeURI: function getRelativeURI(e) {

                // Get the absolute anchor href.
                var href = $(e.currentTarget).prop('href');

                // Get the absolute root.
                var root = location.protocol + '//' + location.host + AppConfig.appRoot;

                // Ensure the root is part of the anchor href, meaning it's relative.
                if (href.slice(0, root.length) === root) {

                    return href.replace(root, '');

                }

                return false;

            }

        };

    });

}());

