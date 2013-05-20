define(
[

    'BaseView',

    'text!app/widgets/Mainmenu/MainmenuTemplate.html'

],

function(BaseView, mainmenuTemplate) {

    'use strict';

    return BaseView.extend({

        // Make this view a <ul> in the DOM
        tagName: 'ul',

        // Set classname on this widget for styling
        className: 'widget',

        // Use the template passed in from the define
        template: {
            name: 'MainMenuTemplate',
            source: mainmenuTemplate
        }

    });

}

);