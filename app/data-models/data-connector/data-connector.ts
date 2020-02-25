const path = require('path');
const DataStore = require('datastore');

const dataFilePath = path.join(
    __dirname,
    '..',
    '..',
    '..',
    '_app-data',
    'datastore.json'
);

export default DataStore.build().init(dataFilePath);