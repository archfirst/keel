/*global describe:true, expect:true, it:true */
/*jshint expr:true, es5:true */
define([

  'app'

], function(app) {
  'use strict';

  describe('app', function() {

    describe('#start()', function() {

      var startedApp = app.start();

      it('should start Backbone History', function() {

        expect(Backbone.History.started, 'Backbone.History.started').to.be.true;

      });

      it('should return itself', function() {

        expect(startedApp).to.equal(app);

      });

    });

    describe('#getRelativeURI()', function() {

      it('should return page of the URI if relative', function() {

        var returnedURI = '';

        var root = location.protocol + '//' + location.host + app.appRoot;
        var page = 'test';
        var href = root + page;

        var $a = $('<a href="' + href + '" />');

        $a.on('click', function(e) {

          returnedURI = app.getRelativeURI.call(app, e);

        });

        $a.click();

        expect(returnedURI).to.equal(page);

      });

      it('should return false if on a different domain', function() {

        var returnedURI = '';

        var href = 'http://www.otherdomain.com/test';

        var $a = $('<a href="' + href + '" />');

        $a.on('click', function(e) {

          returnedURI = app.getRelativeURI.call(app, e);

        });

        $a.click();

        expect(returnedURI).to.not.be.true;

      });

    });

  });

});