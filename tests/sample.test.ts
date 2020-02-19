import { IDataModel } from '../_project-api/DataModel/types/DataModel';
import SampleCommand from '../app/src/SampleCommand';

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
    filter(){ return []; }
    find(){}
    update(){}
    val(){}
}

describe('Sample Application Command', function () {

    let modelFakes;
    let sampleCommand;

    beforeEach(function() {
        modelFakes = {
            Sample: new SampleModelFake()
        };

        sampleCommand = SampleCommand.build(modelFakes);
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