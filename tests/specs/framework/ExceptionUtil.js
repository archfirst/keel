/*global describe:true, expect:true, it:true */
/*jshint expr:true */
define([

    'ExceptionUtil'

], function(ExceptionUtil) {
    'use strict';

    describe('ExceptionUtil', function() {

        describe('#FrameworkException()', function() {

            it('should create a new Framework Exception when invoked with the `new` keyword', function() {

                var exception = new ExceptionUtil.FrameworkException('this is a test message');

                expect(exception).to.be.an.instanceof(ExceptionUtil.FrameworkException);

            });

            it('should have the message passed as an argument', function() {

                var exception = new ExceptionUtil.FrameworkException('this is a test message 1234');

                expect(exception.message).to.eql('this is a test message 1234');

            });

            it('should be an Error', function() {

                var exception = new ExceptionUtil.FrameworkException('test');

                expect(exception).to.be.an.instanceof(Error);

            });

            it('should construct itself if called without the `new` keyword', function() {

                var exception = ExceptionUtil.FrameworkException('this is a test message');

                expect(exception).to.be.an.instanceof(ExceptionUtil.FrameworkException);

            });

            it('should create a general Framework Exception if called without a message', function() {

                var exception = new ExceptionUtil.FrameworkException();

                expect(exception.message).to.eql('Keel Framework Exception');

            });

        });

    });

});