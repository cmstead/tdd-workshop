import ICommand from "../../types/ICommand";

const Dject = require('dject/class/utilities/Dject');

class <%= commandName %> implements ICommand {
    
    constructor(dependencyMap: any) {

    }

    exec(userInput = []) {

    }

    static build(dependencies: any[]) {
        return Dject.build(SampleCommand, dependencies);
    }
}

export default Dject.prepareExport(SampleCommand);