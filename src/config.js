/*jshint unused:false */

// Set the require.js configuration for the application.
// Doing this in main.js ensures it loads before any other scripts are required in
var require = {

  // Initialize the application with the this file.
  deps: ['main'],

  paths: {

    // jQuery
    jquery:     '../vendor/jquery.min',

    // Underscore/Lodash
    underscore: '../vendor/lodash.underscore.min',

    // Backbone
    backbone:   '../vendor/backbone.min',

    // Framework
    BaseView:   '../framework/BaseView',
    Message:    '../framework/Message',
    MessageBus: '../framework/MessageBus',
    Repository: '../framework/Repository',
    Router:     '../framework/Router'

  },

  // Shim those modules that are not set up for AMD
  // http://requirejs.org/docs/api.html#config-shim
  shim: {

    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    underscore: {
      exports: '_'
    }

  }

};