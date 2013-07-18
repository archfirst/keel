define(
[

    'MessageBus',

    'BaseView',

    'text!app/pages/three/ThreeTemplate.html',

    'app/widgets/Mainmenu/MainmenuWidget',

    'app/widgets/Blue/BlueWidget'

],

function(MessageBus, BaseView, threeTemplate, MainMenuWidget, BlueWidget) {
    'use strict';

    return BaseView.extend({

        // Make this view a <section> in the DOM
        tagName: 'section',

        // Give it a class of 'page'
        className: 'page',

        // Use the template passed in from the define
        template: {
            name: 'threeTemplate',
            source: threeTemplate
        },

        elements: ['mainmenu', 'content'],

        // After the DOM element is rendered, create our child widgets
        postRender: function() {

            this.addChildren([{
                    name: 'MainMenu',
                    viewClass: MainMenuWidget,
                    parentElement: this.mainmenuElement
                }, {
                    name: 'Blue-A',
                    viewClass: BlueWidget,
                    parentElement: this.contentElement
                }, {
                    name: 'Blue-B',
                    viewClass: BlueWidget,
                    parentElement: this.contentElement
                }, {
                    name: 'Blue-C',
                    viewClass: BlueWidget,
                    parentElement: this.contentElement
                }
            ]);

        }

    });

}

);