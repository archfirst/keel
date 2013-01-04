define(
  [

    'MessageBus',

    'BaseView',

    'text!pages/two/twoTemplate.html',

    'widgets/mainmenu/MainmenuWidget',

    'widgets/green/GreenWidget'

  ],

  function(MessageBus, BaseView, twoTemplate, MainMenuWidget, GreenWidget){
    'use strict';

    return BaseView.extend({

      // Make this view a <section> in the DOM
      tagName: 'section',

      // Give it a class of 'page'
      className: 'page',

      // Use the template passed in from the define
      template: {
        name: 'twoTemplate',
        source: twoTemplate
      },

      initialize: function() {

        var twoView = this;

        // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
        // On pageChange, remove this view
        twoView.listenTo(MessageBus, 'pageChange', function() {

          twoView.removeAllChildren();
          twoView.remove();

        });

      },

      // After the DOM element is rendered, create our child widgets
      postPlace: function() {

        this.addWidgets([
          {
            name: 'MainMenu',
            widget: MainMenuWidget,
            element: '.main-menu'
          },
          {
            name: 'Green-A',
            widget: GreenWidget,
            element: '.content'
          },
          {
            name: 'Green-B',
            widget: GreenWidget,
            element: '.content'
          },
          {
            name: 'Green-C',
            widget: GreenWidget,
            element: '.content'
          }
        ]);

      }

    });

  }

);