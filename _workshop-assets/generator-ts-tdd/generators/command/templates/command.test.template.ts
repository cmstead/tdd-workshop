import <%= commandName %> from '../app/src/<%= commandName %>';

const { assert } = require('chai');
const sinon = require('sinon');

describe('<%= commandName %>', function () {

    let modelFakes;
    let <%= camelCaseCommandName %>;

    beforeEach(function() {
        modelFakes = {};

        <%= camelCaseCommandName %> = <%= commandName %>.build(modelFakes);
    });

    it('fails to ensure it is included in test suite', function(){
        // arrange
        // (initial conditions and state)

        // act
        // (execute command)

        // assert
        // (verify outcome)
        assert.isFalse(true);
    });

});