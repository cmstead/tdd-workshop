import module0 from '../app/src/CommandCLIRegistry';
import module1 from '../app/src/commands/SampleCommand';
import module2 from '../app/src/ModelsService';


const dject = require('dject');
const container = dject.new({});


container.copyProps(module0.value, module0);
container.register(module0.value, module0.name);

container.copyProps(module1.value, module1);
container.register(module1.value, module1.name);

container.copyProps(module2.value, module2);
container.register(module2.value, module2.name);


export default container;