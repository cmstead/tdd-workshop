import DataDefinition from "../DataDefinition";

declare interface IDataModel {
    filter?: (predicate: (any) => boolean) => any[]
    find?: (predicate: (any) => boolean) => any

    create: (any) => void
    update: (any) => void
    delete: (DeleteOptions) => void
    val: () => any
}

declare interface DataModelSet {
    [name: string]: IDataModel
}

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

