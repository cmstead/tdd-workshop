import DataModel from '../_project-api/DataModel/DataModel';

export default class App {
    dataModels: DataModel[];

    constructor(dataModels: DataModel[]) {
        this.dataModels = dataModels;
    }

    exec(args) {

    }
}