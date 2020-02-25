import DataModelSet from "../../types/DataModelSet";

export default class <%= commandName %> ICommand {
    private modelSet: DataModelSet;

    constructor(modelSet: DataModelSet) {
        this.modelSet = modelSet;
    }

    static build(models: DataModelSet) {
        return new <%= commandName %>(models);
    }
}