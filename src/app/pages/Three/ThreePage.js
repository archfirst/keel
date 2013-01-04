define(
  [

    'MessageBus',

    'BaseView',

    'text!pages/Three/ThreeTemplate.html',

    'widgets/Mainmenu/MainmenuWidget',

    'widgets/Blue/BlueWidget'

  ],

  function(MessageBus, BaseView, threeTemplate, MainMenuWidget, BlueWidget){
    'use strict';

    return BaseView.extend({

      // Make this view a <section> in the DOM
      tagName: 'section',

      // Give it a class of 'page'
      className: 'page',

      // Use the template passed in from the define
      template: {
        name: 'threeTemplate',
        source: threeTemplate
      },

      initialize: function() {

        var threeView = this;

        // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
        // On pageChange, remove this view
        threeView.listenTo(MessageBus, 'pageChange', function() {

          threeView.removeAllChildren();
          threeView.remove();

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
            name: 'Blue-A',
            widget: BlueWidget,
            element: '.content'
          },
          {
            name: 'Blue-B',
            widget: BlueWidget,
            element: '.content'
          },
          {
            name: 'Blue-C',
            widget: BlueWidget,
            element: '.content'
          }
        ]);

      }

    });

  }

);