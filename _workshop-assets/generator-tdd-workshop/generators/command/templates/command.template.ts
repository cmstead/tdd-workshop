import ICommand from "../../types/ICommand";

const Dject = require('dject/class/utilities/Dject');

class <%= commandName %> implements ICommand {
    public static '@dependencies' = []
    
    constructor(dependencyMap: any) {

    }

    exec(userInput = []) {

    }

    static build(dependencies: any[]) {
        return Dject.build(<%= commandName %>, dependencies);
    }
}

export default Dject.prepareExport(<%= commandName %>);