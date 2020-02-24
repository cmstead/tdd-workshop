import Dject from "dject/class/ts/Dject";
import { DataModelSet } from "../../types/DataModels";
import ICommand from "../../types/ICommand";

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

export default Dject.prepareExport(SampleCommand);