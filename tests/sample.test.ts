import SampleCommand from '../app/src/SampleCommand';
import { IDataModel } from '../_project-api/DataModel/types/DataModel';
const { assert } = require('chai');
const sinon = require('sinon');

class SampleFake implements IDataModel{
    createStub: any;

    constructor() {
        this.createStub = sinon.stub();    
    }

    create(...args){
        this.createStub(...args);
    }
    update(){}
    delete(){}
    val(){}
}

describe('Sample Application Command', function () {

    it('creates a test record when triggered by a user action', function () {
        const sampleModelFake = new SampleFake()
        const sampleCommand = new SampleCommand({ Sample: sampleModelFake });
        const userInputValues = ['User input value'];

        sampleCommand.exec(userInputValues);

        const commandResult = sampleModelFake.createStub.args[0][0];

        assert.equal(JSON.stringify(commandResult), `{"test":"${userInputValues[0]}"}`);
    });

});