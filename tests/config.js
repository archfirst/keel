/*global mocha:true */
/*jshint unused:false */

// Set the baseUrl relative to the test runner
require.baseUrl = '../src';

// Null out deps so that it doesn't automatically start the application
require.deps = null;

mocha.setup('bdd');

var runMocha = function() {
    'use strict';
    mocha.run().globals(['jQuery*']);
};