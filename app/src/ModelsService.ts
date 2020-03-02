import { DataModelSet } from '../types/DataModels';

const Dject = require('dject/class/utilities/Dject');

class ModelsService {
    public static '@singleton' = true
    public static '@dependencies' = [];

    private models: DataModelSet

    setModels(models: DataModelSet) {
        this.models = models;
    }

    getModels(): DataModelSet {
        return this.models;
    }

    public static build(dependencies) {
        return Dject.build(ModelsService, dependencies);
    }
}

export default Dject.prepareExport(ModelsService);
