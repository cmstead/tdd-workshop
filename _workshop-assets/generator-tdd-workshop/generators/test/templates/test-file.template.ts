import container from '../app/container';

const { assert } = require('chai');

describe('<%= behaviorName %>', function () {

    let behaviorUnderTestName;

    beforeEach(function() {
        const testContainer = container.new();

        behaviorUnderTestName = testContainer.build('behaviorUnderTestName');
    });

    // It behaves this way when the user does that
    it('then, when, given', function(){
        // arrange (Given)
        // (initial conditions and state)

        // act (When)
        // (execute command)

        // assert (Then)
        // (verify outcome)
        assert.isFalse(true);
    });

});