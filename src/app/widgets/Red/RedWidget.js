define(
[

    'BaseView',

    'app/widgets/Red/RedViewModel',

    'text!app/widgets/Red/RedTemplate.html'

],

function(BaseView, ViewModel, redTemplate) {

    'use strict';

    return BaseView.extend({

        // Set classnames on this widget for styling
        className: 'widget content-widget widget-one',

        // Use the template passed in from the define
        template: {
            name: 'redTemplate',
            source: redTemplate
        },

        initialize: function() {

            this.model = new ViewModel();

        }

    });

}

);