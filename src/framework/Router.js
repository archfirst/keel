define([

  'Message',

  'MessageBus',

  'backbone'

],

function(Message, MessageBus, Backbone) {
  'use strict';

  // Defining the application router, you can attach sub routers here.
  return Backbone.Router.extend({

    // Route map
    routes: {
      '':       'goToPage',
      ':page':  'goToPage'
    },

    // Simply directs the application to go to a specific page
    goToPage: function(page) {

      // If we do not receive a page argument, just go home
      if (!page || page === 'index.html') {

        page = 'home';

      }

      // Trigger the `pageBeforeChange` event in the MessageBus
      MessageBus.trigger(Message.PageBeforeChange, page);

      // Convert to Uppercase first letter
      page = page[0].toUpperCase() + page.slice(1);

      // Load in the page's module and render it
      require(['pages/' + page + '/' + page + 'Page'], function(PageConstructor) {

        var pageInstance = new PageConstructor().render().place('body');

        // Remove the page on a `pageBeforeChange` event
        pageInstance.listenTo(MessageBus, Message.PageBeforeChange, function() {
          pageInstance.destroy();
        });

        // Trigger the `pageChange` event in the MessageBus
        MessageBus.trigger(Message.PageChange, page);

      });

    }

  });

});
