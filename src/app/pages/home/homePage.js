define(
  [

    'app',

    'framework/BaseView',

    'text!pages/home/homeTemplate.html',

    'widgets/mainmenu/mainmenuWidget',

    'widgets/widgetone/widgetoneWidget',

    'widgets/widgettwo/widgettwoWidget',

    'widgets/widgetthree/widgetthreeWidget'

  ],

  function(app, BaseView, homeTemplate, MainMenu, WidgetOne, WidgetTwo, WidgetThree){

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

        name: 'homeTemplate',
        source: homeTemplate

      },

      initialize: function() {

        var homeView = this;

        // Use the Backbone 0.9.9 built-in listenTo to listen to the custom pageChange event
        // On pageChange, remove this view
        homeView.listenTo(app, 'pageChange', function() {

          homeView.removeAllChildren();
          homeView.remove();

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
            name: 'WidgetOne',
            widget: WidgetOne,
            element: '.content'
          },
          {
            name: 'WidgetTwo',
            widget: WidgetTwo,
            element: '.content'
          },
          {
            name: 'WidgetThree',
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