import DataModelSet from "../data-models/types/DataModelSet";

module.exports = class <%= commandName %> {
    private modelSet: DataModelSet;

    constructor(modelSet: DataModelSet) {
        this.modelSet = modelSet;
    }

    static build(models: DataModelSet) {
        return new <%= commandName %>(models);
    }
}