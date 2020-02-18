const DataInterface = require('./DataInterface');

function DataStore(jsonFileService) {
    this.jsonFileService = jsonFileService;
}

DataStore.prototype = {
    init: function (filePath) {
        this.jsonFileService.setPath(filePath);
        
        return DataInterface.build({ jsonFileService: this.jsonFileService });
    }
};

function build(options = {}) {
    const { jsonFileService } = options;
    const jsonFileServiceModule = typeof jsonFileService !== 'object'
        ? require('./JsonFileService').build(options)
        : jsonFileService;

    return new DataStore(jsonFileServiceModule);
}

module.exports = {
    build
};