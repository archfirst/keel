define(
[

    'MessageBus',

    'BaseView',

    'text!app/pages/two/TwoTemplate.html',

    'app/widgets/Mainmenu/MainmenuWidget',

    'app/widgets/Green/GreenWidget'

],

function(MessageBus, BaseView, twoTemplate, MainMenuWidget, GreenWidget) {
    'use strict';

    return BaseView.extend({

        // Make this view a <section> in the DOM
        tagName: 'section',

        // Give it a class of 'page'
        className: 'page',

        // Use the template passed in from the define
        template: {
            name: 'twoTemplate',
            source: twoTemplate
        },

        elements: ['mainmenu', 'content'],

        // After the DOM element is rendered, create our child widgets
        postRender: function() {

            this.addChildren([{
                    name: 'MainMenu',
                    viewClass: MainMenuWidget,
                    parentElement: this.mainmenuElement
                }, {
                    name: 'Green-A',
                    viewClass: GreenWidget,
                    parentElement: this.contentElement
                }, {
                    name: 'Green-B',
                    viewClass: GreenWidget,
                    parentElement: this.contentElement
                }, {
                    name: 'Green-C',
                    viewClass: GreenWidget,
                    parentElement: this.contentElement
                }
            ]);

        }

    });

}

);