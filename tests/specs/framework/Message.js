/*global describe:true, expect:true, it:true */
/*jshint expr:true */
define([

    'Message'

], function(Message) {

    'use strict';

    describe('Message', function() {

        it('should be a "plain" object', function() {

            expect(Message).to.be.an('object');

        });

        it('should have framework-required properties that are strings', function() {

            expect(Message.PageBeforeChange).to.be.a('string');
            expect(Message.PageChange).to.be.a('string');

        });

    });
});