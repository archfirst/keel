define(
  [

    'app',

    'framework/BaseView',

    'text!pages/one/oneTemplate.html',

    'widgets/mainmenu/mainmenuWidget',

    'widgets/widgetone/widgetoneWidget'

  ],

  function(app, BaseView, oneTemplate, MainMenu, WidgetOne){

    // Create a module object to hold our models, views, and collections
    var Module = {};

    // The base view for this module (extends from /libs/js/superview.js)
    Module.View = BaseView.extend({

      // Make this view a <section> in the DOM
      tagName: 'section',

      // Give it a class of 'page'
      className: 'page',

      // Use the template passed in from the define
      template: {
        name: 'oneTemplate',
        source: oneTemplate
      },

      initialize: function() {

        var oneView = this;

        // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
        // On pageChange, remove this view
        oneView.listenTo(app, 'pageChange', function() {

          oneView.removeAllChildren();
          oneView.remove();

        });

      },

      // After the DOM element is rendered, create our child widgets using app.modules.create from /app/app.js
      postPlace: function() {

        this.addWidgets([
          {
            name: 'MainMenu',
            widget: MainMenu,
            element: '.main-menu'
          },
          {
            name: 'WidgetOne-A',
            widget: WidgetOne,
            element: '.content'
          },
          {
            name: 'WidgetOne-B',
            widget: WidgetOne,
            element: '.content'
          },
          {
            name: 'WidgetOne-C',
            widget: WidgetOne,
            element: '.content'
          }
        ]);

      }

    });

    // Return our module object
    return Module;

  }

);