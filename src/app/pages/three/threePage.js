define(
  [

    'app',

    'framework/BaseView',

    'text!pages/three/threeTemplate.html',

    'widgets/mainmenu/mainmenuWidget',

    'widgets/widgetthree/widgetthreeWidget'

  ],

  function(app, BaseView, threeTemplate, MainMenu, WidgetThree){

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
        name: "threeTemplate",
        source: threeTemplate
      },

      initialize: function() {

        var threeView = this;

        // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
        // On pageChange, remove this view
        threeView.listenTo(app, 'pageChange', function() {

          threeView.removeAllChildren();
          threeView.remove();

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
            name: 'WidgetThree-A',
            widget: WidgetThree,
            element: '.content'
          },
          {
            name: 'WidgetThree-B',
            widget: WidgetThree,
            element: '.content'
          },
          {
            name: 'WidgetThree-C',
            widget: WidgetThree,
            element: '.content'
          }
        ]);

      }

    });

    // Return our module object
    return Module;

  }

);