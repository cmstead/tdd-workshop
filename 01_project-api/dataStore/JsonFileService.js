function JsonFileService(fs) {
    this.fs = fs;
    this.dataPath = '';
}

function throwOnBadDataPath(fs, dataPath) {
    let filePathIsValid = true;

    try {
        filePathIsValid = fs.lstatSync(dataPath).isFile();
    } catch (e) {
        filePathIsValid = false;
    }

    if (!filePathIsValid) {
        const errorMessage = `Unable to read from '${dataPath}'`;
        throw new Error(errorMessage);
    }
}

JsonFileService.prototype = {
    setPath: function (dataPath) {
        throwOnBadDataPath(this.fs, dataPath);
        this.dataPath = dataPath;
    },

    readFile: function () {
        throwOnBadDataPath(this.fs, this.dataPath);

        const fileContent = this.fs.readFileSync(
            this.dataPath,
            { encoding: 'utf8' }
        );

        try {
            return JSON.parse(fileContent);
        } catch (e) {
            return null;
        }
    },

    writeFile: function (jsonData) {
        throwOnBadDataPath(this.fs, this.dataPath);

        const fileContent = JSON.stringify(jsonData, null, 4);
        this.fs.writeFileSync(this.dataPath, fileContent);
    }
}

function build(options = {}) {
    const { fs } = options;
    const fsModule = typeof fs !== 'object' 
        ? require('fs')
        : fs;

    return new JsonFileService(fsModule);
}

module.exports = {
    build
};