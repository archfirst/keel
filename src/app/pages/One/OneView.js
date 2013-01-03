define(
  [

    'MessageBus',

    'BaseView',

    'text!pages/one/oneTemplate.html',

    'widgets/mainmenu/MainmenuView',

    'widgets/red/RedView'

  ],

  function(MessageBus, BaseView, oneTemplate, MainMenuView, RedView){

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
      postPlace: function() {

        this.addWidgets([
          {
            name: 'MainMenu',
            widget: MainMenuView,
            element: '.main-menu'
          },
          {
            name: 'Red-A',
            widget: RedView,
            element: '.content'
          },
          {
            name: 'Red-B',
            widget: RedView,
            element: '.content'
          },
          {
            name: 'Red-C',
            widget: RedView,
            element: '.content'
          }
        ]);

      }

    });

  }

);