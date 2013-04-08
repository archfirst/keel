/*!
* Copyright 2013 Archfirst
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
* keel/Router
*
* Extends Backbone.Router to route to different pages in the application.
*
* @module Router
* @requires Message, MessageBus, Backbone
* @author Bob Holt
*/
define([

    'Message',
    'MessageBus',
    'backbone'
],

function(Message, MessageBus, Backbone) {
    'use strict';

    /**
    * Defining the application router, you can attach sub routers here.
    *
    * @class Router
    * @constructor
    * @extends Backbone.Router
    **/
    var Router = Backbone.Router.extend({

        /**
        * Route map
        *
        * @property routes
        * @type Object
        * @default
        *     {
        *         '':       'goToPage',
        *         ':page':  'goToPage'
        *     }
        **/
        routes: {
            '':       'goToPage',
            ':page':  'goToPage'
        },

        /**
        * Directs the application to go to a specific page
        * Loads the page's view module, renders, and places it
        *
        * @method goToPage
        * @param {String} [page=undefined] The page name to navigate to
        **/
        goToPage: function(page) {

            // If we do not receive a page argument, just go home
            if (!page || page === 'index.html') {
                page = 'home';
            }

            // Convert to Camelcase
            var pageName = page[0].toUpperCase() + page.slice(1).replace(/-\w/g, function(v) {  return v[1].toUpperCase(); });

            // Trigger the `pageBeforeChange` event in the MessageBus
            MessageBus.trigger(Message.PageBeforeChange, page);

            // Load in the page's module and render it
            require(['app/pages/' + page + '/' + pageName + 'Page'], function(PageConstructor) {

                var pageInstance = new PageConstructor().render().place('#container');

                // Remove the page on a `pageBeforeChange` event
                pageInstance.listenTo(MessageBus, Message.PageBeforeChange, function() {
                    pageInstance.destroy();
                });

                // Trigger the `pageChange` event in the MessageBus
                MessageBus.trigger(Message.PageChange, page);
            });
        }
    });

    return Router;
});