define(
[

    'MessageBus',

    'BaseView',

    'text!app/pages/one/OneTemplate.html',

    'app/widgets/Mainmenu/MainmenuWidget',

    'app/widgets/Red/RedWidget'

],

function(MessageBus, BaseView, oneTemplate, MainMenuWidget, RedWidget) {
    'use strict';

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

        elements: ['mainmenu', 'content'],

        // After the DOM element is rendered, create our child widgets
        postRender: function() {

            this.addChildren([{
                    name: 'MainMenu',
                    viewClass: MainMenuWidget,
                    parentElement: this.mainmenuElement
                }, {
                    name: 'Red-A',
                    viewClass: RedWidget,
                    parentElement: this.contentElement
                }, {
                    name: 'Red-B',
                    viewClass: RedWidget,
                    parentElement: this.contentElement
                }, {
                    name: 'Red-C',
                    viewClass: RedWidget,
                    parentElement: this.contentElement
                }
            ]);

        }

    });

}

);