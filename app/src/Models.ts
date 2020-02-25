import { DataModelSet } from '../types/DataModels';

const Dject = require('dject/class/utilities/Dject');

class Models {
    public static '@singleton' = true
    private models: DataModelSet

    setModels(models: DataModelSet) {
        if (typeof this.models !== 'undefined') {
            throw new Error('Cannot set models more than once.');
        }

        this.models = models;
    }

    getModels(): DataModelSet {
        return this.models;
    }

    public static build(dependencies) {
        return Dject.build(Models, dependencies);
    }
}

export default Dject.prepareExport(Models);