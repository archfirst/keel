define(
[

    'BaseView',

    'app/widgets/Green/GreenViewModel',

    'text!app/widgets/Green/GreenTemplate.html'

],

function(BaseView, ViewModel, greenTemplate) {

    'use strict';

    return BaseView.extend({

        // Set classnames on this widget for styling
        className: 'widget content-widget widget-two',

        // Use the template passed in from the define
        template: {
            name: 'greenTemplate',
            source: greenTemplate
        },

        initialize: function() {

            this.model = new ViewModel();

        }

    });

}

);