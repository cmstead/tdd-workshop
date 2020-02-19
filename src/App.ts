import { DataModelSet } from "../_project-api/DataModel/types/DataModel";

export default class App {
    private models: DataModelSet;

    constructor(models: DataModelSet) {
        this.models = models;
    }

    exec(args = []) {
        if (args[0] === 'test') {
            this.models.Sample.create({ test: 'foo' });
        }
    }
}