import DataDefinition from "../DataDefinition";
import ValueDefinition from "../ValueDefinition";

declare interface IDataModel {
    create: (any) => void
    delete: (DeleteOptions) => void
    filter: (predicate: (any) => boolean) => any[]
    find: (predicate: (any) => boolean) => any
    update: (any, predicate?: (any) => boolean) => void
    val: () => any
}

declare interface DataModelSet {
    [name: string]: IDataModel
}

type modelType = 'array' | 'object' | 'value';
type modelDefinition = ValueDefinition | DataDefinition | ObjectSetupDefinition;

type typeName = 'object'
    | 'string'
    | 'number'
    | 'boolean'
    | 'bigint';

declare interface SetupDefinition {
    type: typeName,
    validate?: (any) => boolean
}

declare interface ObjectSetupDefinition {
    [name: string]: SetupDefinition | DataDefinition
}

declare interface DeleteOptions {
    id?: string,
    predicate?: (any) => boolean
}

