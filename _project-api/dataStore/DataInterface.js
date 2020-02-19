function DataInterface({
    jsonFileService = null,
    data = null,
    parent = null
}) {
    this.currentRef = null;
    this.data = data;
    this.jsonFileService = jsonFileService;
    this.parent = parent;

    if (this.jsonFileService !== null && this.data === null) {
        this.data = jsonFileService.readFile();
    }
}

DataInterface.prototype = {
    getCurrentInterface: function () {
        return this.parent !== null
            ? this
            : new DataInterface({
                jsonFileService: this.jsonFileService,
                data: this.data === null ? {} : this.data,
                parent: this
            });
    },

    getRefData: function (currentInterface, currentRef) {
        const dataExists = typeof currentInterface.data[currentRef] === 'object'
            && currentInterface.data[currentRef] !== null;

        return dataExists
            ? currentInterface.data[currentRef]
            : {};
    },

    getRefKeys: function (dataRef) {
        if (typeof dataRef === 'string') {
            return dataRef.split(/\/+/);
        } else {
            return dataRef;
        }
    },

    getNextInterface: function (currentInterface, currentRef) {
        currentInterface.data[currentRef] = this.getRefData(currentInterface, currentRef);

        return new DataInterface({
            data: currentInterface.data[currentRef],
            parent: currentInterface
        });
    },

    ref: function (dataRef = []) {
        const refKeys = this.getRefKeys(dataRef);
        const currentRef = refKeys.shift()

        const currentInterface = this.getCurrentInterface();
        currentInterface.currentRef = currentRef;

        return refKeys.length > 0
            ? this.getNextInterface(currentInterface, currentRef).ref(refKeys)
            : currentInterface;
    },

    read: function (key) {
        const currentData = this.val();

        return new DataInterface({
            data: !currentData ? null : currentData[key]
        });
    },

    _assignValue: function(value) {
        if (this.currentRef !== null) {
            this.data[this.currentRef] = value;
        } else {
            this.data = value;
        }
    },

    _assignValueByKey: function(key, value) {
        if (this.currentRef !== null) {
            this.data[this.currentRef][key] = value;
        } else {
            this.data[key] = value;
        }
    },

    set: function (data) {
        this._assignValue(data);
        this.write();
    },

    update: function (data) {
        if (typeof this.data === 'object' && this.data !== null) {
            Object.keys(data).forEach((key) => {
                this._assignValueByKey(key, data[key]);
            });
        } else {
            this._assignValue(data);
        }
        
        this.write();
    },

    _deleteById: function (id) {
        this._assignValueByKey(id, undefined);
    },

    _removeDeletedItems: function () {
        if(Array.isArray(this.val())){
            const resultArray = this.val()
                .filter(value => typeof value !== 'undefined');

            this._assignValue(resultArray);
        }
    },

    _deleteByPredicate: function (predicate) {
        const value = this.val();

        if (typeof value === 'object' && value !== null) {
            Object
                .entries(this.val())
                .forEach(([key, value]) => {
                    if (predicate(key, value)) {
                        this._deleteById(key);
                    }
                });            
        }
    },

    delete: function ({ id = null, predicate = () => false }) {
        if (id !== null) {
            this._deleteById(id);
        } else {
            this._deleteByPredicate(predicate);
        }

        this.write();
    },

    _createArray: function () {
        this._assignValue([]);
    },

    _pushValue: function (data) {
        if (this.currentRef === null) {
            this.data.push(data);
        } else {
            this.data[this.currentRef].push(data);
        }
    },

    push: function (data) {
        this._createArray();
        this._pushValue(data);

        this.write();
    },

    write: function () {
        this._removeDeletedItems();
        
        if (this.jsonFileService) {
            this.jsonFileService.writeFile(this.data);
        } else if (this.parent) {
            this.parent.write();
        } else {
            throw new Error('Unable to write data.');
        }
    },

    val: function () {
        return this.currentRef !== null
            ? this.data[this.currentRef]
            : this.data;
    }
};

function build({ jsonFileService }) {
    return new DataInterface({ jsonFileService });
}

module.exports = {
    build
};