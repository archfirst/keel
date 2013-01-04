define(
  [

    'BaseView',

    'widgets/blue/BlueViewModel',

    'text!widgets/blue/blueTemplate.html'

  ],

  function(BaseView, ViewModel, blueTemplate){

    'use strict';

    return BaseView.extend({

      // Set classnames on this widget for styling
      className: 'widget content-widget widget-three',

      // Use the template passed in from the define
      template: {
        name: 'blueTemplate',
        source: blueTemplate
      },

      initialize: function() {

        this.model = new ViewModel();

      }

    });

  }

);