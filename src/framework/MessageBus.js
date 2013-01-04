/**
 * Copyright 2012 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * bullsfirst/framework/MessageBus
 *
 * Provides the ability to publish and subscribe to messages.
 *
 * @author Naresh Bhatia
 */
 define([

 'backbone',

 'underscore'

],

function(Backbone, _) {

  'use strict';

  var _messageBus = _.extend({}, Backbone.Events);

  return {

    on: function(events, callback, context) {
      _messageBus.on(events, callback, context);
    },

    off: function(events, callback, context) {
      _messageBus.off(events, callback, context);
    },

    trigger: function( /* events, [*args] */ ) {
      _messageBus.trigger.apply(_messageBus, arguments);
    },

    once: function(events, callback, context) {
      _messageBus.once(events, callback, context);
    },

    listenTo: function(other, events, callback) {
      _messageBus.listenTo(other, events, callback);
    },

    stopListening: function(other, events, callback) {
      _messageBus.stopListening(other, events, callback);
    }

  };

});