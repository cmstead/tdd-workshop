function DataInterface({
    jsonFileService = null,
    data = null,
    parent = null
}) {
    if (jsonFileService !== null) {
        this.jsonFileService = jsonFileService;
        this.data = jsonFileService.readFile();
    } else {
        this.data = data;
    }

    this.currentRef = null;
    this.parent = parent;
}

DataInterface.prototype = {
    ref: function (dataRef = []) {
        let refKeys = [];
        let newInterface;

        if(typeof dataRef === 'string') {
            refKeys = dataRef.split(/\/+/);
        } else {
            refKeys = dataRef;
        }

        this.currentRef = refKeys.shift();

        if (refKeys.length > 0) {
            if (typeof this.data[this.currentRef] !== 'object' || this.data[this.currentRef] === null) {
                this.data[this.currentRef] = {};
            }

            newInterface = new DataInterface({
                data: this.data[this.currentRef],
                parent: this
            });
        }

        return refKeys.length > 0
            ? newInterface.ref(refKeys)
            : this;
    },

    read: function (key) {
        const currentData = this.val();

        return new DataInterface({
            data: !currentData ? null : currentData[key]
        });
    },

    set: function (data) {
        if(this.currentRef !== null) {
            this.data[this.currentRef] = data;
        } else {
            this.data = data;
        }

        this.write();
    },

    update: function (data) {
        if(typeof this.data === 'object' && this.data !== null) {
            Object.keys(data).forEach((key) => {
                this.data[this.currentRef][key] = data[key];
            });    
        } else {
            this.set(data);
        }

        this.write();
    },

    _createArray: function() {
        if(this.currentRef === null && !Array.isArray(this.data)) {
            this.data = [];
        } else if (!Array.isArray(this.data[this.currentRef])) {
            this.data[this.currentRef] = [];
        }
    },

    _pushValue: function (data) {
        if(this.currentRef === null) {
            this.data.push(data);
        } else {
            this.data[this.currentRef].push(data);
        }
    },

    push: function(data) {
        this._createArray();
        this._pushValue(data);
        
        this.write();
    },

    write: function () {
        if(this.jsonFileService){
            this.jsonFileService.writeFile(this.data);
        } else if(this.parent) {
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