import ModelLoader from '../../_project-api/DataModel/ModelLoader'
import DataModel from '../../_project-api/DataModel/DataModel';

import dataConnector from '../data-connector/data-connector';

export default class DataModels {
    private static modelCache: DataModel[] = null;

    static models(): Promise<DataModel[]> {
        if(this.modelCache !== null) {
            return Promise.resolve(this.modelCache);
        } else {
            return ModelLoader.buildModels(__dirname, dataConnector);
        }
    }
}