import dataConnector from '../data-connector/data-connector';
import DataModel from '../../01_project-api/DataModel/DataModel'
const fs = require('fs');

export default class DataModels {
    private static getModelFileNames(): [string] {
        return fs.readdirSync('./')
            .filter(value =>
                value !== '.'
                && value !== '..'
                && value.match('^index\.(j|t)s$'));
    }

    private static getModelFileSet(): Promise<any>[] {
        return this
        .getModelFileNames()
        .map(fileName =>
            import('./' + fileName)
                .then(DataModel =>
                    new DataModel(dataConnector))
                .catch(() => null));
    }

    public static models(): Promise<DataModel[]> {
        const modelFileSet = this.getModelFileSet()

        return Promise
            .all(modelFileSet)
            .then(modelInstances => {
                return modelInstances
                    .filter(currentModel => currentModel !== null)
                    .reduce((models, currentModel) => {
                        models[currentModel.name] = currentModel;
                        return models;
                    }, {});
            });
    }
}