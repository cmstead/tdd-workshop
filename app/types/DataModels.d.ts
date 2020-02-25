import DataModel from "../../_project-api/DataModel/DataModel";

declare type DataModel = DataModel;

declare interface DataModelSet {
    [name: string]: DataModel
}

declare type predicate = (any) => boolean

declare interface IDataModel {
    create: (any) => void
    delete: (any) => void
    deleteById: (any) => void
    filter: (predicate) => any[]
    find: (predicate) => any
    update: (any) => void
    val: () => any
}