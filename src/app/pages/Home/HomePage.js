define(
  [

    'MessageBus',

    'BaseView',

    'text!pages/home/homeTemplate.html',

    'widgets/Mainmenu/MainmenuWidget',

    'widgets/Red/RedWidget',

    'widgets/Green/GreenWidget',

    'widgets/Blue/BlueWidget'

  ],

  function(MessageBus, BaseView, homeTemplate, MainMenuWidget, RedWidget, GreenWidget, BlueWidget){

    'use strict';

    // The base view for this module (extends from /libs/js/superview.js)
    return BaseView.extend({

      // Make this view a <section> in the DOM
      tagName: 'section',

      // Give it a class of 'page'
      className: 'page',

      // Use the template passed in from the define
      template: {

        name: 'homeTemplate',
        source: homeTemplate

      },

      initialize: function() {

        var homeView = this;

        // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
        // On pageChange, remove this view
        homeView.listenTo(MessageBus, 'pageChange', function() {

          homeView.removeAllChildren();
          homeView.remove();

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
            name: 'Red',
            widget: RedWidget,
            element: '.content'
          },
          {
            name: 'Green',
            widget: GreenWidget,
            element: '.content'
          },
          {
            name: 'Blue',
            widget: BlueWidget,
            element: '.content'
          }
        ]);

      }

    });

  }

);