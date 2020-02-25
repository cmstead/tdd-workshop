import container from '<%= relativeDepth %>../app/container';

const { assert } = require('chai');

describe('<%= className %>', function () {

    let <%= camelCaseClassName %>;

    beforeEach(function() {
        const testContainer = container.new();

        <%= camelCaseClassName %> = testContainer.build('<%= className %>');
    });

    // It behaves this way when the user does that
    it('then, when, given', function(){
        // arrange (Given)
        // (initial conditions and state)

        // act (When)
        // (execute behavior)

        // assert (Then)
        // (verify outcome)
        assert.isFalse(true);
    });

});