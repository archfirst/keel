/*!
* Copyright 2013 Archfirst
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
* keel/MessageBus
*
* Provides the ability to publish and subscribe to messages.
*
* @module MessageBus
* @requires ExceptionUtil, Backbone, Underscore
* @author Naresh Bhatia
* @author Bob Holt
**/
define([

    'ExceptionUtil',

    'backbone',
    'underscore'
],

function(ExceptionUtil, Backbone, _) {

    'use strict';

    var _messageBus = _.extend({}, Backbone.Events);

    /**
    * The MessageBus object
    *
    * @class MessageBus
    * @static
    **/
    var MessageBus = {

        /**
        * Binds callbacks to events on an object
        *
        * @method on
        * @deprecated `listenTo` and `stopListening` should be used instead of `on` and `off`
        * @param {String} events A space-delimited list of events to listen to
        * @param {Function} callback The callback to invoke when the event(s) is fired
        * @param {Object} [context] The context in which to invoke the callback
        **/
        on: function(events, callback, context) {

            // Not implementing `on()` here would be preferable, but it is used implicitly by `listenTo()`
            // myView.listenTo(MessageBus, 'event', callback);
            // In this case, `myView` calls `MessageBus.on()`, and keeps a reference to it for later cleanup
            _messageBus.on(events, callback, context);
        },

        /**
        * Unbinds callbacks from events on an object
        *
        * @method off
        * @deprecated `listenTo` and `stopListening` should be used instead of `on` and `off`
        * @param {String} [events='all'] A space-delimited list of events to remove from the object
        * @param {Function} [callback] The callback to remove from the event/object combination
        * @param {Object} [context] The context from which to remove the callback
        **/
        off: function(events, callback, context) {
            _messageBus.off(events, callback, context);
        },

        /**
        * Trigger callbacks on a particular event
        *
        * @method trigger
        * @param {String} event The event to trigger
        **/
        trigger: function( /* event, [*args] */ ) {
            _messageBus.trigger.apply(_messageBus, arguments);
        },

        /**
        * Binds a callback using `on`, which is removed the first time it is triggered
        *
        * @method once
        * @deprecated It is preferable to use `listenTo` and manually stop listening as part of the callback
        * @param {String} event The event to attach to the object
        * @param {Function} callback The callback to fire when the event is triggered
        * @param {Object} context The context in which to fire the callback
        **/
        once: function(/* event, callback, context */) {
            throw new ExceptionUtil.FrameworkException('Not Implemented: ' +
                'once can create zombie views if the event is never called. ' +
                'Use listenTo and stopListening in the callback instead' );
        },

        /**
        * listenTo needs to be implemented by the View
        * This allows the View to unbind automatically when it is removed
        * MessageBus.listenTo would not provide this and should not be used
        **/
        listenTo: function() {
            throw new ExceptionUtil.FrameworkException('Not Implemented: ' +
                'listenTo should be implemented by the View object: ' +
                'myView.listenTo(MessageBus, \'event\', callback); ');
        },

        /**
        * stopListening needs to be implemented by the View
        * This removes the events from listenTo.
        * That is not implemented on the global MessageBus, so neither is this.
        **/
        stopListening: function() {
            throw new ExceptionUtil.FrameworkException('Not Implemented: ' +
                'stopListening should be implemented by the View object: ' +
                'myView.stopListening(MessageBus, \'event\', callback); ');
        }

    };

    return MessageBus;
});