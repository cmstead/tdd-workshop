import container from '../app/container';

const { assert } = require('chai');
const givenWhenThen = require('fluent-gwt').configure();

describe('<%= behaviorName %>', function () {

    let behaviorUnderTestName;

    beforeEach(function() {
        const testContainer = container.new();

        behaviorUnderTestName = testContainer.build('behaviorUnderTestName');
    });

    // It behaves this way when the user does that
    it('then, when, given', function(){
        return givenWhenThen
            .arrange(
                'Initial state and/or event',
                () => null
            )
            .act(
                'Sample command is run with user entered values',
                (arrangementResult) => null
            )
            .assert(
                'Data store receives updated content',
                (actionResult) => assert.isFalse(true)
            );
    });

});
