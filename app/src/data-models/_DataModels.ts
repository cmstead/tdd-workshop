import ModelLoader from '../../../_project-api/DataModel/ModelLoader'
import { DataModelSet } from '../../../_project-api/DataModel/types/DataModel';

import dataConnector from '../data-connector/data-connector';

export default class DataModels {
    private static modelCache: DataModelSet = null;

    static models(): Promise<DataModelSet> {
        if(this.modelCache !== null) {
            return Promise.resolve(this.modelCache);
        } else {
            return ModelLoader.buildModels(__dirname, dataConnector);
        }
    }
}