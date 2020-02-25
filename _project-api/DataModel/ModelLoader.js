const fs = require('fs');
const path = require('path');

module.exports = class DataModels {
    static isFile(filePath) {
        try{
            return fs.lstatSync(filePath).isFile();
        } catch (e) {
            return false;
        }
    }

    static getModelFileNames(basePath) {
        return fs.readdirSync(basePath)
            .filter(value =>
                value !== '.'
                && value !== '..'
                && !value.match(/^_.*$/)
                && this.isFile(path.join(basePath, value)));
    }

    static getModelFileSet(basePath) {
        const modelFileNames = this
            .getModelFileNames(basePath);

        return modelFileNames
            .map(fileName =>
                import(path.join(
                    basePath,
                    fileName
                )));
    }

    static buildModels(basePath, dataConnector) {
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