import DataModel from "../../_project-api/DataModel/DataModel";

module.exports = class <%= modelName %> extends DataModel {
    constructor() {
        super();

        this.name = '<%= modelName %>';

        this.setDataDefinition();
    }
}