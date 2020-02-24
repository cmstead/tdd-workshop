import IDjectExport from 'dject/class/ts/IDjectExport';
import Dject from 'dject/class/ts/Dject';

import { DataModelSet } from '../types/DataModels';

class Models extends Dject {
    public static '@singleton' = true
    private models: DataModelSet

    constructor() {
        super();
    }

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

const modelsExport: IDjectExport = Dject.prepareExport(Models);

export default modelsExport;
export type DataModels = Models