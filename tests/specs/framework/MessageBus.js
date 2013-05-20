/*global describe:true, expect:true, it:true, sinon:true */
/*jshint expr:true */
define([

    'MessageBus'

], function(MessageBus) {
    'use strict';

    describe('MessageBus', function() {

        describe('#on()', function() {

            it('should fire a callback when its event is called', function() {

                var spy = sinon.spy();

                MessageBus.on('triggeredEvent', spy);

                MessageBus.trigger('triggeredEvent');

                expect(spy).to.have.been.called;

            });

            it('should fire the callback each time it is called', function() {

                var spy = sinon.spy();

                MessageBus.on('triggeredEvent', spy);

                MessageBus.trigger('triggeredEvent');
                MessageBus.trigger('triggeredEvent');
                MessageBus.trigger('triggeredEvent');

                expect(spy).to.have.been.calledThrice;

            });

        });

        describe('#off()', function() {

            it('should prevent the callback from firing after it is called', function() {

                var spy = sinon.spy();

                MessageBus.on('triggeredEvent', spy);

                MessageBus.trigger('triggeredEvent');

                MessageBus.off('triggeredEvent');

                MessageBus.trigger('triggeredEvent');
                MessageBus.trigger('triggeredEvent');

                expect(spy).to.have.been.calledOnce;

            });

        });

        describe('#trigger()', function() {

            it('should trigger callbacks attached to listeners', function() {

                var spy = sinon.spy();

                MessageBus.on('triggeredEvent', spy);

                MessageBus.trigger('triggeredEvent');

                expect(spy).to.have.been.called;

            });

        });

        describe('#once()', function() {

            it('should throw an exception', function() {

                expect(MessageBus.listenTo).to.
                throw (/Not Implemented/);

            });

        });

        describe('#listenTo()', function() {

            it('should throw an exception', function() {

                expect(MessageBus.listenTo).to.
                throw (/Not Implemented/);

            });

        });

        describe('#stopListening()', function() {

            it('should throw an exception', function() {

                expect(MessageBus.listenTo).to.
                throw (/Not Implemented/);

            });

        });

    });

});