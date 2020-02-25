import container from '../app/container';

const { assert } = require('chai');

describe('<%= behaviorName %>', function () {

    let behaviorUnderTestName;

    beforeEach(function() {
        const testContainer = container.new();

        behaviorUnderTestName = testContainer.build('behaviorUnderTestName');
    });

    it('fails intentionally, to ensure it is included in test suite', function(){
        // arrange
        // (initial conditions and state)

        // act
        // (execute command)

        // assert
        // (verify outcome)
        assert.isFalse(true);
    });

});