/*global require:true, mocha:true */
/*jshint unused:false */
require.baseUrl = '../src/app';

mocha.setup('bdd');

var runMocha = function() {
  'use strict';
  mocha.run();
};