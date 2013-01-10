define(
  [

    'MessageBus',

    'BaseView',

    'text!pages/three/threeTemplate.html',

    'widgets/mainmenu/MainmenuWidget',

    'widgets/blue/BlueWidget'

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

      elements: ['mainmenu', 'content'],

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
      postRender: function() {

        this.addWidgets([
          {
            name: 'MainMenu',
            widget: MainMenuWidget,
            element: this.mainmenuElement
          },
          {
            name: 'Blue-A',
            widget: BlueWidget,
            element: this.contentElement
          },
          {
            name: 'Blue-B',
            widget: BlueWidget,
            element: this.contentElement
          },
          {
            name: 'Blue-C',
            widget: BlueWidget,
            element: this.contentElement
          }
        ]);

      }

    });

  }

);