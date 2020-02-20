import DataDefinition from "./DataDefinition";
import ValueDefinition from "./ValueDefinition";
import DataUtils from './DataUtils';

import {
    DeleteOptions,
    ObjectSetupDefinition,
    SetupDefinition,
    IDataModel
} from "./types/DataModel";
import DefinitionUtils from "./DefinitionUtils";

export default class DataModel implements IDataModel {
    protected name: string;
    protected dataStore;

    private dataDefinition: DataDefinition;
    private ref;

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

    static Array(definition: DataDefinition) {
        return DefinitionUtils.buildModelDefinition('array', definition);
    }

    static Object(definition: ObjectSetupDefinition) {
        return DefinitionUtils.buildModelDefinition(
            'object',
            DefinitionUtils.buildObjectDefinition(definition));
    }

    static Value(definition: SetupDefinition) {
        return DefinitionUtils.buildModelDefinition(
            'value',
            new ValueDefinition(definition)
        );
    }

    private updateArray(value, predicate) {
        if (typeof predicate === 'function') {
            DataUtils.mergeAllMatching(this.ref.val(), value, predicate);
            this.ref.write();
        } else {
            this.ref.push(value);
        }
    }
    
    filter(predicate: (any) => boolean) {
        return DataUtils.refValueToArray(this.val(), this.name)
            .filter(predicate);
    }

    find(predicate: (any) => boolean) {
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

    delete(predicate: (any) => boolean) {
        this.ref.delete({ predicate: predicate });
    }

    val() {
        return this.ref.val();
    }
}