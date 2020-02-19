import DataModelSet from "../data-models/types/DataModelSet";

export default class SampleCommand {
    private modelSet: DataModelSet;

    constructor(modelSet: DataModelSet) {
        this.modelSet = modelSet;
    }

    exec(userInput = []) {
        this.modelSet.Sample.create({
            userInput: userInput.join(' ')
        });
    }

    static build(models: DataModelSet) {
        return new SampleCommand(models);
    }
}