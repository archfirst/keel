define(
  [

    'MessageBus',

    'BaseView',

    'text!pages/One/oneTemplate.html',

    'widgets/Mainmenu/MainmenuWidget',

    'widgets/Red/RedWidget'

  ],

  function(MessageBus, BaseView, oneTemplate, MainMenuWidget, RedWidget){
    'use strict';

    // The base view for this module (extends from /libs/js/superview.js)
    return BaseView.extend({

      // Make this view a <section> in the DOM
      tagName: 'section',

      // Give it a class of 'page'
      className: 'page',

      // Use the template passed in from the define
      template: {
        name: 'oneTemplate',
        source: oneTemplate
      },

      elements: ['mainmenu', 'content'],

      initialize: function() {

        var oneView = this;

        // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
        // On pageChange, remove this view
        oneView.listenTo(MessageBus, 'pageChange', function() {

          oneView.removeAllChildren();
          oneView.remove();

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
            name: 'Red-A',
            widget: RedWidget,
            element: this.contentElement
          },
          {
            name: 'Red-B',
            widget: RedWidget,
            element: this.contentElement
          },
          {
            name: 'Red-C',
            widget: RedWidget,
            element: this.contentElement
          }
        ]);

      }

    });

  }

);