import { IDataModel } from '../../app/types/DataModels';
import ICommand from '../../app/types/ICommand';

import container from '../../app/container';

const { assert } = require('chai');
const sinon = require('sinon');
const givenWhenThen = require('fluent-gwt').configure();

class SampleModelFake implements IDataModel {
    createStub: any;

    constructor() {
        this.createStub = sinon.stub();

        this.create = (...args) => this.createStub(...args);
    }

    create() { }
    delete() { }
    deleteById() { }
    filter() { return []; }
    find() { }
    update() { }
    val() { }
}

describe('Sample Application Command', function () {

    let modelFakes;
    let sampleCommand: ICommand;

    beforeEach(function () {
        const testContainer = container.new();

        modelFakes = {
            Sample: new SampleModelFake()
        };

        testContainer.build('ModelsService').setModels(modelFakes);

        sampleCommand = testContainer.build('SampleCommand');
    });

    it('creates a test record when triggered by a user action', function () {
        const expectedContentValue = 'User input value';

        return givenWhenThen
            .arrange(
                'User enters expected content value at CLI',
                () => [expectedContentValue]
            )
            .act(
                'Sample command is run with user entered values',
                (userEnteredValues) => sampleCommand.exec(userEnteredValues)
            )
            .assert(
                'Data store receives updated content',
                () => {
                    const commandResult = modelFakes.Sample.createStub.args[0][0];

                    assert.equal(
                        JSON.stringify(commandResult),
                        `{"userInput":"${expectedContentValue}"}`
                    );
                }
            );
    });

});
