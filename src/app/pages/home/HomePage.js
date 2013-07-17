define(
[

    'MessageBus',

    'BaseView',

    'text!app/pages/home/HomeTemplate.html',

    'app/widgets/Mainmenu/MainmenuWidget',

    'app/widgets/Red/RedWidget',

    'app/widgets/Green/GreenWidget',

    'app/widgets/Blue/BlueWidget'

],

function(MessageBus, BaseView, homeTemplate, MainMenuWidget, RedWidget, GreenWidget, BlueWidget) {

    'use strict';

    // The base view for this module (extends from /libs/js/superview.js)
    return BaseView.extend({

        // Make this view a <section> in the DOM
        tagName: 'section',

        // Give it a class of 'page'
        className: 'page',

        // Use the template passed in from the define
        template: {

            name: 'homeTemplate',
            source: homeTemplate

        },

        elements: ['mainmenu', 'content'],

        // After the DOM element is rendered, create our child widgets
        postRender: function() {

            this.addChildren([{
                    name: 'MainMenu',
                    viewClass: MainMenuWidget,
                    parentElement: this.mainmenuElement
                }, {
                    name: 'Red',
                    viewClass: RedWidget,
                    parentElement: this.contentElement
                }, {
                    name: 'Green',
                    viewClass: GreenWidget,
                    parentElement: this.contentElement
                }, {
                    name: 'Blue',
                    viewClass: BlueWidget,
                    parentElement: this.contentElement
                }
            ]);

        }

    });

}

);