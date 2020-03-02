const Dject = require('dject/class/utilities/Dject');

class <%= className %> {
    public static '@dependencies' = []
    
    constructor(dependencyMap: any) {

    }

    static build(dependencies: any[]) {
        return Dject.build(<%= className %>, dependencies);
    }
}

export default Dject.prepareExport(<%= className %>);