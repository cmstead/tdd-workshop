const Dject = require('dject/class/utilities/Dject');

class <%= className %> {
    constructor(dependencyMap: any) {

    }

    static build(dependencies: any[]) {
        return Dject.build(SampleCommand, dependencies);
    }
}

export default Dject.prepareExport(SampleCommand);