import ICommand from '../../app/types/ICommand';

import container from '../../app/container';

const { assert } = require('chai');
const gwt = require('fluent-gwt').configure();

describe('<%= commandName %>', function () {

    let <%= camelCaseCommandName %>: ICommand;

    beforeEach(function () {
        const testContainer = container.new();

        <%= camelCaseCommandName %> = testContainer.build('<%= commandName %>');
    });

    // It behaves this way when the user does that
    it('then, when, given', function () {
        return gwt
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