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

  function NotImplementedException(message) {
    this.message = message;
    this.name = 'NotImplementedException';
  }

  NotImplementedException.prototype = new Error();
  NotImplementedException.prototype.constructor = NotImplementedException;


  return {

    // Not implementing this would make sense, but it is used in the following case:
    // myView.listenTo(MessageBus, 'event', callback);
    // The MessageBus's on() method is used behind the scenes.
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

    // listenTo needs to be implemented by the View
    // This allows the View to unbind automatically when it is removed
    // MessageBus.listenTo would not provide this and should not be used
    listenTo: function() {
      throw new NotImplementedException('Not Implemented: ' +
        'listenTo should be implemented by the View object: ' +
        'myView.listenTo(MessageBus, \'event\', callback); ');
    },

    // stopListening needs to be implemented by the View
    // This removes the events from listenTo.
    // That is not implemented on the global MessageBus, so neither is this.
    stopListening: function() {
      throw new NotImplementedException('Not Implemented: ' +
        'stopListening should be implemented by the View object: ' +
        'myView.stopListening(MessageBus, \'event\', callback); ');
    }

  };

});