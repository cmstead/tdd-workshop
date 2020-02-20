import { modelType, modelDefinition } from "./types/DataModel";
import DataDefinition from "./DataDefinition";
import ValueDefinition from "./ValueDefinition";

export default class DefinitionUtils {
    static buildObjectDefinition(definition) {
        return Object
            .entries(definition)
            .reduce((result, [key, value]) => {
                result[key] = this.buildPropertyDefinition(value);
                return result;
            }, {});
    }

    static buildPropertyDefinition(definition) {
        if (typeof definition.type !== 'undefined') {
            return this.buildModelDefinition(
                'value',
                new ValueDefinition(definition)
            );
        } else {
            return definition;
        }
    }

    static buildModelDefinition(
        type: modelType,
        definition: modelDefinition
    ) {
        return new DataDefinition({
            type: type,
            definition: definition
        });
    }
}