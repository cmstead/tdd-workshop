import DataDefinition from "./DataDefinition";
import ValueDefinition from "./ValueDefinition";

declare interface SetupDefinition {
    type: string,
    validate?: (any) => boolean
}

export default class DataModel {
    readonly name: string;

    private dataDefinition: DataDefinition;
    private dataStore;
    private ref;

    constructor(dataDefinition: DataDefinition) {
        this.ref = this.dataStore.ref(this.name);
        this.dataDefinition = dataDefinition;
    }

    static Array(definition: DataDefinition) {
        return new DataDefinition({
            type: 'array',
            definition: definition
        });
    }


    static Object(definition: SetupDefinition) {
        return new DataDefinition({
            type: 'object',
            definition: this.buildObjectDefinition(definition)
        });
    }

    static Value(definition: SetupDefinition) {
        return new DataDefinition({
            type: 'value',
            definition: new ValueDefinition(definition)
        });
    }

    private static buildObjectDefinition(definition) {
        return Object
            .entries(definition)
            .reduce((result, [key, value]) => {
                result[key] = this.buildPropertyDefinition(value);
                return result;
            }, {});
    }

    private static buildPropertyDefinition(definition) {
        if (typeof definition.type !== 'undefined') {
            return this.Value(definition.type);
        } else {
            return definition;
        }
    }

    read() {
        return this.ref.read();
    }

    filter(predicate: (any) => boolean) {
        const values = this.read();

        if (Array.isArray(values)) {
            return values.filter(predicate);
        } else if (typeof values === 'object' && values !== null) {
            return Object.entries(values)
                .map(([key, value]) => ({
                    key,
                    value
                }))
                .filter(predicate);
        } else {
            throw new TypeError(`Value at ${this.name} is not searchable.`);
        }
    }

    find(predicate: (any) => boolean) {
        return this.filter(predicate)[0];
    }

    write(value) {
        this.dataDefinition.validate(value);

        if (this.dataDefinition.isDefinitionOf('array')) {
            this.ref.set([value]);
        } else {
            this.ref.set(value);
        }
    }

    update(value) {
        this.dataDefinition.validate(value);

        if (this.dataDefinition.isDefinitionOf('array')) {
            this.ref.push(value);
        } else if (this.dataDefinition.isDefinitionOf('object')) {
            this.ref.update(value);
        } else {
            this.ref.set(value);
        }
    }
}