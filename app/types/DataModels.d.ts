export interface DataModelSet {
    [name: string]: DataModel
}

export type predicate = (any) => boolean

export interface IDataModel {
    create: (any) => void
    delete: (any) => void
    deleteById: (any) => void
    filter: (predicate) => any[]
    find: (predicate) => any
    update: (any) => void
    val: () => any
}