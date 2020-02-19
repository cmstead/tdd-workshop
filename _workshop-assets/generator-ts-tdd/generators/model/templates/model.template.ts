import DataModel from "../../_project-api/DataModel/DataModel";

export default class <%= modelName %> extends DataModel {
    constructor() {
        super();

        this.name = '<%= modelName %>';

        this.setDataDefinition();
    }
}