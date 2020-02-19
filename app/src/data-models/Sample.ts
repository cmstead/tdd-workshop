import DataModel from "./types/DataModel";

export default class Sample extends DataModel {
    constructor() {
        super();

        this.name = 'Sample';

        this.setDataDefinition(
            DataModel.Object({
                test: {
                    type: 'string'
                }
            })
        );
    }
}