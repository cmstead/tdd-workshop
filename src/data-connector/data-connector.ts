const path = require('path');
const DataStore = require('../../01_project-api/dataStore');

const dataFilePath = path.join(
    __dirname,
    '..',
    '..',
    'system-data'
);

export default DataStore.build().init(dataFilePath);