import { DataModelSet } from "../../types/DataModels";
import ICommand from "../../types/ICommand";

const Dject = require('dject/class/utilities/Dject');

class SampleCommand implements ICommand {
    public static '@dependencies' = [
        'Models'
    ]
    
    private modelSet: DataModelSet

    constructor(dependencyMap: any) {
        this.modelSet = dependencyMap.Models.getModels()
    }

    exec(userInput = []) {
        this.modelSet.Sample.create({
            userInput: userInput.join(' ')
        });
    }

    static build(dependencies: any[]) {
        return Dject.build(SampleCommand, dependencies);
    }
}

module.exports = Dject.prepareExport(SampleCommand);