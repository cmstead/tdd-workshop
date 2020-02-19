import DataModelSet from "./data-models/types/DataModelSet";

export default class SampleCommand {
    private modelSet: DataModelSet;

    constructor(modelSet: DataModelSet) {
        this.modelSet = modelSet;
    }

    exec(args = []) {
        this.modelSet.Sample.create({ test: 'foo' });
        console.log('It ran!', this.modelSet.Sample.val());
    }

    static build(models: DataModelSet) {
        return new SampleCommand(models);
    }
}