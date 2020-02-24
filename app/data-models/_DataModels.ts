import { DataModelSet } from "../types/DataModels";
import ModelLoader from '../../_project-api/DataModel/ModelLoader'

import dataConnector from './data-connector/data-connector';

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