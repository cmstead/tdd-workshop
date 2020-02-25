const DataModel = require("datamodel");

module.exports = class <%= modelName %> extends DataModel {
    constructor() {
        super();

        this.name = '<%= modelName %>';

        this.setDataDefinition();
    }
}