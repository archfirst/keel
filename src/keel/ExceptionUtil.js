/*!
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
* keel/ExceptionUtil
* This is an Exception Utility intended to be used within Keel
* for alerting implementors about errors such as bad arguments passed to
* Keel methods.
*
* It includes a general FrameworkException constructor. This could be extended
* if necessary to present more specific exceptions if necessary.
*
* @module ExceptionUtil
* @author Bob Holt
**/
define(function() {

    'use strict';

    /**
    * The ExceptionUtil object
    *
    * @class ExceptionUtil
    * @static
    **/
    var ExceptionUtil = {

        /**
        * The general FrameworkException
        *
        * @method FrameworkException
        * @constructor
        * @param {String} message The error message to throw
        **/
        FrameworkException: function FrameworkException(message) {

            // If this wasn't called with the `new` keyword, do it automatically
            if (!(this instanceof FrameworkException)) {
                return new FrameworkException(message);
            }

            /**
            * The error message to throw
            *
            * @property message
            * @type String
            **/
            this.message = message || 'Keel Framework Exception';

            /**
            * The Exception Type is 'FrameworkException'
            *
            * @property name
            * @type String
            **/
            this.name = 'FrameworkException';
        }

    };

    /**
    * FramworkExceptions inherits from the JS Error object
    *
    * @property prototype
    * @type Error
    **/
    ExceptionUtil.FrameworkException.prototype = new Error();

    return ExceptionUtil;

});