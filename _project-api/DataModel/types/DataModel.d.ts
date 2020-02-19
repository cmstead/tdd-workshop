import DataModel from "../DataModel";
import DataDefinition from "../DataDefinition";

declare interface DataModelSet{
    [name: string]: DataModel
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
