import DataModel from "./local/DataModel";

export default class Sample extends DataModel {
    constructor() {
        super();

        this.name = 'Sample';

        this.setDataDefinition(
            DataModel.Object({
                userInput: {
                    type: 'string'
                }
            })
        );
    }
}