define(
  [

    'MessageBus',

    'BaseView',

    'text!pages/three/threeTemplate.html',

    'widgets/mainmenu/MainmenuView',

    'widgets/blue/BlueView'

  ],

  function(MessageBus, BaseView, threeTemplate, MainMenuView, BlueView){

    return BaseView.extend({

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
            widget: MainMenuView,
            element: '.main-menu'
          },
          {
            name: 'Blue-A',
            widget: BlueView,
            element: '.content'
          },
          {
            name: 'Blue-B',
            widget: BlueView,
            element: '.content'
          },
          {
            name: 'Blue-C',
            widget: BlueView,
            element: '.content'
          }
        ]);

      }

    });

  }

);