const path = require('path');
const DataStore = require('../../../_project-api/dataStore');

const dataFilePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '_app-data',
    'datastore.json'
);

export default DataStore.build().init(dataFilePath);