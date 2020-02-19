import { DataModelSet } from './types/DataModel';

const fs = require('fs');
const path = require('path');

export default class DataModels {
    private static getModelFileNames(basePath): [string] {
        return fs.readdirSync(basePath)
            .filter(value =>
                value !== '.'
                && value !== '..'
                && !value.match(/^_DataModels\..+$/));
    }

    private static getModelFileSet(basePath): Promise<any>[] {
        const modelFileNames = this
            .getModelFileNames(basePath);

        return modelFileNames
            .map(fileName =>
                import(path.join(
                    basePath,
                    fileName
                )));
    }

    static buildModels(basePath, dataConnector): Promise<DataModelSet> {
        const modelFileSet = this.getModelFileSet(basePath)

        return Promise
            .all(modelFileSet)
            .then(modelInstances => {
                return modelInstances
                    .filter(currentModel => currentModel !== null)
                    .map(currentModel => currentModel.default)
                    .reduce((models, currentModel) => {
                        const newModel = new currentModel();
                        newModel.setDataConnector(dataConnector);
                        newModel.init();

                        models[currentModel.name] = newModel;
                        return models;
                    }, {});
            });
    }
}