/*global describe:true, expect:true, it:true, sinon:true */
/*jshint expr:true */
define([

    'Message',
    'MessageBus',
    'Router'

], function(Message, MessageBus, Router) {

    'use strict';

    describe('Router', function() {

        describe('#goToPage()', function() {

            it('should fire the pageBeforeChange event with the page argument', function() {

                var router = new Router();
                var requireStub = sinon.stub(window, 'require');
                var triggerStub = sinon.stub(MessageBus, 'trigger');

                router.goToPage('test1');

                expect(triggerStub).to.have.been.calledWith(Message.PageBeforeChange, 'test1');

                requireStub.restore();
                triggerStub.restore();
            });

            it('should fire the pageChange event with the page argument', function() {

                var router = new Router();
                var requireStub = sinon.stub(window, 'require');
                var triggerStub = sinon.stub(MessageBus, 'trigger');

                router.goToPage('test2');

                expect(triggerStub).to.have.been.calledWith(Message.PageBeforeChange, 'test2');

                requireStub.restore();
                triggerStub.restore();
            });

            it('should fire the pageBeforeChange event followed by the pageChange event', function() {

                var router = new Router();
                var requireStub = sinon.stub(window, 'require');
                var triggerStub = sinon.stub(MessageBus, 'trigger');

                router.goToPage('test3');

                expect(triggerStub.withArgs(Message.PageBeforeChange)).to.have.been.calledBefore(triggerStub.withArgs(Message.pageChange));

                requireStub.restore();
                triggerStub.restore();
            });

            it('should require the page module', function() {

                var router = new Router();
                var requireStub = sinon.stub(window, 'require');

                router.goToPage('test-a');

                expect(requireStub).to.have.been.calledWith(['app/pages/test-a/TestAPage']);

                requireStub.restore();
            });
        });
    });
});