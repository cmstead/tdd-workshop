import ModelLoader from './utilities/ModelLoader'

import { DataModelSet } from "../types/DataModels";
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