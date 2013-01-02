define(
  [

    'app',

    'framework/BaseView',

    'text!pages/two/twoTemplate.html',

    'widgets/mainmenu/mainmenuWidget',

    'widgets/widgettwo/widgettwoWidget'

  ],

  function(app, BaseView, twoTemplate, MainMenu, WidgetTwo){

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
        name: "twoTemplate",
        source: twoTemplate
      },

      initialize: function() {

        var twoView = this;

        // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
        // On pageChange, remove this view
        twoView.listenTo(app, 'pageChange', function() {

          twoView.removeAllChildren();
          twoView.remove();

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
            name: 'WidgetTwo-A',
            widget: WidgetTwo,
            element: '.content'
          },
          {
            name: 'WidgetTwo-B',
            widget: WidgetTwo,
            element: '.content'
          },
          {
            name: 'WidgetTwo-C',
            widget: WidgetTwo,
            element: '.content'
          }
        ]);

      }

    });

    // Return our module object
    return Module;

  }

);