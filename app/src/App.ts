import { DataModelSet } from "../../_project-api/DataModel/types/DataModel";
import DataModels from './data-models/_DataModels';

export default class App {
    private modelSet: DataModelSet;

    constructor(modelSet: DataModelSet) {
        this.modelSet = modelSet;
    }

    exec(args = []) {
        if (args[0] === 'test') {
            this.modelSet.Sample.create({ test: 'foo' });
        }
    }

    static build({ models = null }) {
        if (models === null) {
            return DataModels.models()
                .then((modelSet) => new App(modelSet));
        } else {
            return Promise.resolve(new App(models))
        }
    }
}