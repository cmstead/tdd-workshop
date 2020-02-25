const ValueDefinition = require("./ValueDefinition");;
const DataUtils = require('./DataUtils');;
const DefinitionUtils = require("./DefinitionUtils");;

module.exports = class DataModel {
    name;
    dataStore;

    dataDefinition;
    ref;

    constructor() {
        
    }

    init() {
        if (!(this.dataDefinition)) {
            throw new Error(`Cannot initialize ${this.name} model without a data definition.`);
        }

        this.ref = this.dataStore.ref(this.name.toLowerCase());
    }

    setDataDefinition(dataDefinition) {
        this.dataDefinition = dataDefinition;
        return this;
    }

    setDataConnector(dataConnector) {
        this.dataStore = dataConnector;
    }

    static Array(definition) {
        return DefinitionUtils.buildModelDefinition('array', definition);
    }

    static Object(definition) {
        return DefinitionUtils.buildModelDefinition(
            'object',
            DefinitionUtils.buildObjectDefinition(definition));
    }

    static Value(definition) {
        return DefinitionUtils.buildModelDefinition(
            'value',
            new ValueDefinition(definition)
        );
    }

    updateArray(value, predicate) {
        if (typeof predicate === 'function') {
            DataUtils.mergeAllMatching(this.ref.val(), value, predicate);
            this.ref.write();
        } else {
            this.ref.push(value);
        }
    }
    
    filter(predicate) {
        return DataUtils.refValueToArray(this.val(), this.name)
            .filter(predicate);
    }

    find(predicate) {
        return DataUtils.refValueToArray(this.val(), this.name)
            .find(predicate);
    }

    create(value) {
        this.dataDefinition.validate(value);

        if (this.dataDefinition.isDefinitionOf('array')) {
            this.ref.set([value]);
        } else {
            this.ref.set(value);
        }
    }

    update(value, predicate = null) {
        this.dataDefinition.validate(value);

        if (this.dataDefinition.isDefinitionOf('array')) {
            this.updateArray(value, predicate);
        } else if (this.dataDefinition.isDefinitionOf('object')) {
            this.ref.update(value);
        } else {
            this.ref.set(value);
        }
    }

    deleteById(id) {
        this.ref.delete({ id: id });
    }

    delete(predicate) {
        this.ref.delete({ predicate: predicate });
    }

    val() {
        return this.ref.val();
    }
}