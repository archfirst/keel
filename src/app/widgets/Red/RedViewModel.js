define(
[

    'backbone'

],

function(Backbone) {

    'use strict';

    return Backbone.Model.extend({

        // On initialization, copy the model's cid into the attributes so it remains when templating
        initialize: function() {

            this.set('cid', this.cid);

        }

    });

}

);