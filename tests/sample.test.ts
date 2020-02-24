import { IDataModel } from '../_project-api/DataModel/types/DataModel';
import ICommand from '../app/types/ICommand';

import container from '../app/container';

const { assert } = require('chai');
const sinon = require('sinon');

class SampleModelFake implements IDataModel{
    createStub: any;

    constructor() {
        this.createStub = sinon.stub();

        this.create = (...args) => this.createStub(...args);    
    }

    create(){}
    delete(){}
    deleteById(){}
    filter(){ return []; }
    find(){}
    update(){}
    val(){}
}

describe('Sample Application Command', function () {

    let modelFakes;
    let sampleCommand: ICommand;

    beforeEach(function() {
        const testContainer = container.new();

        modelFakes = {
            Sample: new SampleModelFake()
        };

        testContainer.build('Models').setModels(modelFakes);

        sampleCommand = testContainer.build('SampleCommand');
    });

    it('creates a test record when triggered by a user action', function(){
        // arrange
        // (initial conditions and state)
        const cliEnteredValues = ['User input value'];

        // act
        // (execute command)
        sampleCommand.exec(cliEnteredValues);

        // assert
        // (verify outcome)
        const commandResult = modelFakes.Sample.createStub.args[0][0];

        assert.equal(JSON.stringify(commandResult), `{"userInput":"${cliEnteredValues[0]}"}`);
    });

});