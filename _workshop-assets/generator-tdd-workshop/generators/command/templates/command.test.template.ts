import ICommand from '../../app/types/ICommand';

import container from '../../app/container';

const { assert } = require('chai');

describe('<%= commandName %>', function () {

    let <%= camelCaseCommandName %>: ICommand;

    beforeEach(function () {
        const testContainer = container.new();

        <%= camelCaseCommandName %> = testContainer.build('<%= commandName %>');
    });

    // It behaves this way when the user does that
    it('then, when, given', function () {
        // arrange (Given)
        // (initial conditions and state)

        // act (When)
        // (execute behavior)

        // assert (Then)
        // (verify outcome)
        assert.isFalse(true);
    });

});